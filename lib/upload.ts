// lib/cloudinary-utils.ts

// Media configuration types
export interface MediaSizeConfig {
  image: number;
  video: number;
  audio?: number;
  document?: number;
}

export interface MediaTypeConfig {
  image: string[];
  video: string[];
  audio?: string[];
  document?: string[];
}

export interface MediaConfig {
  MAX_SIZE: MediaSizeConfig;
  ALLOWED_TYPES: MediaTypeConfig;
}

// Response types
export interface MediaUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
  publicId?: string;
}

export interface MediaValidationResult {
  valid: boolean;
  error?: string;
}

// Cloudinary upload options
export interface CloudinaryUploadOptions {
  uploadPreset: string;
  folder?: string;
  resourceType?: 'image' | 'video' | 'auto' | 'raw';
  tags?: string[];
  publicId?: string;
  transformations?: Record<string, any>;
}

// Media upload options
export interface MediaUploadOptions {
  mediaType: 'image' | 'video' | 'audio' | 'document';
  folder?: string;
  userId?: string;
  uploadPreset: string;
  publicId?: string;
  transformations?: Record<string, any>;
}

// Media configuration
export const MEDIA_CONFIG: MediaConfig = {
  MAX_SIZE: {
    image: 5 * 1024 * 1024, // 5MB
    video: 100 * 1024 * 1024, // 100MB
    audio: 50 * 1024 * 1024, // 50MB
    document: 20 * 1024 * 1024 // 20MB
  },
  ALLOWED_TYPES: {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/quicktime'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
    document: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
  }
};

/**
 * Validates a media file against size and type constraints
 */
export function validateMediaFile(
  file: File,
  mediaType: 'image' | 'video' | 'audio' | 'document'
): MediaValidationResult {
  // Get the max size for this media type
  const maxSize = MEDIA_CONFIG.MAX_SIZE[mediaType];

  if (!maxSize) {
    return {
      valid: false,
      error: `Invalid media type: ${mediaType}`
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size for ${mediaType} is ${Math.round(maxSize / (1024 * 1024))}MB.`
    };
  }

  // Get allowed types for this media type
  const allowedTypes = MEDIA_CONFIG.ALLOWED_TYPES[mediaType];

  if (!allowedTypes) {
    return {
      valid: false,
      error: `Invalid media type: ${mediaType}`
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Supported formats for ${mediaType}: ${allowedTypes
        .map((type) => type.split('/')[1].toUpperCase())
        .join(', ')}.`
    };
  }

  return { valid: true };
}

/**
 * Creates a file preview as a data URL
 */
export function createMediaPreview(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to create preview'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    // For images and videos, we can use data URL
    reader.readAsDataURL(file);
  });
}

/**
 * Maps a media type to Cloudinary resource type
 */
export function getCloudinaryResourceType(
  mediaType: 'image' | 'video' | 'audio' | 'document'
): 'image' | 'video' | 'raw' | 'auto' {
  switch (mediaType) {
    case 'image':
      return 'image';
    case 'video':
      return 'video';
    case 'audio':
      return 'video'; // Cloudinary handles audio under video resource type
    case 'document':
      return 'raw';
    default:
      return 'auto';
  }
}

/**
 * Uploads a file to Cloudinary (client-side)
 */
export async function uploadToCloudinaryClient(
  file: File,
  options: CloudinaryUploadOptions
): Promise<MediaUploadResponse> {
  try {
    // Create a FormData instance
    const formData = new FormData();

    // Add the file to the form
    formData.append('file', file);

    // Add the upload preset (required for unsigned uploads)
    formData.append('upload_preset', options.uploadPreset);

    // Add optional parameters
    if (options.folder) {
      formData.append('folder', options.folder);
    }

    if (options.tags && options.tags.length > 0) {
      formData.append('tags', options.tags.join(','));
    }

    if (options.publicId) {
      formData.append('public_id', options.publicId);
    }

    // Add transformations if provided
    if (options.transformations) {
      Object.entries(options.transformations).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
    }

    // Determine the resource type
    const resourceType = options.resourceType || 'auto';

    // Get the cloud name
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      return {
        success: false,
        error: 'Cloudinary cloud name not configured'
      };
    }

    // Make the upload request to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error?.message || 'Upload failed'
      };
    }

    const data = await response.json();

    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred during upload'
    };
  }
}

/**
 * Helper function to handle client-side file upload
 */
export async function handleMediaUpload(
  file: File,
  options: MediaUploadOptions
): Promise<MediaUploadResponse> {
  try {
    // First validate the file
    const validation = validateMediaFile(file, options.mediaType);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Create folder path
    const folder =
      options.folder ||
      (options.mediaType === 'image' ? 'profile-pictures' : 'featured-videos');

    // Create tags
    const tags: string[] = [];
    if (options.userId) {
      tags.push(`user_${options.userId}`);
    }
    tags.push(options.mediaType);

    // Get the resource type
    const resourceType = getCloudinaryResourceType(options.mediaType);

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinaryClient(file, {
      uploadPreset: options.uploadPreset,
      folder,
      resourceType,
      tags,
      publicId: options.publicId,
      transformations: options.transformations
    });

    return uploadResult;
  } catch (error) {
    console.error('Media upload error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

/**
 * Creates a Cloudinary URL with transformations
 */
export function createCloudinaryUrl(
  publicId: string,
  transformations: Record<string, any> = {},
  resourceType: 'image' | 'video' | 'raw' = 'image'
): string {
  // Get the cloud name
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    return '';
  }

  // Convert transformations to Cloudinary format
  const transformationString = Object.entries(transformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  // Build the URL
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${
    transformationString ? `${transformationString}/` : ''
  }${publicId}`;
}
