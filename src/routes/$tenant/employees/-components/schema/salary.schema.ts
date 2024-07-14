import { z } from 'zod';
export const baseSchema = z.object({
  employeeId: z.number({
    required_error: 'Employee ID is required',
    invalid_type_error: 'Employee ID must be a number',
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

export type SalarySchema = z.infer<typeof baseSchema>;
