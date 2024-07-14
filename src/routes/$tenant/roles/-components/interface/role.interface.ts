// roles/-components/interface/role.interface.ts

import { AppActions, AppSubjects } from '@/common/const/permession.type';

// Permission interface
export interface Permission {
  id: string;
  action: AppActions;
  subject: AppSubjects;
  tenantId: number;
}

// Role interface
export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  tenantId: number;
}
