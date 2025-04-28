import React, { useState } from 'react';

const ThankYouMessage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Save logic would go here
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            Thank you message
            <span className="ml-2">
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
          </h2>
          <button
            className="text-gray-800 font-medium text-sm hover:underline"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          This will be visible after the payment and in the receipt email. Write
          a personable thank you message, and include any rewards if you like.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            Add a video message
            <span className="bg-yellow-500 text-xs text-white font-bold py-0.5 px-1.5 rounded-full">
              NEW!
            </span>
          </button>

          <button className="flex items-center justify-center gap-2 text-blue-600 font-medium py-2 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Preview message
          </button>
        </div>

        <div className="mb-6">
          <textarea
            className="w-full h-28 p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your thank you message here..."
          ></textarea>
        </div>

        <div>
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-md"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          Thank you message
          <span className="ml-2">
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
        </h2>
        <button
          className="text-gray-800 font-medium text-sm hover:underline"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        This will be visible after the payment and in the receipt email. Write a
        personable thank you message, and include any rewards if you like.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          Add a video message
          <span className="bg-yellow-500 text-xs text-white font-bold py-0.5 px-1.5 rounded-full">
            NEW!
          </span>
        </button>

        <button className="flex items-center justify-center gap-2 text-blue-600 font-medium py-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Preview message
        </button>
      </div>
    </div>
  );
};

export default ThankYouMessage;
