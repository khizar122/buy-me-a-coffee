'use client';

// components/SupportCard.tsx
import { useState } from 'react';

interface SupportCardProps {
  username: string;
  onSupport?: (
    name: string,
    message: string,
    amount: number,
    isRecurring: boolean
  ) => void;
}

const SupportCard: React.FC<SupportCardProps> = ({
  username,
  onSupport = () => {}
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(5); // Default to 5
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSupport(name, message, amount, isRecurring);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">
          Buy <span className="text-gray-800">{username}</span> a slice of cake
        </h2>

        <div className="bg-pink-50 p-4 rounded-xl mb-4">
          <div className="flex items-center">
            {/* Coffee Icon */}
            <div className="flex-shrink-0 mr-2">
              <div className="w-10 h-10 relative">
                <img
                  src="/coffee-cup.svg"
                  alt="Coffee cup"
                  className="w-10 h-10"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.parentElement.innerHTML = `
                      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="#8B5E3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" fill="#D7B9A3" stroke="#8B5E3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 1v3M10 1v3M14 1v3" stroke="#8B5E3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    `;
                  }}
                />
              </div>
            </div>
            <div className="text-xl font-bold mr-2">×</div>

            {/* Amount selection buttons */}
            <div className="flex gap-2">
              {[1, 3, 5, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg transition-colors ${
                    amount === value
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-100'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name or @yoursocial"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Say something nice..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[100px] resize-none"
            />
            <div className="flex justify-end mt-1">
              <button
                type="button"
                className="text-gray-500 bg-white p-2 rounded-full border border-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 7l-7 5 7 5V7z"></path>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              id="monthly-checkbox"
              type="checkbox"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
              className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
            />
            <label
              htmlFor="monthly-checkbox"
              className="ml-2 text-sm text-gray-700"
            >
              Make this monthly
            </label>
            <button
              type="button"
              className="ml-1 text-gray-500 hover:text-gray-700"
              aria-label="More information about monthly payments"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4M12 8h.01"></path>
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 px-4 rounded-full hover:bg-pink-600 transition-colors font-medium text-lg"
          >
            Support £{amount}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportCard;
