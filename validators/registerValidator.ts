import * as z from 'zod';
import { emailValidator } from './sharedValidators';

export const RegisterValidator = z
  .object({
    email: emailValidator,
    password: z.string().trim().min(8, {
      message: 'Minimum 8 characters required'
    }),
    confirmPassword: z.string().trim().min(1, {
      message: 'Confirm Password is required'
    }),
    name: z.string().trim().min(1, {
      message: 'Name is required'
    })
  })
  .refine(
    (val) => {
      const hasUpperCase = /[A-Z]/.test(val.password);
      const hasLowerCase = /[a-z]/.test(val.password);
      const hasNumber = /[0-9]/.test(val.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val.password);

      return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    },
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      path: ['password']
    }
  );
