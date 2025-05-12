// hooks/useVerifyOTP.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { OTPValidator } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { resendOTP, verifyOTP } from '@/actions/auth';

export const useVerifyOTP = () => {
  const [otp, setOtp] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isResending, setIsResending] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const form = useForm<z.infer<typeof OTPValidator>>({
    resolver: zodResolver(OTPValidator),
    defaultValues: {
      otp: ''
    }
  });

  // Clear messages when component mounts or email changes
  useEffect(() => {
    setError(null);
    setSuccessMessage('');
  }, [email]);

  // Handle OTP change
  const handleOtpChange = useCallback(
    (value: string) => {
      setOtp(value);
      form.setValue('otp', value);

      // Clear error when user changes OTP
      if (error) {
        setError(null);
      }
    },
    [error, form]
  );

  // Handle OTP completion
  const handleComplete = useCallback(
    (value: string) => {
      setOtp(value);
      form.setValue('otp', value);

      // Auto-submit when all 4 digits are entered
      if (value.length === 4 && email) {
        form.handleSubmit(onSubmit)();
      }
    },
    [email, form]
  );

  // Handle form submission
  const onSubmit = useCallback(
    async (values: z.infer<typeof OTPValidator>) => {
      if (!email) {
        setError(
          'Email not found. Please try again or go back to the sign-in page.'
        );
        return;
      }

      setIsSubmitting(true);
      setError(null);
      setSuccessMessage('');

      try {
        const result = await verifyOTP({ email, otp: values.otp });

        if (result.success) {
          setSuccessMessage('Email verified successfully!');
          toast.success('Email verified successfully!');

          // Redirect to signin page after successful verification
          setTimeout(() => {
            router.push('/signin');
          }, 1500);
        } else {
          setError(result.error || 'Verification failed. Please try again.');
          toast.error(result.error || 'Verification failed');
        }
      } catch (err) {
        console.error('OTP verification error:', err);
        setError('Something went wrong. Please try again later.');
        toast.error('Verification failed');
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, otp, router]
  );

  // Handle resend OTP
  const handleResend = useCallback(async () => {
    if (!email) {
      setError(
        'Email not found. Please try again or go back to the sign-in page.'
      );
      return;
    }

    setIsResending(true);

    try {
      const result = await resendOTP({ email });

      if (result.success) {
        toast.success('A new verification code has been sent to your email');
        setSuccessMessage(
          'A new verification code has been sent to your email'
        );
        setError(null);
      } else {
        toast.error(result.error || 'Failed to resend verification code');
        setError(result.error || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend verification code');
      setError('Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  }, [email]);

  return {
    otp,
    error,
    successMessage,
    isSubmitting,
    isResending,
    email,
    form,
    handleOtpChange,
    handleComplete,
    onSubmit,
    handleResend
  };
};

export default useVerifyOTP;
