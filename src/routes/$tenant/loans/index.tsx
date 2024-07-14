import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { loansQueryOptions } from './-components/queries/loan.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useLoanColumn from './-components/hooks/useLoanColumn';
import { searchSchema } from './-components/schema/loanSearch.schema';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/loans/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.loans)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  loader: async (opt) => {
    console.log(loansQueryOptions);
    return opt.context.queryClient.ensureQueryData(loansQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),

  component: Loans,
});

function Loans() {
  console.log(loansQueryOptions);
  const { data } = useSuspenseQuery(loansQueryOptions);
  const { columns } = useLoanColumn();
  return (
    <MainWrapper title="Loans" buttons={<TableHeaderButtons path="/$tenant/loans/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
