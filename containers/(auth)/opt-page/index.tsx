'use client';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import useVerifyOTP from './hooks/useVerifyOTP';


const OTPContainer: React.FC = () => {
  const {
    otp,
    error,
    successMessage,
    isSubmitting,
    isResending,
    email,
    form,
    handleComplete,
    onSubmit,
    handleResend
  } = useVerifyOTP();

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/images/logo.svg" alt="Flzr" className="h-20" />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          We have sent a verification code to{' '}
          <span className="font-medium text-gray-700">
            {email || 'your email'}
          </span>
          . Please check your inbox and enter the 4-digit code below.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={otp}
                    onChange={(value) => {
                      field.onChange(value);
                      handleComplete(value);
                    }}
                    disabled={isSubmitting}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center pt-4 mt-4">
            <Button
              type="submit"
              disabled={otp.length !== 4 || isSubmitting}
              className="px-3 py-2 border border-[#D1D5DB] rounded-lg text-base focus:ring-1 focus:ring-[#D1D5DB] focus:border-[#D1D5DB] w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Didn't receive code? "}
            <Button
              variant="link"
              className="font-semibold p-0 h-auto text-gray-800 hover:underline dark:text-zinc-200"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send again'
              )}
            </Button>
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
          {successMessage && <FormSuccess message={successMessage} />}
        </form>
      </Form>
    </div>
  );
};

// Wrapper with Suspense to handle the search params
const OTPContainerWithSuspense = () => (
  <Suspense
    fallback={<div className="flex justify-center p-8">Loading...</div>}
  >
    <OTPContainer />
  </Suspense>
);

export default OTPContainerWithSuspense;
