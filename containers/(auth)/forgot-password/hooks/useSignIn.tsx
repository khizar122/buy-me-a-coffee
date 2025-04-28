import { ForgetPasswordValidator } from '@/validators'; // Update to ForgetPasswordValidator
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useSignIn = () => {
  const defaultValues = useMemo(
    () => ({
      email: ''
    }),
    []
  );

  const form = useForm<z.infer<typeof ForgetPasswordValidator>>({
    resolver: zodResolver(ForgetPasswordValidator), // Use ForgetPasswordValidator
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
    async (values: z.infer<typeof ForgetPasswordValidator>) => {
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
