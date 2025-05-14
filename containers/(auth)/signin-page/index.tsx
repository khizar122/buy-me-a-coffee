'use client';

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
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useSignIn } from './hooks/useSignIn';
import Image from 'next/image';
import drink from '../../../public/images/drink.svg';
import { Button } from '@/components/ui/button';

// DrinkWithMe Logo Component
const DrinkWithMeLogo = () => {
  return (
    <div className="flex items-center justify-start">
      <div className="flex items-center gap-2">
        <Image src={drink} alt="Logo" width={140} height={140} />
      </div>
    </div>
  );
};

const SignInContainer = () => {
  const { form, error, onSubmit, isPending, loading } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header with logo */}
        <div className="bg-gradient-to-r from-amber-300 to-amber-400 p-4">
          <DrinkWithMeLogo />
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-800">Welcome back</h2>
            <p className="text-gray-600 mt-1">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <FormLabel className="block text-gray-700">Email</FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending || loading}
                          placeholder="john@example.com"
                          type="email"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel className="block text-gray-700">
                    Password
                  </FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:text-primary/90 text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            disabled={isPending || loading}
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending || loading}
                className="w-full text-white py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 mt-6"
              >
                {loading ? (
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
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {error && <FormError message={error} />}
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/90 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContainer;
