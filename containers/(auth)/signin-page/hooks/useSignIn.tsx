import { SignInValidator } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { signIn as clientSignIn } from 'next-auth/react'; // Import NextAuth's signIn

export const useSignIn = () => {
  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
      isRemember: false
    }),
    []
  );

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
        const signInResponse = await clientSignIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: true, // Enable redirection
          callbackUrl: '/dashboard'
        });

        if (signInResponse?.error) {
          setError(signInResponse.error || 'Sign-in failed.');
        } else {
          setSuccessMessage('Sign-in successful.');
        }
      } catch (err) {
        console.error('Sign-in Error:', err);
        setError(
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    },
    [clearMessages]
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
