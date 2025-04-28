'use client';

// app/profile/page.tsx
import { useState } from 'react';
import CoverPhoto from './coverPhoto';
import FollowCard from './followCard';
import ProfileCard from './profileCard';


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
  const handleCoverImageChange = (imageUrl: string) => {
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
      <div className='mb-4'>
        <CoverPhoto
          initialImage={profileData.coverImage}
          onImageChange={handleCoverImageChange}
        />
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
