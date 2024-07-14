import { Role } from '@/routes/$tenant/roles/-components/interface/role.interface';

export interface Vendor {
  id: string;
  username: string;
  email: string;
  roleId: number;
  googleId: string | null;
  role: Role;
}
