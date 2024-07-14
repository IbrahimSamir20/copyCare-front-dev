// tenants/-components/interface/tenant.interface.ts

import { AppActions, AppSubjects } from '@/common/const/permession.type';

// Permission interface
export interface Permission {
  id: string;
  action: AppActions;
  subject: AppSubjects;
}

// Tenant interface
export interface Tenant {
  id: string;
  name: string;
  permissions: Permission[];
}
