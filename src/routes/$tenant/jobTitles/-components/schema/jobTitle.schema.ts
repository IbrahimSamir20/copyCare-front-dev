import { z } from 'zod';
export const baseSchema = z.object({
  jobTitle: z.string(),
});

export type JobTitleSchema = z.infer<typeof baseSchema>;
