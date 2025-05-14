import type React from 'react';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full border border-amber-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-auto">{description}</p>
      <div className="mt-6">
        <button className="flex items-center justify-between text-amber-700 font-medium py-2 px-4 border border-amber-200 rounded-full hover:bg-amber-50 transition-colors w-full">
          {buttonText}
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
