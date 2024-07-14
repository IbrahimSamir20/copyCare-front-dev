import { z } from 'zod';
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

export type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;
