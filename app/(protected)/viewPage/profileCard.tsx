'use client';

import React, { useState } from 'react';
import EditProfileDialog from './editProfilemodal';

interface ProfileCardProps {
  username: string;
  bio: string;
  profileImage?: string;
  onEdit?: () => void;
  isEditable?: boolean; // New prop to determine if the profile is editable
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  bio,
  profileImage = '/placeholder-profile.jpg',
  onEdit,
  isEditable = false // Default to false (not editable)
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    username,
    bio
  });

  const handleSaveProfile = (data: { fullName: string; bio: string }) => {
    setUserData({
      username: data.fullName,
      bio: data.bio
    });
    // Here you would typically update the data in your backend
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">About {userData.username}</h2>
          {isEditable && ( // Only show edit button if the profile is editable
            <button
              onClick={() => setIsDialogOpen(true)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-4">{userData.bio}</p>
        <div>
          <button className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Recent supporters</h3>
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="bg-blue-500 text-white p-3 rounded-full mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <p className="text-blue-500 text-center">
              Be the first one to support {userData.username}.
            </p>
          </div>
        </div>
      </div>

      {isEditable && ( // Only render dialog if profile is editable
        <EditProfileDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          username={userData.username}
          bio={userData.bio}
          profileImage={profileImage}
          onSave={handleSaveProfile}
        />
      )}
    </>
  );
};

export default ProfileCard;
