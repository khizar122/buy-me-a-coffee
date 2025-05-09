'use client';

// app/profile/[id]/page.tsx
import { getUserById, getUserProfile, isCurrentUserProfile } from '@/actions/profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CoverPhoto from './coverPhoto';
import FollowCard from './followCard';
import ProfileCard from './profileCard';
import SupportCard from './supportCard';



interface ProfileData {
  id?: string;
  fullName: string;
  aboutMe: string;
  coverImage: string | null;
  username?: string;
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  console.log("home",userId)

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // Fetch user profile data when component mounts
  useEffect(() => {
    async function loadProfileData() {
      try {
        let data;

        if (userId) {
          // If we have a userId in the URL, fetch that specific user
          data = await getUserById(userId);

          // Check if this is the current user's profile
          const ownProfile = await isCurrentUserProfile(userId);
          setIsOwnProfile(ownProfile);
        } else {
          // Otherwise fetch the current user's profile
          data = await getUserProfile();
          setIsOwnProfile(true); // If no ID is provided, assume it's the current user's profile
        }

        console.log('Profile data:', data);

        if (data) {
          // Set the actual data from the database
          setProfileData({
            id: data.id,
            fullName: data.fullName,
            aboutMe: data.aboutMe,
            coverImage: data.coverImage,
            username: data.username
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
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
    // Here you would typically open a modal or navigate to edit page
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

  const handleFollow = (name: string, email: string) => {
    // Implement follow functionality
    alert(`Thank you for following! Name: ${name}, Email: ${email}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-profile-bg py-4 sm:py-6 md:py-8">
        <div className="w-full h-64 bg-gray-200 animate-pulse mb-4"></div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

  // If data is not loaded yet (null), don't render the components
  if (!profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-profile-bg py-4 sm:py-6 md:py-8">
      <div className="mb-4">
        <CoverPhoto
          initialImage={profileData.coverImage}
          onImageChange={handleCoverImageChange}
          editable={isOwnProfile} // Only show edit controls if it's the user's own profile
        />
      </div>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-1">
            <ProfileCard
              username={profileData.fullName}
              bio={profileData.aboutMe}
              onEdit={handleEditProfile}
              isEditable={isOwnProfile} // Only allow editing if it's the user's own profile
            />
          </div>
          <div className="md:col-span-1">
            {!isOwnProfile && ( // Only show follow card if it's not the user's own profile
              // <FollowCard
              //   username={profileData.fullName}
              //   onFollow={handleFollow}
              // />
              <SupportCard
                username={profileData.fullName}
                onSupport={(name, message, amount, isRecurring) => {
                  // Handle payment logic here
                  console.log(name, message, amount, isRecurring);
                }}
              />
            )}
            {isOwnProfile && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Profile Stats</h2>
                <p className="text-gray-600">
                  This is your profile. You can edit your information by
                  clicking the edit button.
                </p>
                {/* Add more stats or information here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
