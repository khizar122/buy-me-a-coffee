import React from 'react';

const SuggestedAmounts: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4">
      <div className="mb-3 flex items-center">
        <h3 className="text-base font-medium">Support samman</h3>
        <span className="ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </div>

      <div className="mb-3">
        <div className="bg-gray-100 rounded-md p-2 flex items-center">
          <span className="text-gray-500 mr-2">$</span>
          <span className="text-gray-400 text-sm">Enter amount</span>
          <div className="flex ml-auto space-x-1">
            <div className="bg-white rounded-full px-2 py-0.5 text-xs border border-gray-200">
              +25
            </div>
            <div className="bg-white rounded-full px-2 py-0.5 text-xs border border-gray-200">
              +50
            </div>
            <div className="bg-white rounded-full px-2 py-0.5 text-xs border border-gray-200">
              +100
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="bg-gray-100 rounded-md p-2 text-sm text-gray-400">
          Name or @yoursocial
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-gray-100 rounded-md p-2 text-sm text-gray-400 h-20 relative">
          Say something nice
          <span className="absolute bottom-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>
      </div>

      <button className="w-full bg-yellow-400 text-center py-2 rounded-md font-medium">
        Support
      </button>
    </div>
  );
};

export default SuggestedAmounts;


