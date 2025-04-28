import * as z from 'zod';
import { emailValidator } from './sharedValidators';

export const ForgetPasswordValidator = z.object({
  email: emailValidator
});

export const ResetPasswordValidator = z.object({
  password: z.string().trim().min(8, {
    message: 'Minimum 8 characters required'
  }),
  confirmPassword: z.string().trim().min(1, {
    message: 'Confirm Password is required'
  })
});
