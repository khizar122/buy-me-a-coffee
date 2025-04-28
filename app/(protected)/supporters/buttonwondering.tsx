import React, { useState } from 'react';

interface ButtonWordingProps {
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

const ButtonWording: React.FC<ButtonWordingProps> = ({
  initialValue = 'Support',
  onValueChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const options = ['Support', 'Donate', 'Tip'];

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(option);
    }
  };

  return (
    <div className="relative">
      <div
        className="border border-gray-200 rounded-md p-3 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className="p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ButtonWording;
