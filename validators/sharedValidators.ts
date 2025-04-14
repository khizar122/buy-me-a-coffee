import * as z from 'zod';

export const emailValidator = z
  .string()
  .trim()
  .email({
    message: 'Enter a valid email address'
  })
  .transform((email) => email.toLowerCase());
