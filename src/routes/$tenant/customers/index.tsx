import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { customersQueryOptions } from './-components/queries/customer.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useCustomerColumn from './-components/hooks/useCustomerColumn';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import { searchSchema } from './-components/schema/customerSearch.schema';

export const Route = createFileRoute('/$tenant/customers/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.customers)) {
      throw redirect({ to: `/${opt.params.tenant}` });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(customersQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),
  component: Customers,
});

function Customers() {
  const { data } = useSuspenseQuery(customersQueryOptions);
  const { columns } = useCustomerColumn();
  return (
    <MainWrapper title="Customers" buttons={<TableHeaderButtons path={`/$tenant/customers/add`} />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
