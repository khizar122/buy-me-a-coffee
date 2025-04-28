import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import React, { useState } from 'react';

import StandardView from './standardView';
import SuggestedAmounts from './suggestedAmount';

const ChooseLayout: React.FC = () => {
  const [selectedLayout, setSelectedLayout] = useState<
    'standard' | 'suggested'
  >('suggested');
  const [isEditMode, setIsEditMode] = useState(false);
  const [buttonText, setButtonText] = useState('Support');

  const handleLayoutChange = (layout: 'standard' | 'suggested') => {
    setSelectedLayout(layout);
  };

  const handleButtonTextChange = (value: string) => {
    setButtonText(value);
  };

  const saveButtonText = () => {
    setIsEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Choose a layout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Standard View Option */}
        <div
          className={`border rounded-lg p-4 relative ${
            selectedLayout === 'standard' ? 'border-black' : 'border-gray-200'
          }`}
        >
          <div className="absolute top-4 left-4">
            <div
              className={`w-5 h-5 rounded-full border ${
                selectedLayout === 'standard'
                  ? 'border-black'
                  : 'border-gray-300'
              } flex items-center justify-center`}
              onClick={() => handleLayoutChange('standard')}
            >
              {selectedLayout === 'standard' && (
                <div className="w-3 h-3 bg-black rounded-full"></div>
              )}
            </div>
          </div>
          <div className="ml-8 mb-3 font-medium">Standard view</div>
          <StandardView />
        </div>

        {/* Suggested Amounts Option */}
        <div
          className={`border rounded-lg p-4 relative ${
            selectedLayout === 'suggested' ? 'border-black' : 'border-gray-200'
          }`}
        >
          <div className="absolute top-4 left-4">
            <div
              className={`w-5 h-5 rounded-full border ${
                selectedLayout === 'suggested'
                  ? 'border-black'
                  : 'border-gray-300'
              } flex items-center justify-center`}
              onClick={() => handleLayoutChange('suggested')}
            >
              {selectedLayout === 'suggested' && (
                <div className="w-3 h-3 bg-black rounded-full"></div>
              )}
            </div>
          </div>
          <div className="ml-8 mb-3 font-medium">Suggested amounts</div>
          <SuggestedAmounts />
        </div>
      </div>

      {/* Button Wording Section with shadcn/ui Select */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-bold text-gray-800">Button wording</h3>
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
          </div>
          {isEditMode ? (
            <button
              className="text-gray-800 font-medium text-sm hover:underline"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              className="text-gray-800 font-medium text-sm hover:underline"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
          )}
        </div>

        {isEditMode ? (
          <>
            <div className="mb-4">
              <Select
                defaultValue={buttonText}
                onValueChange={handleButtonTextChange}
              >
                <SelectTrigger className="w-full border border-gray-200 rounded-md">
                  <SelectValue placeholder="Select button text" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Donate">Donate</SelectItem>
                  <SelectItem value="Tip">Tip</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={saveButtonText}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-md"
            >
              Save
            </Button>
          </>
        ) : (
          <div className="mb-4">
            <div className="text-gray-600">{buttonText}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseLayout;
