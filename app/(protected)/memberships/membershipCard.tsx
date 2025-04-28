'use Client';

import React from 'react';
import Image from 'next/image';

const MembershipCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Enable membership section */}
      <div className="p-8 pb-16 text-center border-b border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Enable membership
        </h2>
        <p className="text-gray-400 uppercase text-sm font-medium tracking-wide mb-6">
          HIGHLY RECOMMENDED
        </p>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-full inline-flex items-center transition-colors">
          Enable membership
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Earn recurring income section */}
      <div className="p-8 border-b border-gray-100">
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Earn recurring income
            </h2>
            <p className="text-gray-600">
              Memberships are a great way to build recurring revenue, create
              engagement, and build deep and meaningful relationships with your
              fans. Start earning monthly/yearly upfront payments doing what you
              love!
            </p>
          </div>

          <div className="w-full md:w-1/2 md:order-1">
            {/* Stats visualization */}
            <div className="relative w-full h-64 md:h-72">
              {/* Stats Cards */}
              <div className="absolute top-0 left-5 z-20 bg-white rounded-lg p-3 shadow-md transform -rotate-3">
                <div className="text-3xl font-bold">86</div>
                <div className="text-xs uppercase text-gray-500">MEMBERS</div>
              </div>

              <div className="absolute top-10 right-5 z-20 bg-gray-800 text-white rounded-lg p-3 shadow-md transform rotate-3">
                <div className="text-xl font-bold">$120</div>
              </div>

              <div className="absolute bottom-0 right-10 z-20 bg-white rounded-lg p-3 shadow-md transform rotate-2">
                <div className="text-3xl font-bold">$30</div>
                <div className="text-xs uppercase text-gray-500">
                  MONTHLY INCOME
                </div>
              </div>

              {/* Rewards Card */}
              <div className="absolute left-0 bottom-5 z-20 bg-white rounded-lg p-3 shadow-md w-44 transform -rotate-6">
                <div className="text-md font-bold text-yellow-400 mb-2">
                  REWARDS
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purple Wave Background */}
              <div className="absolute inset-0 z-10">
                <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0,100 C150,160 250,20 400,100 L400,200 L0,200 Z"
                    fill="rgba(168, 85, 247, 0.2)"
                  />
                  <path
                    d="M0,140 C100,110 300,180 400,120 L400,200 L0,200 Z"
                    fill="rgba(168, 85, 247, 0.1)"
                  />
                  <path
                    d="M0,100 C150,160 250,20 400,100"
                    fill="none"
                    stroke="rgba(168, 85, 247, 0.8)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share exclusives section */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Share exclusives
            </h2>
            <p className="text-gray-600">
              Share exclusive posts, messages or other rewards with your
              members. Creators also turn on membership without rewards, only to
              accept monthly support.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative w-full h-48 md:h-56">
              <Image
                src="/images/membership-exclusives.png"
                alt="Exclusive content for members"
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
