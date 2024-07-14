import { z } from 'zod';
export const registerSchema = z
  .object({
    person: z
      .object({
        firstname: z.string().min(1, 'first name is required'),
        lastname: z.string().min(1, 'last name is required'),
        tenantId: z.number(),
      })
      .required(),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    tenantId: z.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;
