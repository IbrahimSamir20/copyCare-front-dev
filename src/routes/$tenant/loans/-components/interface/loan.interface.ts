import { Employee } from '@/routes/$tenant/employees/-components/interface/employee.interface';
import { ILoanPayment } from './loan-payment.interface';

export interface Loan {
  id: string;
  amount: number;
  employee: Employee;
  issueDate: string | Date;
  monthlyPayment: number;
  status: number;
  tenantId: number;
  remaining: number;
  payments: ILoanPayment[];
}
