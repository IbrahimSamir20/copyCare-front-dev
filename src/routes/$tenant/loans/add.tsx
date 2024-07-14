import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import LoanForm from './-components/components/LoanForm';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/loans/add')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.create, routesEnum.loans)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: AddLoan,
});

function AddLoan() {
  return (
    <MainWrapper title={'Add Loan'}>
      <LoanForm />
    </MainWrapper>
  );
}
