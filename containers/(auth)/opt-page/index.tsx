'use client';

import { FormError } from '@/components/form-error';
import {
  Form
  // FormMessage
} from '@/components/ui/form';
import { useSignIn } from './hooks/useSignIn';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
const OTPContainer: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const searchParams = useSearchParams(); // Hook to access URL parameters
  const emailId = searchParams.get('email'); // Example parameter

  const handleComplete = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage('');
    setIsPending(true);

    try {
      const response = await fetch('api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp, email: emailId })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('OTP verified successfully');
        router.push(`/reset-password?otp=${otp}`);
      } else {
        setError(data.message || 'OTP verification failed.');
        toast.error('Failed to verify OTP');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="images/logo.svg" alt="Flzr" className="h-20" />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          We have sent a verification code to your email. Please check your
          inbox and enter the OTP code.
        </p>
      </div>
      {/* <Form {...form}> */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onComplete={handleComplete}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex items-center pt-4 mt-4">
          <Button
            type="submit"
            // onClick={handleVerify}
            disabled={otp.length !== 4}
            className=" px-3 py-2 border border-[#D1D5DB] rounded-lg text-base focus:ring-1 focus:ring-[#D1D5DB] focus:border-[#D1D5DB] w-full"
          >
            {/* <Link href="/reset-password">Varify</Link> */}
            Varify
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
          {"Didn't recieve code? "}
          <span
            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            onClick={() => {
              toast.success(
                'A new verification code has been sent to your email'
              );
            }}
          >
            {' '}
            Send again
          </span>
        </p>
        <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
          {'Back to '}
          <Link
            href="/signin"
            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
          >
            Sign in
          </Link>
        </p>
        {error && <FormError message={error} />}
        {/* <FormSuccess message={successMessage} /> */}
      </form>
      {/* </Form> */}
    </div>
  );
};

export default OTPContainer;
