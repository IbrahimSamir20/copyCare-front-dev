// tenants/-components/schema/tenant.schema.ts
import { z } from 'zod';

export const schema = z
  .object({
    name: z.string().min(1).max(30),
    subdomain: z.string().min(1).max(30),
    userRegistration: z.boolean(),
    registrationLinkExpiry: z.date().optional(),
  })
  .refine((data) => !data.userRegistration || data.registrationLinkExpiry, {
    message: 'registrationLinkExpiry is required when userRegistration is true',
    path: ['registrationLinkExpiry'], // This will indicate the field where the error is
  });

export type TenantSchema = z.infer<typeof schema>;
