'use server';

import { getAuthToken, getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Media configuration
const MEDIA_CONFIG = {
  MAX_SIZE: {
    image: 5 * 1024 * 1024, // 5MB
    video: 100 * 1024 * 1024 // 100MB
  },
  ALLOWED_TYPES: {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/quicktime']
  }
};

/**
 * Gets the user's current profile data
 */
export async function getUserProfile() {
  try {
    // Get JWT token from cookies
    const token = getAuthToken();

    if (!token) {
      console.log('No token found in cookies');
      return null;
    }

    // Get current user from token
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      console.log('No user found from token');
      return null;
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { id: BigInt(currentUser.id) }
    });

    if (!user) {
      console.log(`User not found with ID: ${currentUser.id}`);
      return null;
    }

    // Parse the social links from JSON
    const socialLinks = user.socialLinks
      ? JSON.parse(user.socialLinks as string)
      : [];

    // Return formatted profile data
    return {
      id: currentUser.id.toString(),
      username: user.username,
      email:user.email,
      fullName: user.displayName || user.username,
      bio: user.creatorTagline || '',
      aboutMe: user.aboutMe || '',
      featuredVideoUrl: user.featuredVideoUrl || '',
      profilePictureUrl: user.profilePictureUrl || '/placeholder-profile.jpg',
      coverImage: user.coverImage || null,
      supportTerm: user.supportTerm || 'coffee',
      themeColor: user.themeColor || '#ff66ff',
      showSupporterCount: user.showSupporterCount,
      socialShareHandle: user.socialShareHandle || '',
      socialLinks
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

/**
 * Gets a user profile by ID
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<object|null>} The user profile data or null if not found
 */
export async function getUserById(userId) {
  try {
    // Check if userId is provided
    if (!userId) {
      console.log('No user ID provided');
      return null;
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { id: BigInt(userId) }
    });

    if (!user) {
      console.log(`User not found with ID: ${userId}`);
      return null;
    }

    // Parse the social links from JSON
    const socialLinks = user.socialLinks
      ? JSON.parse(user.socialLinks as string)
      : [];

    // Return formatted profile data
    return {
      id: user.id.toString(),
      username: user.username,
      fullName: user.displayName || user.username,
      bio: user.creatorTagline || '',
      aboutMe: user.aboutMe || '',
      featuredVideoUrl: user.featuredVideoUrl || '',
      profilePictureUrl: user.profilePictureUrl || '/placeholder-profile.jpg',
      coverImage: user.coverImage || null,
      supportTerm: user.supportTerm || 'coffee',
      themeColor: user.themeColor || '#ff66ff',
      showSupporterCount: user.showSupporterCount,
      socialShareHandle: user.socialShareHandle || '',
      socialLinks
    };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

/**
 * Checks if the current logged-in user is viewing their own profile
 * @param {string} profileUserId - The ID of the profile being viewed
 * @returns {Promise<boolean>} True if the current user is viewing their own profile
 */
export async function isCurrentUserProfile(profileUserId) {
  try {
    // Get JWT token from cookies
    const token = getAuthToken();

    if (!token) {
      return false;
    }

    // Get current user from token
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      return false;
    }

    // Compare IDs
    return currentUser.id === profileUserId;
  } catch (error) {
    console.error('Error checking current user:', error);
    return false;
  }
}

/**
 * Updates a user's profile
 */
export async function updateProfile(formData) {
  try {
    // Get JWT token from cookies
    const token = getAuthToken();

    if (!token) {
      return { error: 'Authentication required. Please log in again.' };
    }

    // Get current user from token
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      return { error: 'You must be logged in to update your profile' };
    }

    // Format social links for database storage
    const socialLinksJson = formData.socialLinks
      ? JSON.stringify(formData.socialLinks.filter((link) => link !== ''))
      : null;

    // Update user in database
    await prisma.user.update({
      where: { id: BigInt(currentUser.id) },
      data: {
        displayName: formData.fullName,
        creatorTagline: formData.bio,
        aboutMe: formData.aboutMe,
        featuredVideoUrl: formData.featuredVideoUrl || null,
        profilePictureUrl: formData.profilePictureUrl || null,
        coverImage: formData.coverImage || null,
        supportTerm: formData.supportTerm || 'coffee',
        themeColor: formData.themeColor || '#ff66ff',
        showSupporterCount: formData.showSupporterCount ?? true,
        socialShareHandle: formData.socialShareHandle || null,
        socialLinks: socialLinksJson,
        // Set isCreator to true when profile is updated
        isCreator: true
      }
    });

    // Revalidate profile page
    revalidatePath(`/${currentUser.username}`);
    revalidatePath(`/profile/${currentUser.id}`); // Added to revalidate new profile URL

    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    return { error: 'Failed to update profile. Please try again.' };
  }
}

/**
 * Uploads a file to Cloudinary
 */
async function uploadToCloudinary(file, folder, userId, resourceType) {
  try {
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a unique identifier for the file
    const timestamp = new Date().getTime();
    const uniqueId = `${userId}_${timestamp}`;

    // Create a promise to handle the Cloudinary upload
    return new Promise((resolve, reject) => {
      // Configure upload stream with proper parameters
      const uploadOptions = {
        folder: folder,
        public_id: uniqueId,
        resource_type: resourceType,
        // Add tags for easier management
        tags: [`user_${userId}`, resourceType]
      };

      // Use Cloudinary's upload API
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error);
            resolve({
              success: false,
              error: error?.message || 'Failed to upload media'
            });
            return;
          }

          resolve({
            success: true,
            url: result.secure_url
          });
        }
      );

      // End the stream with the buffer data
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to upload to Cloudinary'
    };
  }
}

/**
 * Uploads a profile picture
 */
export async function uploadProfileImage(formData) {
  try {
    // Get JWT token from cookies
    const token = getAuthToken();
    console.log('Token exists:', !!token);

    if (!token) {
      return { error: 'Authentication required. Please log in again.' };
    }

    // Get current user from token
    let currentUser;
    try {
      currentUser = await getCurrentUser(token);
      console.log('Current user found:', !!currentUser);
    } catch (authError) {
      console.error('Authentication error:', authError);
      return { error: 'Invalid authentication. Please log in again.' };
    }

    if (!currentUser) {
      return { error: 'You must be logged in to upload an image' };
    }

    // Get the file from form data
    const file = formData.get('file');

    if (!file) {
      return { error: 'No file provided' };
    }

    // Validate file size
    if (file.size > MEDIA_CONFIG.MAX_SIZE.image) {
      return {
        error: `File too large. Maximum size is ${Math.round(MEDIA_CONFIG.MAX_SIZE.image / (1024 * 1024))}MB.`
      };
    }

    // Validate file type
    if (!MEDIA_CONFIG.ALLOWED_TYPES.image.includes(file.type)) {
      return {
        error: `Invalid file type. Supported formats: ${MEDIA_CONFIG.ALLOWED_TYPES.image
          .map((type) => type.split('/')[1].toUpperCase())
          .join(', ')}.`
      };
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      file,
      'profile-pictures',
      currentUser.id,
      'image'
    );

    if (!uploadResult.success || !uploadResult.url) {
      return { error: uploadResult.error || 'Failed to upload image' };
    }

    // Update user in database
    try {
      await prisma.user.update({
        where: { id: BigInt(currentUser.id) },
        data: { profilePictureUrl: uploadResult.url }
      });
    } catch (dbError) {
      console.error('Database update error:', dbError);
      return { error: 'Failed to update profile with new image' };
    }

    // Revalidate profile pages
    revalidatePath(`/${currentUser.username}`);
    revalidatePath(`/profile/${currentUser.id}`); // Added to revalidate new profile URL

    return { success: true, imageUrl: uploadResult.url };
  } catch (error) {
    console.error('Profile image upload error:', error);
    return { error: 'Failed to upload image. Please try again.' };
  }
}

/**
 * Uploads a cover image
 */
export async function uploadCoverImage(formData) {
  try {
    // Get JWT token from cookies
    const token = getAuthToken();
    console.log('Token exists:', !!token);

    if (!token) {
      return { error: 'Authentication required. Please log in again.' };
    }

    // Get current user from token
    let currentUser;
    try {
      currentUser = await getCurrentUser(token);
      console.log('Current user found:', !!currentUser);
    } catch (authError) {
      console.error('Authentication error:', authError);
      return { error: 'Invalid authentication. Please log in again.' };
    }

    if (!currentUser) {
      return { error: 'You must be logged in to upload an image' };
    }

    // Get the file from form data
    const file = formData.get('file');

    if (!file) {
      return { error: 'No file provided' };
    }

    // Validate file size
    if (file.size > MEDIA_CONFIG.MAX_SIZE.image) {
      return {
        error: `File too large. Maximum size is ${Math.round(MEDIA_CONFIG.MAX_SIZE.image / (1024 * 1024))}MB.`
      };
    }

    // Validate file type
    if (!MEDIA_CONFIG.ALLOWED_TYPES.image.includes(file.type)) {
      return {
        error: `Invalid file type. Supported formats: ${MEDIA_CONFIG.ALLOWED_TYPES.image
          .map((type) => type.split('/')[1].toUpperCase())
          .join(', ')}.`
      };
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      file,
      'cover-images',
      currentUser.id,
      'image'
    );

    if (!uploadResult.success || !uploadResult.url) {
      return { error: uploadResult.error || 'Failed to upload image' };
    }

    // Update user in database
    try {
      await prisma.user.update({
        where: { id: BigInt(currentUser.id) },
        data: { coverImage: uploadResult.url }
      });
    } catch (dbError) {
      console.error('Database update error:', dbError);
      return { error: 'Failed to update profile with new cover image' };
    }

    // Revalidate profile pages
    revalidatePath(`/${currentUser.username}`);
    revalidatePath(`/profile/${currentUser.id}`); // Added to revalidate new profile URL

    return { success: true, imageUrl: uploadResult.url };
  } catch (error) {
    console.error('Cover image upload error:', error);
    return { error: 'Failed to upload cover image. Please try again.' };
  }
}

/**
 * Uploads a featured video
 */
export async function uploadFeaturedVideo(formData) {
  try {
    // Get JWT token from cookies
    const token = getAuthToken();

    if (!token) {
      return { error: 'Authentication required. Please log in again.' };
    }

    // Get current user from token
    let currentUser;
    try {
      currentUser = await getCurrentUser(token);
    } catch (authError) {
      console.error('Authentication error:', authError);
      return { error: 'Invalid authentication. Please log in again.' };
    }

    if (!currentUser) {
      return { error: 'You must be logged in to upload a video' };
    }

    // Get the file from form data
    const file = formData.get('file');

    if (!file) {
      return { error: 'No file provided' };
    }

    // Validate file size
    if (file.size > MEDIA_CONFIG.MAX_SIZE.video) {
      return {
        error: `File too large. Maximum size is ${Math.round(MEDIA_CONFIG.MAX_SIZE.video / (1024 * 1024))}MB.`
      };
    }

    // Validate file type
    if (!MEDIA_CONFIG.ALLOWED_TYPES.video.includes(file.type)) {
      return {
        error: `Invalid file type. Supported formats: ${MEDIA_CONFIG.ALLOWED_TYPES.video
          .map((type) => type.split('/')[1].toUpperCase())
          .join(', ')}.`
      };
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      file,
      'featured-videos',
      currentUser.id,
      'video'
    );

    if (!uploadResult.success || !uploadResult.url) {
      return { error: uploadResult.error || 'Failed to upload video' };
    }

    // Update user in database
    try {
      await prisma.user.update({
        where: { id: BigInt(currentUser.id) },
        data: { featuredVideoUrl: uploadResult.url }
      });
    } catch (dbError) {
      console.error('Database update error:', dbError);
      return { error: 'Failed to update profile with new video' };
    }

    // Revalidate profile pages
    revalidatePath(`/${currentUser.username}`);
    revalidatePath(`/profile/${currentUser.id}`); // Added to revalidate new profile URL

    return { success: true, videoUrl: uploadResult.url };
  } catch (error) {
    console.error('Featured video upload error:', error);
    return { error: 'Failed to upload video. Please try again.' };
  }
}
