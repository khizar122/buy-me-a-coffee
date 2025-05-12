'use client';

import React, { useEffect, useState, useRef } from 'react';
import VerificationSuccess from '@/containers/(auth)/varify';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const VerifiedEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const tokenProcessed = useRef(false); // Ref to prevent multiple API calls

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token && !tokenProcessed.current) {
      tokenProcessed.current = true; // Mark token as processed
      verifyEmail(token);
    }
  }, []); // Empty dependency array ensures this runs only once

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/verified-email?token=${token}`);
      const data = await response.json();

      if ((data as any)?.status === 'success') {
        setIsVerified(true);
        window.history.replaceState({}, document.title, '/verified-email');
      } else {
        setErrorMessage((data as any)?.message || 'Invalid token');
        setIsVerified(false);
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      setErrorMessage('Verification failed');
      setIsVerified(false);
    } finally {
      setIsLoading(false); // Stop loading after the API response
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 sm:px-16 w-full justify-center items-center min-h-screen">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="images/logo.svg" alt="Flzr" className="h-20" />
        </div>
        <div className="text-center p-8 bg-white rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-opacity-50 mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Verifying Email...</h1>
            <p className="text-gray-600">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return isVerified ? (
    <VerificationSuccess />
  ) : (
    <div className="flex flex-col gap-4 px-4 sm:px-16 w-full justify-center items-center min-h-screen">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="images/logo.svg" alt="Flzr" className="h-20" />
      </div>
      <div className="text-center p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
          <p className="text-gray-600 mb-6">
            {errorMessage ||
              'Your email verification link is invalid or expired.'}
          </p>
          <Button asChild>
            <Link href="/signin">Go to Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
