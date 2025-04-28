'use client';

import { Heart } from 'lucide-react';

const CreatorCard = ({ rank, avatar, name, description, supporters }) => {
  return (
    <div className=" hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer">
      <div className="flex items-center">
        <div className="text-gray-500 font-medium mr-3">#{rank}</div>

        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-3">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-grow">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-2 text-sm text-gray-500 ml-16">
        <Heart size={16} className="mr-1 text-gray-400" />
        <span>{supporters.toLocaleString()} Supporters</span>
      </div>
    </div>
  );
};

export default CreatorCard;
