import { registerUser } from '@/actions/auth';
import { RegisterValidator } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


export const useSignUp = () => {
  const defaultValues = useMemo(
    () => ({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }),
    []
  );

  const form = useForm<z.infer<typeof RegisterValidator>>({
    resolver: zodResolver(RegisterValidator),
    defaultValues
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<boolean>(false);

  const clearMessages = useCallback(() => {
    setError('');
    setSuccessMessage('');
  }, []);

  const onSubmit = useCallback(
    async (values: z.infer<typeof RegisterValidator>) => {
      clearMessages(); // Reset states
      setLoading(true);

      try {
        // Using the server action directly
        startTransition(async () => {
          const result = await registerUser({
            username: values.username,
            email: values.email,
            password: values.password,
            displayName: values.username, // Use username as displayName
            isCreator: false // Default value for new users
          });

          if (result.success) {
            setSuccessMessage(
              'Registration successful! Redirecting to dashboard...'
            );

            // Trigger client-side redirection using signIn
            await signIn('credentials', {
              email: values?.email,
              password: values?.password,
              redirect: true, // Enable redirection
              callbackUrl: '/dashboard'
            });
          } else {
            setError(result.error || 'Registration failed.');
          }

          setLoading(false);
        });
      } catch (err) {
        console.error('Registration Error:', err);
        setError(
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
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
