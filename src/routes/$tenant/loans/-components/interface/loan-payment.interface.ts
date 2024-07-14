import { Loan } from './loan.interface';

export interface ILoanPayment {
  id: number;
  tenantId: number;
  loanId: number;
  loan: Loan;
  amount: number;
  paymentDate: string;
}
