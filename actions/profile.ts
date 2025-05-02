'use server';

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth';
import { cookies } from 'next/headers';
import { uploadToStorage } from '@/lib/file-upload-utils';

// Validation schema for the profile data
const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  bio: z.string().optional(),
  aboutMe: z.string().optional(),
  featuredVideoUrl: z.string().url().optional().or(z.literal('')),
  profilePictureUrl: z.string().optional(),
  supportTerm: z.string().optional(),
  themeColor: z.string().optional(),
  showSupporterCount: z.boolean().optional(),
  socialShareHandle: z.string().optional(),
  socialLinks: z.array(z.string().url()).optional()
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export async function updateProfile(formData: ProfileFormData) {
  try {
    // Get JWT token from cookies
    const token = cookies().get('token')?.value;

    // Get current user from token
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      return { error: 'You must be logged in to update your profile' };
    }

    // Validate form data
    const validatedData = profileSchema.safeParse(formData);

    if (!validatedData.success) {
      return { error: validatedData.error.message };
    }

    // Find the user by ID from token
    const user = await prisma.user.findUnique({
      where: { id: BigInt(currentUser.id) }
    });

    if (!user) {
      return { error: 'User not found' };
    }

    // Parse social links format
    const socialLinksJson = validatedData.data.socialLinks
      ? JSON.stringify(
          validatedData.data.socialLinks.filter((link) => link !== '')
        )
      : null;

    // Update the user profile
    await prisma.user.update({
      where: { id: user.id },
      data: {
        displayName: validatedData.data.fullName,
        creatorTagline: validatedData.data.bio,
        aboutMe: validatedData.data.aboutMe,
        featuredVideoUrl: validatedData.data.featuredVideoUrl || null,
        profilePictureUrl:
          validatedData.data.profilePictureUrl || user.profilePictureUrl,
        supportTerm: validatedData.data.supportTerm || 'coffee',
        themeColor: validatedData.data.themeColor || '#ff66ff',
        showSupporterCount: validatedData.data.showSupporterCount ?? true,
        socialShareHandle: validatedData.data.socialShareHandle || null,
        socialLinks: socialLinksJson,
        // Set isCreator to true when a user completes their profile
        isCreator: true
      }
    });

    // Revalidate the user's profile page to reflect changes
    revalidatePath(`/${user.username}`);

    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    return { error: 'Failed to update profile. Please try again.' };
  }
}

// Function to handle profile image upload
export async function uploadProfileImage(formData: FormData) {
  try {
    // Get JWT token from cookies
    const token = cookies().get('token')?.value;

    // Get current user from token
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      return { error: 'You must be logged in to upload an image' };
    }

    const file = formData.get('file') as File;

    if (!file) {
      return { error: 'No file provided' };
    }

    // Upload the file to your storage service
    const imageUrl = await uploadToStorage(file);

    // Update the user's profile picture URL
    await prisma.user.update({
      where: { id: BigInt(currentUser.id) },
      data: { profilePictureUrl: imageUrl }
    });

    // Revalidate the profile page
    revalidatePath(`/${currentUser.username}`);

    return { success: true, imageUrl };
  } catch (error) {
    console.error('Image upload error:', error);
    return { error: 'Failed to upload image. Please try again.' };
  }
}

// Get the user's current profile data for editing
export async function getUserProfile() {
  try {
    // Get JWT token from cookies
    const token = cookies().get('token')?.value;

    // Get current user from token
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: BigInt(currentUser.id) }
    });

    if (!user) {
      return null;
    }

    // Parse the social links from JSON
    const socialLinks = user.socialLinks
      ? JSON.parse(user.socialLinks as string)
      : [];

    return {
      fullName: user.displayName || user.username,
      bio: user.creatorTagline || '',
      aboutMe: user.aboutMe || '',
      featuredVideoUrl: user.featuredVideoUrl || '',
      profilePictureUrl: user.profilePictureUrl || '/placeholder-profile.jpg',
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
