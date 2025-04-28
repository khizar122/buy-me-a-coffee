import { OTPValidator } from '@/validators'; // Update to OTPValidator
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useSignIn = () => {
  const defaultValues = useMemo(
    () => ({
      otp: 0
    }),
    []
  );

  const form = useForm<z.infer<typeof OTPValidator>>({
    resolver: zodResolver(OTPValidator), // Use OTPValidator
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
    async (values: z.infer<typeof OTPValidator>) => {
      clearMessages(); // Reset states
      setLoading(true);
      try {
        console.log('try', values);
      } catch (err) {
        setError(
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    },
    [error, successMessage, loading]
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
