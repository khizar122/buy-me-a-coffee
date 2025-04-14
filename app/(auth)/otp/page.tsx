'use client';
import { Suspense } from 'react';
import OTPContainer from '@/containers/(auth)/opt-page';
import React from 'react';

const OTP = () => {
  
  return <Suspense fallback={<div>Loading...</div>}>
          <OTPContainer />
       </Suspense>;
};

export default OTP;
