import { Employee } from './employee.interface';

export interface Salary {
  id: string;
  employeeId: number;
  employee: Employee;
  amount: number;
  paymentDate: Date;
}
