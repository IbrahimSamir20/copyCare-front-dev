import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { vendorsQueryOptions } from './-components/queries/vendor.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useVendorColumn from './-components/hooks/useVendorColumn';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import { searchSchema } from './-components/schema/vendorSearch.schema';

export const Route = createFileRoute('/$tenant/vendors/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.roles)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(vendorsQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),
  component: Vendors,
});

function Vendors() {
  const { data } = useSuspenseQuery(vendorsQueryOptions);
  const { columns } = useVendorColumn();
  return (
    <MainWrapper title="Vendors" buttons={<TableHeaderButtons path="/$tenant/vendors/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
