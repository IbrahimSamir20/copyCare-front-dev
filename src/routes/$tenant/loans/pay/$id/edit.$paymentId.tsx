import { createFileRoute } from '@tanstack/react-router';
import LoanPaymentForm from '../../-components/components/LoanPaymentForm';

export const Route = createFileRoute('/$tenant/loans/pay/$id/edit/$paymentId')({
  component: () => <LoanPaymentForm />,
});
