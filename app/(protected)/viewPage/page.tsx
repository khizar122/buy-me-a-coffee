'use client';

// app/profile/page.tsx
import { useState, useEffect } from 'react';
import CoverPhoto from './coverPhoto';
import FollowCard from './followCard';
import ProfileCard from './profileCard';
import { getUserProfile } from '@/actions/profile';


interface ProfileData {
  username: string;
  bio: string;
  coverImage: string | null;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'samman',
    bio: 'i am a software engineerr',
    coverImage: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile data when component mounts
  useEffect(() => {
    async function loadProfileData() {
      try {
        const data = await getUserProfile();
        if (data) {
          // If we get data from the server, update our local state
          setProfileData((prevData) => ({
            ...prevData,
            bio: data.bio || prevData.bio,
            coverImage: data.coverImage || prevData.coverImage,
            // Keep username the same if data doesn't have it
            username: data.username || prevData.username
          }));
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
    setProfileData({
      ...profileData,
      coverImage: imageUrl
    });
  };

  const handleEditProfile = () => {
    // Here you would typically open a modal or navigate to edit page
    const newBio = prompt('Update your bio:', profileData.bio);
    if (newBio !== null) {
      setProfileData({
        ...profileData,
        bio: newBio
      });
    }
  };

  const handleFollow = (name: string, email: string) => {
    // Implement follow functionality
    alert(`Thank you for following! Name: ${name}, Email: ${email}`);
  };

  return (
    <div className="min-h-screen bg-[#e5ffff] py-4 sm:py-6 md:py-8">
      <div className="mb-4">
        {isLoading ? (
          <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
        ) : (
          <CoverPhoto
            initialImage={profileData.coverImage}
            onImageChange={handleCoverImageChange}
          />
        )}
      </div>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-1">
            <ProfileCard
              username={profileData.username}
              bio={profileData.bio}
              onEdit={handleEditProfile}
            />
          </div>
          <div className="md:col-span-1">
            <FollowCard
              username={profileData.username}
              onFollow={handleFollow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
