// tenants/-components/schema/tenantSearch.schema.ts

import { z } from 'zod';

export const searchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});
