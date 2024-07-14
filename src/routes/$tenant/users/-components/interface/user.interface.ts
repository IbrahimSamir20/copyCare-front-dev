import { Role } from '@/routes/$tenant/roles/-components/interface/role.interface';

export interface Person {
  firstname: string;
  lastname: string;
  tenantId: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  roleId: number;
  googleId: string | null;
  role: Role;
  isApproved: boolean;
  person: Person;
  tenantId: number;
  isMaster: boolean;
}
