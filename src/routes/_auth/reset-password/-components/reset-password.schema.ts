import { z } from 'zod';
export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;
