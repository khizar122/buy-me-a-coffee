'use client';

// app/profile/page.tsx
import { getUserProfile } from '@/actions/profile';
import { useEffect, useState } from 'react';
import CoverPhoto from './coverPhoto';
import FollowCard from './followCard';
import ProfileCard from './profileCard';

interface ProfileData {
  fullName: string; // Changed from username to displayName to match database field
  aboutMe: string;
  coverImage: string | null;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile data when component mounts
  useEffect(() => {
    async function loadProfileData() {
      try {
        const data = await getUserProfile();
        console.log("te",data)
        if (data) {
          // Set the actual data from the database
          setProfileData({
            fullName: data.fullName,
            aboutMe: data.aboutMe,
            coverImage: data.coverImage
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
  }, []);

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
        />
      </div>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-1">
            <ProfileCard
              username={profileData.fullName} // Changed to pass displayName to the username prop
              bio={profileData.aboutMe}
              onEdit={handleEditProfile}
            />
          </div>
          <div className="md:col-span-1">
            <FollowCard
              username={profileData.fullName} // Changed to use displayName
              onFollow={handleFollow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
