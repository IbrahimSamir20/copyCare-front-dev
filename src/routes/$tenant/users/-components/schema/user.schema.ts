import { z } from 'zod';
import { personSchema } from './person.schema'; // Ensure this path is correct

export const baseSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  roleId: z.number().min(1),
  person: personSchema.optional(),
});

export const addSchema = baseSchema.extend({
  password: z.string().min(8).max(30),
});

export type UserSchema = z.infer<typeof baseSchema> & { password?: string };
