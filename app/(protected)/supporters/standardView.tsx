import React from 'react';

const StandardView: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4">
      <div className="mb-3 flex items-center">
        <h3 className="text-base font-medium">Buy samman a coffee</h3>
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

      <div className="bg-yellow-50 border border-yellow-100 rounded-full p-1 flex items-center justify-between mb-3">
        <div className="flex items-center ml-2">
          <span className="text-amber-800">
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
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </span>
          <span className="text-sm ml-2">×</span>
        </div>

        <div className="flex space-x-2 mr-2">
          <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-semibold">
            1
          </div>
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">
            3
          </div>
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">
            5
          </div>
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">
            10
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

export default StandardView;

