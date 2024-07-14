import { personSchema } from '@/routes/$tenant/users/-components/schema/person.schema';

import { z } from 'zod';
export const baseSchema = z.object({
  jobTitleId: z.number(),
  departmentId: z.number(),
  salary: z.number().min(1),
  hireDate: z.date().optional(),
  notes: z.string().optional(),
  person: personSchema,
});

export type EmployeeSchema = z.infer<typeof baseSchema>;
