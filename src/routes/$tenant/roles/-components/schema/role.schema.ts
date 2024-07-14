// roles/-components/schema/role.schema.ts

import { z } from 'zod';
import { actionValues, subjectValues } from '@/common/const/permession.type';

export const schema = z.object({
  name: z.string().min(1).max(30),
  permissions: z
    .array(
      z.object({
        action: z.enum(actionValues),
        subject: z.enum(subjectValues),
      })
    )
    .nonempty(),
});

export type RoleSchema = z.infer<typeof schema>;

const permissionSchema = z.object({
  action: z.enum(actionValues),
  subject: z.enum(subjectValues),
});

export type PermissionSchema = z.infer<typeof permissionSchema>;
