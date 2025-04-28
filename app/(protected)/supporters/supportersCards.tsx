// components/supporters/SupportersCard.tsx
import React from 'react';

const SupportersCard: React.FC = () => {
  return (
    <div className="mt-8 border border-gray-100 rounded-lg py-10 px-4 flex flex-col items-center justify-center">
      <div className="bg-gray-100 p-3 rounded-full mb-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h2 className="text-lg font-medium text-gray-900 mb-2">
        You don't have any supporters yet
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Share your page with your audience to get started.
      </p>
    </div>
  );
};

export default SupportersCard;
