import { SignInValidator } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInUser } from '@/actions/auth';

export const useSignIn = () => {
  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
      isRemember: false
    }),
    []
  );

  const router = useRouter();
  const form = useForm<z.infer<typeof SignInValidator>>({
    resolver: zodResolver(SignInValidator),
    defaultValues
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<boolean>(false);

  const clearMessages = useCallback(() => {
    setError('');
    setSuccessMessage('');
  }, []);

  const onSubmit = useCallback(
    async (values: z.infer<typeof SignInValidator>) => {
      clearMessages(); // Reset states
      setLoading(true);

      try {
        // Using the server action directly
        startTransition(async () => {
          const result = await signInUser({
            email: values.email,
            password: values.password,
            isRemember: values.isRemember || false
          });

          if (result.success) {
            setSuccessMessage(
              'Sign-in successful. Redirecting to dashboard...'
            );
            toast.success('Sign-in successful');

            // Redirect to dashboard
            router.push('/dashboard');
          } else {
            // Special case for unverified users
            if (result.needsVerification) {
              toast.info('Email verification required');
              // Redirect to verify OTP page
              router.push(
                `/verify-otp?email=${encodeURIComponent(result.email)}&from=login`
              );
              return;
            }

            setError(result.error || 'Sign-in failed.');
            toast.error(result.error || 'Sign-in failed');
          }

          setLoading(false);
        });
      } catch (err) {
        console.error('Sign-in Error:', err);
        setError(
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
        toast.error('Connection error');
        setLoading(false);
      }
    },
    [clearMessages, router]
  );

  return useMemo(
    () => ({
      form,
      error,
      successMessage,
      onSubmit,
      isPending,
      loading
    }),
    [form, error, successMessage, onSubmit, isPending, loading]
  );
};
