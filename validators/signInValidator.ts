// validators/index.ts
import * as z from 'zod';

// You can add this alongside your RegisterValidator
export const SignInValidator = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),

  password: z.string().min(1, { message: 'Password is required' }),

  isRemember: z.boolean().optional().default(false)
});
