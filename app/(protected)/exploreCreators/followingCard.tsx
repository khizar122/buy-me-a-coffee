'use client';

import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Test from '../../../public/placeholder.svg';
import Image from 'next/image';

const FollowingCard = ({ creator }) => {
  console.log("here",creator)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Creator Header */}
      <div className="p-4 flex items-center">
        <Image
          src={creator.avatar || '/api/placeholder/40/40'}
          alt={creator.name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="font-semibold text-sm">{creator.name}</h3>
          <p className="text-gray-500 text-xs">
            {creator.date || 'Nov 18, 2024'}
          </p>
        </div>
      </div>

      {/* Main Content - Post Image */}
      <div className="w-full">
        <Image
          src={creator.imageUrl || Test}
          alt={creator.title || 'Post image'}
          className="w-full h-auto"
        />
      </div>

      {/* Post Title */}
      <div className="p-4">
        <h2 className="font-medium text-base">
          {creator.title ||
            'Get Ready for Heartfelt Video Messages from Supporters'}
        </h2>
      </div>

      {/* Engagement Stats */}
      <div className="px-4 pb-4 flex items-center space-x-4">
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">{creator.likes || 442}</span>
        </div>
        <div className="flex items-center">
          <MessageCircle className="h-5 w-5 text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">
            {creator.comments || 170}
          </span>
        </div>
        <div className="flex items-center">
          <Share2 className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default FollowingCard;
