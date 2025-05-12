import React, { ReactNode } from 'react';
import { EarningsCard } from './earningCard';
import { EarningOptionCard } from './earningOptionCard';

interface SupporterStats {
  supporters: number;
  membership: number;
  shop: number;
}

interface EarningsData {
  earnings: number;
  timeframe: string;
  supporterStats: SupporterStats;
}

interface EarningOption {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

const Dashboard: React.FC = () => {
  // Sample data - replace with your actual data
  const earningsData: EarningsData = {
    earnings: 0,
    timeframe: 'Last 30 days',
    supporterStats: {
      supporters: 0,
      membership: 0,
      shop: 0
    }
  };

  // Static data for the earning options cards
  const earningOptions: EarningOption[] = [
    {
      icon: (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFD700"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      ),
      title: 'Membership',
      description: 'Monthly membership for your biggest fans and supporters.',
      buttonText: 'Enable'
    },
    {
      icon: (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFD700"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500"
          >
            <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
            <rect x="4" y="4" width="16" height="8" rx="2" ry="2"></rect>
          </svg>
        </div>
      ),
      title: 'Shop',
      description: 'Introducing Shop, the creative way to sell.',
      buttonText: 'Enable'
    },
    {
      icon: (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFD700"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
            <path d="M6 9h12"></path>
            <path d="M6 14h12"></path>
          </svg>
        </div>
      ),
      title: 'Exclusive posts',
      description:
        'Publish your best content exclusively for your supporters and members.',
      buttonText: 'Write a post'
    }
  ];

  return (
    <div
      className="flex flex-col border-gray-400 rounded-lg bg-profile-bg"
      // style={{ backgroundColor: '' }}
    >
      {/* Main content */}
      <div className="flex flex-1">
        {/* Main content area */}
        <div className="flex-1 p-3 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <EarningsCard
              earnings={earningsData.earnings}
              timeframe={earningsData.timeframe}
              supporterStats={earningsData.supporterStats}
            />

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full flex flex-col items-center justify-center py-8 sm:py-16">
              <div className="mb-3 sm:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                You don't have any supporters yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500 text-center">
                Share your page with your audience to get started.
              </p>
            </div>

            <div className="w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                More ways to earn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {earningOptions.map((option, index) => (
                  <EarningOptionCard
                    key={index}
                    icon={option.icon}
                    title={option.title}
                    description={option.description}
                    buttonText={option.buttonText}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4 sm:gap-x-6 pt-3 sm:pt-4 pb-4 sm:pb-6 border-t border-gray-200">
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
              >
                FAQ
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
              >
                Refer a Creator
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
