'use client';

import { useRouter } from 'next/navigation';

export default function ComingSoonPage({
  title = 'Coming Soon',
  description = "We're working hard to bring you this feature. Stay tuned!",

  redirectPath = '/',

  primaryColor = 'purple-500' // To match your existing theme
}) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(redirectPath);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-4 py-6">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Coming Soon Badge */}

          {/* Image placeholder - replace with your own image */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-32 w-32 text-${primaryColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            {description}
          </p>

          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="text-purple-500 hover:text-purple-700 font-medium flex items-center justify-center mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
