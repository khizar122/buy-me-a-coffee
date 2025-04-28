import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // You can keep this import if needed for redirection
import { FaSpinner } from 'react-icons/fa';
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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignUp } from './hooks/useSignUp';

const ResetPasswordContainer = () => {
  const [otp, setOtp] = useState<string | undefined>(''); // State for OTP
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const { form, error, successMessage, onSubmit, isPending, loading } = useSignUp();
  const router=useRouter()
  // UseEffect for directly extracting OTP from the URL query params
  useEffect(() => {
    // Using window.location to get the query params
    const urlParams = new URLSearchParams(window.location.search);
    const otpParam = urlParams.get('otp');
    if (otpParam) {
      setOtp(otpParam); // Set OTP value from the URL
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setPasswordMismatchError('Invalid OTP!');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError('Password mismatch! Please enter again.');
      return;
    }

    try {
      const response = await fetch('api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp, // Pass OTP to the API
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/signin');
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full">
      <div className="flex justify-center">
        <img src="images/logo.svg" alt="Flzr" className="h-20" />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Reset Password</h2>
        <p className="text-sm text-gray-500 mt-2">
          <b>Email verified!</b> Please enter a new password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4 px-4 sm:px-16 w-full">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full"
                      disabled={isPending}
                      placeholder="Enter Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-[6px] pl-4 h-10 w-full"
                      disabled={isPending}
                      placeholder="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="max-h-[4px]">
            <FormError message={error} />
            <FormSuccess message={successMessage} />
          </div>

          {passwordMismatchError && (
            <div className="text-red-500 text-sm mt-2">{passwordMismatchError}</div>
          )}

          <Button
            type="submit"
            className="px-3 py-2 border border-[#D1D5DB] rounded-lg w-full"
            disabled={isPending || loading}
          >
            {loading ? <FaSpinner className="animate-spin ml-2" /> : 'Reset'}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            <Link href="/signin" className="font-semibold text-gray-800 hover:underline">
              Cancel
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordContainer;
