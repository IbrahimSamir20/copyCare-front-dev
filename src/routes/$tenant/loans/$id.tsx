import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper.tsx';
import LoanForm from './-components/components/LoanForm.tsx';
import { loanQueryOptions } from './-components/queries/loan.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/loans/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.loans)) {
      throw redirect({ to: `/${opt.params.tenant}` });
    }
  },
  component: EditLoan,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(loanQueryOptions(opt.params.id));
  },
});

function EditLoan() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(loanQueryOptions(id));
  return (
    <MainWrapper title={'Add Loan'}>
      <LoanForm id={id} data={data.data} />
    </MainWrapper>
  );
}
