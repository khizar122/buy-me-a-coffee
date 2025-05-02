// validators/index.ts
import * as z from 'zod';

// You can add this alongside your existing validators

export const OTPValidator = z.object({
  otp: z
    .string()
    .length(4, { message: 'Verification code must be 4 characters' })
    .regex(/^\d{4}$/, { message: 'Verification code must be 4 digits' })
});

export const ResendOTPValidator = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' })
});
