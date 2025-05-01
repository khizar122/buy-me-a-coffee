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
import { cn } from '@/lib/utils';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { useSignUp } from './hooks/useSignUp';

import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  preload: false
});

const SignUpContainer = () => {
  const { form, error, successMessage, onSubmit, isPending, loading } =
    useSignUp();

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="images/logo.svg" alt="Flzr" className="h-20" />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Sign Up</h2>
        <p className="text-sm text-gray-500 mt-2">
          Enter your details to sign up
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4 sm:px-16 w-full"
        >
          <div className="flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="bg-white">
                  <FormLabel
                    className={cn(
                      'text-signupLabel text-sm font-semibold',
                      font.className
                    )}
                  >
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full" // Adjusted width
                      disabled={isPending}
                      placeholder="Enter Username"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="bg-white">
                  <FormLabel
                    className={cn(
                      'text-signupLabel text-sm font-semibold',
                      font.className
                    )}
                  >
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full" // Adjusted width
                      disabled={isPending}
                      placeholder="Enter Email Address"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      'text-signupLabel text-sm font-semibold',
                      font.className
                    )}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full" // Adjusted width
                      disabled={isPending}
                      placeholder="Enter Password"
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      'text-signupLabel text-sm font-semibold',
                      font.className
                    )}
                  >
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full" // Adjusted width
                      disabled={isPending}
                      placeholder="Enter Password"
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="px-3 py-2 border border-[#D1D5DB] rounded-lg text-base focus:ring-1 focus:ring-[#D1D5DB] focus:border-[#D1D5DB] w-full"
          >
            Sign Up
            {loading && <FaSpinner className="animate-spin ml-2" />}
          </Button>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Already have an account? '}
            <Link
              href="/signin"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign In
            </Link>
          </p>

          <div className="max-h-[4px]">
            <FormError message={error} />
            <FormSuccess message={successMessage} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpContainer;
