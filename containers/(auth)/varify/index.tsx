import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerificationSuccess() {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full justify-center items-center min-h-screen">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="images/logo.svg" alt="Flzr" className="h-20" />
      </div>

      <div className="text-center p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            Email Verified Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for verifying your email address. Your account is now
            active.
          </p>
          <Button asChild>
            <Link href="/signin">Go to Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
