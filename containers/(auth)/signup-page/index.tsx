'use client';

import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
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
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import { useSignUp } from './hooks/useSignUp';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  preload: false
});

// Kroolo Logo Component
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


// Google Logo Component
const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.8055 10.2275C19.8055 9.51 19.7455 8.7925 19.6255 8.1H10.2055V11.8875H15.6255C15.3855 13.1075 14.6855 14.1425 13.6255 14.8175V17.2925H16.8255C18.7055 15.5725 19.8055 13.1275 19.8055 10.2275Z"
      fill="#4285F4"
    />
    <path
      d="M10.2055 20C12.9055 20 15.1655 19.11 16.8255 17.2925L13.6255 14.8175C12.7255 15.42 11.5655 15.77 10.2055 15.77C7.5855 15.77 5.3855 14.06 4.5855 11.71H1.2855V14.27C2.9455 17.7 6.3055 20 10.2055 20Z"
      fill="#34A853"
    />
    <path
      d="M4.5855 11.71C4.3855 11.11 4.2655 10.46 4.2655 9.8C4.2655 9.14 4.3855 8.49 4.5855 7.89V5.33H1.2855C0.645498 6.66 0.285498 8.17 0.285498 9.8C0.285498 11.43 0.645498 12.94 1.2855 14.27L4.5855 11.71Z"
      fill="#FBBC05"
    />
    <path
      d="M10.2055 3.83C11.6855 3.83 13.0055 4.35 14.0455 5.33L16.8655 2.51C15.1655 0.95 12.9055 0 10.2055 0C6.3055 0 2.9455 2.3 1.2855 5.73L4.5855 8.29C5.3855 5.94 7.5855 3.83 10.2055 3.83Z"
      fill="#EA4335"
    />
  </svg>
);

// Microsoft Logo Component
const MicrosoftLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.5 9.5H0V0H9.5V9.5Z" fill="#F25022" />
    <path d="M20 9.5H10.5V0H20V9.5Z" fill="#7FBA00" />
    <path d="M9.5 20H0V10.5H9.5V20Z" fill="#00A4EF" />
    <path d="M20 20H10.5V10.5H20V20Z" fill="#FFB900" />
  </svg>
);

const SignUpContainer = () => {
  const { form, error, successMessage, onSubmit, isPending, loading } =
    useSignUp();

  return (
    <div className="w-[500px] mx-auto border border-gray-200 rounded-lg p-8 shadow-sm">
      {/* Kroolo Logo */}
      <KrooloLogo />

      <div className="text-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">Sign up with</h2>
      </div>

      {/* Social Sign Up Buttons
      <div className="space-y-3 mb-6">
        <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <GoogleLogo />
          <span className="text-gray-700">Sign up with Google</span>
        </button>

        <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <MicrosoftLogo />
          <span className="text-gray-700">Sign up with Microsoft</span>
        </button>
      </div> */}

      {/* Divider
      <div className="flex items-center justify-center my-6">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-4 text-gray-500">Or</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <div>
              <FormLabel className="block text-gray-700 font-medium mb-1">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel className="block text-gray-700 font-medium mb-1">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel className="block text-gray-700 font-medium mb-1">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel className="block text-gray-700 font-medium mb-1">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
      <div className="text-center mt-6 mb-4">
        <p className="text-gray-700">
          Already have an account?{' '}
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

export default SignUpContainer;
