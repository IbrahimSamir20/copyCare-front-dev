import { z } from 'zod';
export const baseSchema = z.object({
  department: z.string(),
});

export type DepartmentSchema = z.infer<typeof baseSchema>;
