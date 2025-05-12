import { ResetPasswordValidator } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useSignUp = () => {
  const defaultValues = useMemo(
    () => ({
      password: '',
      confirmPassword: ''
    }),
    []
  );

  const form = useForm<z.infer<typeof ResetPasswordValidator>>({
    resolver: zodResolver(ResetPasswordValidator),
    defaultValues
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPending] = useTransition();
  const [loading, setLoading] = useState<boolean>(false);

  const clearMessages = useCallback(() => {
    setError('');
    setSuccessMessage('');
  }, []);

  const onSubmit = useCallback(async () => {
    clearMessages(); // Reset states
    setLoading(true);
    try {
    } catch (err) {
      setError(
        'Unable to connect to the server. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [error, successMessage, loading]);

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
