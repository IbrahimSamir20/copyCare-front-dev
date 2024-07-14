import { z } from 'zod';

export const baseSchema = z.object({
  loanId: z.number({
    required_error: 'Loan ID is required',
    invalid_type_error: 'Loan ID must be a number',
  }),
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive('Amount must be a positive number'), // Assuming the payment amount should be positive
  paymentDate: z.date({
    required_error: 'Payment Date is required',
    invalid_type_error: 'Payment Date must be a valid date',
  }),
});

export type LoanPaymentSchema = z.infer<typeof baseSchema>;
