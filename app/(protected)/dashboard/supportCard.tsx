import React from 'react';

interface SupportersCardProps {
  className?: string;
}

// SupportersCard component
const SupportersCard: React.FC<SupportersCardProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 sm:p-6 w-full text-center ${className}`}
    >
      <div className="mb-3 sm:mb-4 flex justify-center">
        <div className="bg-gray-100 p-2 sm:p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      </div>
      <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
        You don't have any supporters yet
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
        Share your page with your audience to get started.
      </p>
    </div>
  );
};

// Export the component
export { SupportersCard };
