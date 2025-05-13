'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const KrooloLogo = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <Image
        src="/images/drink.svg" // path relative to the public folder
        alt="Kroolo Logo"
        width={180} // adjust based on your needs
        height={100} // adjust based on your needs
      />
    </div>
  );
};

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
    <div className="max-w-[500px] mx-auto border border-gray-200 rounded-lg p-8 shadow-sm">
      {/* Kroolo Logo */}
      <KrooloLogo />

      <div className="text-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Reset Password</h2>
        <p className="text-sm text-gray-500 mt-2">
          Please enter the email address associated with your account. We will
          send instructions to that email address on how to reset your password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <FormLabel className="block text-gray-700 font-medium">
              Email
            </FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              'Send OTP'
            )}
          </Button>

          {successMessage && (
            <p className="text-green-600 font-medium text-center mt-4">
              {successMessage}
            </p>
          )}

          {error && <FormError message={error} />}
        </form>
      </Form>

      {/* Sign In Link */}
      <div className="text-center mt-6 mb-4">
        <p className="text-gray-700">
          Back to{' '}
          <Link
            href="/signin"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordContainer;
