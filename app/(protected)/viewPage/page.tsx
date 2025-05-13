'use client';

import {
  getUserById,
  getUserProfile,
  isCurrentUserProfile
} from '@/actions/profile';
import { processSupport } from '@/actions/support';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import CoverPhoto from './coverPhoto';
import ProfileCard from './profileCard';
import SupportCard from './supportCard';

interface ProfileData {
  id?: string;
  fullName: string;
  aboutMe: string;
  coverImage: string | null;
  username?: string;
  supportTerm?: string;
  profileImage?: string;
}

function ProfileContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  console.log('home', userId);

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [supportStatus, setSupportStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null
  });

  console.log('data', profileData);

  // Fetch user profile data when component mounts
  useEffect(() => {
    async function loadProfileData() {
      try {
        let data;

        if (userId) {
          data = await getUserById(userId);
          const ownProfile = await isCurrentUserProfile(userId);
          setIsOwnProfile(ownProfile);
        } else {
          data = await getUserProfile();
          setIsOwnProfile(true);
        }

        console.log('Profile data:', data);

        if (data) {
          const profileInfo = {
            id: data.id,
            fullName: data.fullName,
            aboutMe: data.aboutMe,
            coverImage: data.coverImage,
            username: data.username,
            supportTerm: data.supportTerm,
            profileImage: data.profilePictureUrl
          };

          setProfileData(profileInfo);

          if (!isOwnProfile) {
            localStorage.setItem(
              'viewedProfile',
              JSON.stringify({
                fullName: data.fullName,
                profileImage: data.profilePictureUrl
              })
            );
          } else {
            localStorage.removeItem('viewedProfile');
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();

    return () => {
      localStorage.removeItem('viewedProfile');
    };
  }, [userId]);

  const handleCoverImageChange = (imageUrl: string | null) => {
    console.log('Cover image changed:', imageUrl);
    if (profileData) {
      setProfileData({
        ...profileData,
        coverImage: imageUrl
      });
    }
  };

  const handleEditProfile = () => {
    if (profileData) {
      const newAboutMe = prompt('Update your bio:', profileData.aboutMe);
      if (newAboutMe !== null) {
        setProfileData({
          ...profileData,
          aboutMe: newAboutMe
        });
      }
    }
  };

  const handleSupport = async (
    name: string,
    email: string,
    message: string,
    amount: number,
    isRecurring: boolean
  ) => {
    if (!userId || !profileData) return;

    setSupportStatus({
      loading: true,
      success: false,
      error: null
    });

    try {
      const result = await processSupport({
        name,
        email,
        message,
        amount,
        isRecurring,
        creatorId: userId
      });

      if (result.success) {
        setSupportStatus({
          loading: false,
          success: true,
          error: null
        });
        console.log('Support successful:', result.message);

        setTimeout(() => {
          setSupportStatus((prev) => ({
            ...prev,
            success: false
          }));
        }, 5000);
      } else {
        setSupportStatus({
          loading: false,
          success: false,
          error: result.error || 'Failed to process support'
        });
      }
    } catch (error) {
      console.error('Error handling support:', error);
      setSupportStatus({
        loading: false,
        success: false,
        error: 'An unexpected error occurred'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-profile-bg py-4 sm:py-6 md:py-8">
        <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 -mt-20">
            <div className="md:col-span-1">
              <div className="bg-gray-200 animate-pulse h-72 rounded-lg"></div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-gray-200 animate-pulse h-72 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-profile-bg">
      <div className="relative">
        <CoverPhoto
          initialImage={profileData.coverImage}
          onImageChange={handleCoverImageChange}
          editable={isOwnProfile}
        />

        <div className="max-w-5xl mx-auto px-4 relative -mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-1">
              <ProfileCard
                username={profileData.fullName}
                bio={profileData.aboutMe}
                onEdit={handleEditProfile}
                isEditable={isOwnProfile}
              />
            </div>
            <div className="md:col-span-1">
              {!isOwnProfile && (
                <>
                  <SupportCard
                    username={profileData.fullName}
                    supportTerm={profileData.supportTerm}
                    onSupport={handleSupport}
                  />

                  {supportStatus.success && (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                      Thank you for your support! You are now following this
                      creator.
                    </div>
                  )}

                  {supportStatus.error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
                      {supportStatus.error}
                    </div>
                  )}
                </>
              )}
              {isOwnProfile && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Profile Stats</h2>
                  <p className="text-gray-600">
                    This is your profile. You can edit your information by
                    clicking the edit button.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-profile-bg flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
