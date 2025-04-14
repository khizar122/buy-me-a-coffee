import * as z from 'zod';
import { emailValidator } from './sharedValidators';

export const SignInValidator = z.object({
  email: emailValidator,
  password: z.string().trim().min(1, {
    message: 'Password is required'
  }),
  isRemember: z.boolean().default(false)
});
