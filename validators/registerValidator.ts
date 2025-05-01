import * as z from 'zod';
import { emailValidator } from './sharedValidators';

export const RegisterValidator = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(50, { message: 'Username cannot exceed 50 characters' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores'
      }),

    email: z.string().email({ message: 'Please enter a valid email address' }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter'
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),

    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });
