import { z } from 'zod';

export const baseSchema = z
  .object({
    employeeId: z.number(),
    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a valid number',
      })
      .min(0.01, 'Amount must be at least 0.01'), // Assuming currency should be positive
    issueDate: z.date().default(new Date()),
    monthlyPayment: z
      .number({
        required_error: 'Monthly Payment is required',
        invalid_type_error: 'Monthly Payment must be a valid number',
      })
      .min(0.01, 'Monthly Payment must be at least 0.01'), // Assuming monthly payment should be positive
  })
  .refine((data) => data.amount >= data.monthlyPayment, {
    message: "the monthly payment can't be more than the total amount",
    path: ['monthlyPayment'],
  });

export type LoanSchema = z.infer<typeof baseSchema>;
