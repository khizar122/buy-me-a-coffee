'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreatorCard = ({ id, rank, avatar, name, description, supporters }) => {
  const router = useRouter();

  // Handle card click to navigate to view page with user ID
  const handleCardClick = () => {
    router.push(`/viewPage?userId=${id}`);
  };

  return (
    <div
      className="p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-purple-200 shadow-sm hover:shadow"
      onClick={handleCardClick}
    >
      <div className="flex items-start">
        {/* Rank with gradient background */}
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium text-xs mr-3">
          {rank}
        </div>

        {/* Avatar with border and shadow */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3 border-2 border-white shadow-md">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content with better spacing */}
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-1 mt-0.5">
            {description}
          </p>

          {/* Supporters with improved styling */}
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Heart size={14} className="mr-1 text-pink-500" fill="#ec4899" />
            <span className="font-medium">{supporters.toLocaleString()}</span>
            <span className="ml-1 text-gray-400">supporters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
