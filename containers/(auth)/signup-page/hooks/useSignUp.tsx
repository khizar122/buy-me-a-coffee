import { RegisterValidator } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


import { signIn } from 'next-auth/react'; // Use NextAuth's signIn here

export const useSignUp = () => {
  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
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
    // async (values: z.infer<typeof RegisterValidator>) => {
    //   clearMessages(); // Reset states
    //   setLoading(true);
    //   try {
    //     const registerData = await register({
    //       email: values?.email,
    //       name: values?.name,
    //       password: values?.password
    //     });

    //     if (registerData?.status === 'success') {
    //       // Trigger client-side redirection using signIn
    //       await signIn('credentials', {
    //         email: values?.email,
    //         password: values?.password,
    //         redirect: true, // Enable redirection
    //         callbackUrl: '/dashboard'
    //       });
    //     } else {
    //       setError(registerData?.status || 'Registration failed.');
    //     }
    //   } catch (err) {
    //     console.error('Registration Error:', err);
    //     setError(
    //       'Unable to connect to the server. Please check your internet connection and try again.'
    //     );
    //   } finally {
    //     setLoading(false);
    //   }
    // },
    // [clearMessages]
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
