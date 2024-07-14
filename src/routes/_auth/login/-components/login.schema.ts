import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Phone/Username/Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
