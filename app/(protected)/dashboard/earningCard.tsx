import type React from 'react';
import { Upload, User } from 'lucide-react';

interface SupporterStats {
  supporters: number;
  membership: number;
  shop: number;
}

interface EarningsCardProps {
  earnings?: number;
  timeframe?: string;
  supporterStats?: SupporterStats;
  userName?: string;
  profileUrl?: string;
}

// EarningsCard component
const EarningsCard: React.FC<EarningsCardProps> = ({
  earnings = 0,
  timeframe = 'Last 30 days',
  supporterStats = { supporters: 0, membership: 0, shop: 0 },
  userName = 'Khizar',
  profileUrl = 'buymeacoffee.com/raokhizar4o'
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full border border-amber-100">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center">
            <User className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800 text-sm sm:text-base">
              Hi, {userName}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">{profileUrl}</p>
          </div>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1 w-full sm:w-auto transition-colors">
          <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
          Share page
        </button>
      </div>

      {/* Earnings Section */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Earnings
        </h2>
        <div className="relative">
          <select className="appearance-none bg-white border border-amber-200 text-gray-600 py-1 px-2 sm:px-3 pr-6 sm:pr-8 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500">
            <option>{timeframe}</option>
            <option>Last 90 days</option>
            <option>This year</option>
            <option>All time</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 sm:px-2 text-gray-700">
            <svg
              className="fill-current h-3 w-3 sm:h-4 sm:w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          ${earnings}
        </h3>
      </div>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <div className="flex flex-row sm:flex-col items-center">
          <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-300 mr-2 sm:mr-0 sm:mb-1"></span>
          <p className="text-xs sm:text-sm text-gray-500">
            ${supporterStats.supporters} Supporters
          </p>
        </div>
        <div className="flex flex-row sm:flex-col items-center">
          <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-500 mr-2 sm:mr-0 sm:mb-1"></span>
          <p className="text-xs sm:text-sm text-gray-500">
            ${supporterStats.membership} Membership
          </p>
        </div>
        <div className="flex flex-row sm:flex-col items-center">
          <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-700 mr-2 sm:mr-0 sm:mb-1"></span>
          <p className="text-xs sm:text-sm text-gray-500">
            ${supporterStats.shop} Shop
          </p>
        </div>
      </div>
    </div>
  );
};

export { EarningsCard };
