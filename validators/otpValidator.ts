import * as z from 'zod';

export const OTPValidator = z.object({
  otp: z.number().min(4, {
    message: 'OTP is required'
  })
});
