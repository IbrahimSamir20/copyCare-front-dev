import { Role } from '@/routes/$tenant/roles/-components/interface/role.interface';
import { Person } from '@/routes/$tenant/users/-components/interface/user.interface';
import { Salary } from './salary.interface';

export interface Employee {
  id: string;
  username: string;
  email: string;
  roleId: number;
  googleId: string | null;
  role: Role;
  fullName: string;
  salary: number;
  salaries: Salary[];
  person: Person;
}
