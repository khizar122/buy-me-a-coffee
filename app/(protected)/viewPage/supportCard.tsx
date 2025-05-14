'use client';

// app/profile/[id]/supportCard.tsx
import { useEffect, useState } from 'react';
import { toast } from 'sonner'; // Import toast
import PaymentModal from './paymentModal';

interface SupportCardProps {
  username: string;
  supportTerm: string | undefined;
  onSupport?: (
    name: string,
    email: string,
    message: string,
    amount: number,
    isRecurring: boolean
  ) => Promise<{ success: boolean; error?: string }>;
}

const SupportCard: React.FC<SupportCardProps> = ({
  username,
  supportTerm = '🍊 orange juice', // Default value
  onSupport = async () => ({ success: true })
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Added email field
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(5); // Default to 5
  const [isRecurring, setIsRecurring] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Extract emoji and text from supportTerm
  const [supportEmoji, setSupportEmoji] = useState('🍊');
  const [supportText, setSupportText] = useState('orange juice');

  useEffect(() => {
    if (supportTerm) {
      const match = supportTerm.match(/(\p{Emoji})\s?(.*)/u);

      if (match) {
        // We found an emoji and possibly text
        setSupportEmoji(match[1]);
        setSupportText(match[2] || 'orange juice'); // Default to orange juice if no text
      } else {
        // No emoji found, just use the whole string as text
        setSupportText(supportTerm);
      }
    }
  }, [supportTerm]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email) {
      toast.error('Please provide your name and email');
      return;
    }

    // Show payment modal
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    // Close modal first
    setShowPaymentModal(false);
    setIsProcessing(true);

    // Show loading toast
    const toastId = toast.loading('Processing your support...');

    try {
      // Call the onSupport prop and wait for result
      const result = await onSupport(name, email, message, amount, isRecurring);

      if (result.success) {
        // Show success toast
        toast.success(
          `Congratulations! You supported ${username} with ${amount} ${supportEmoji}`,
          {
            id: toastId
          }
        );

        // If recurring, show additional toast
        if (isRecurring) {
          setTimeout(() => {
            toast.success(
              `You will support ${username} with £${amount} monthly`,
              {
                icon: '🔄',
                duration: 5000
              }
            );
          }, 1000);
        }

        // Reset form
        setName('');
        setEmail('');
        setMessage('');
        setAmount(5);
        setIsRecurring(false);
      } else {
        // Show error toast
        toast.error(result.error || 'Failed to process support', {
          id: toastId
        });
      }
    } catch (error) {
      console.error('Error processing support:', error);
      toast.error('An unexpected error occurred', {
        id: toastId
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">
          Buy <span className="text-gray-800">{username}</span> a {supportText}
        </h2>

        <div className="bg-pink-50 p-4 rounded-xl mb-4">
          <div className="flex items-center">
            {/* Support Emoji */}
            <div className="flex-shrink-0 mr-2">
              <div className="w-10 h-10 relative flex items-center justify-center text-2xl">
                {supportEmoji}
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

        <form onSubmit={handleInitialSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name or @yoursocial"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          {/* Email field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
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
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Support £${amount}`}
          </button>
        </form>
      </div>

      {/* Payment Modal Component */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        username={username}
        amount={amount}
        isRecurring={isRecurring}
      />
    </div>
  );
};

export default SupportCard;
