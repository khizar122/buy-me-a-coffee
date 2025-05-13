'use client';

// app/profile/[id]/PaymentModal.tsx
import React from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  username: string;
  amount: number;
  isRecurring: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  username,
  amount,
  isRecurring
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Support {username}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <p className="mb-4">
          You'll be charged £{amount}
          {isRecurring ? ' monthly' : ''}
        </p>

        {/* Simulated payment form */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full p-3 border rounded-lg bg-gray-100"
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry date
            </label>
            <input
              type="text"
              placeholder="MM / YY"
              className="w-full p-3 border rounded-lg bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              className="w-full p-3 border rounded-lg bg-gray-100"
              disabled
            />
          </div>
        </div>

        <button
          onClick={onSuccess}
          className="w-full bg-pink-500 text-white py-3 px-4 rounded-full hover:bg-pink-600 transition-colors font-medium text-lg"
        >
          Pay
        </button>

        <div className="text-xs text-gray-500 mt-4 text-center">
          This is a simulation. No actual payment will be processed.
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
