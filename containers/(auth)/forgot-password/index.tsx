'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormError } from '@/components/form-error';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' })
});

const ForgotPasswordContainer = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      const response = await fetch('api/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: values.email })
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/otp?email=${values?.email}`);
      } else {
        setError(
          result.message || 'An error occurred. Please try again later.'
        );
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again later.');
    }
    setIsPending(false);
  };

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full">
      <div className="flex justify-center">
        <img src="/images/logo.svg" alt="Flzr" className="h-20" />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Please enter the email address associated with your account. We will
          send instructions to that email address on how to reset your password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#111827] font-medium">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center pt-4 mt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="px-3 py-2 border border-[#D1D5DB] rounded-lg text-base focus:ring-1 focus:ring-[#D1D5DB] focus:border-[#D1D5DB] w-full"
            >
              Send OTP
            </Button>
          </div>

          {successMessage && (
            <p className="text-center text-green-600 mt-4">{successMessage}</p>
          )}

          {error && <FormError message={error} />}

          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Back to '}
            <Link
              href="/signin"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordContainer;
