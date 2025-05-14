'use client';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import { useSignUp } from './hooks/useSignUp';
import drink from '../../../public/images/drink.svg';
import Image from 'next/image';
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

const SignUpContainer = () => {
  const { form, error, successMessage, onSubmit, isPending, loading } =
    useSignUp();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header with logo */}
        <div className="bg-gradient-to-r from-amber-300 to-amber-400 p-4">
          <DrinkWithMeLogo />
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-800">Sign up with</h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormLabel className="block text-gray-700 font-medium">
                    Username
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending || loading}
                            placeholder="Enter Username"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
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
                            disabled={isPending || loading}
                            placeholder="Enter Email Address"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel className="block text-gray-700 font-medium">
                    Password
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending || loading}
                            placeholder="Enter Password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel className="block text-gray-700 font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending || loading}
                            placeholder="Confirm Password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 mt-4"
                disabled={isPending || loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2 inline" />
                    Processing...
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>

              {error && <FormError message={error} />}
              {successMessage && <FormSuccess message={successMessage} />}
            </form>
          </Form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpContainer;
