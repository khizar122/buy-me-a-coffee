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
import { useSignIn } from './hooks/useSignIn';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { FaSpinner } from 'react-icons/fa';
const SignInContainer = () => {
  const { form, error, successMessage, onSubmit, isPending, loading } =
    useSignIn();

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="images/logo.svg" alt="Flzr" className="h-20" />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Sign In</h2>
        <p className="text-sm text-gray-500 mt-2">
          Enter your email and password to sign in
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-4 mt-5">
                <div className="flex justify-between">
                  <FormLabel className="text-sm text-[#111827] font-medium">
                    Password
                  </FormLabel>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#4B5563] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isRemember"
            render={({ field }) => (
              <div className="flex items-center pt-4 mt-4">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="mr-2"
                />
                <FormLabel className="text-sm text-[#111827] font-medium">
                  Keep me logged in
                </FormLabel>
              </div>
            )}
          />

          {/* <div className="flex items-center pt-4 mt-4">
            <Checkbox className="mr-2" name="isRemember" />
            <FormLabel className="text-sm text-[#111827] font-medium">
              Keep me logged in
            </FormLabel>
          </div> */}
          <div className="flex items-center  pt-4 mt-4">
            <Button
              type="submit"
              disabled={isPending}
              className=" px-3 py-2 border border-[#D1D5DB] rounded-lg text-base focus:ring-1 focus:ring-[#D1D5DB] focus:border-[#D1D5DB] w-full"
            >
              Sign In
              {loading && <FaSpinner className="animate-spin ml-2" />}
            </Button>
          </div>
          <div className="flex items-center justify-between pt-4 mt-4">
            <a href="/signup" className="text-sm text-[#4B5563]">
              Don't have an account?
            </a>
            <a
              href="/signup"
              className="text-sm text-[#4B5563] hover:underline"
            >
              Create an account
            </a>
          </div>
          {error && <FormError message={error} />}
          {/* <FormSuccess message={successMessage} /> */}
        </form>
      </Form>
    </div>
  );
};

export default SignInContainer;
