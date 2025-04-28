import React, { ReactNode } from 'react';

export interface EarningOptionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

export const EarningOptionCard: React.FC<EarningOptionCardProps> = ({
  icon,
  title,
  description,
  buttonText
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-auto">{description}</p>
      <div className="mt-6">
        <button className="flex items-center justify-between text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
          {buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 ml-2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};
