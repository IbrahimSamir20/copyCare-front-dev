// tenants/index.tsx

import { createFileRoute, redirect, useParams } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { tenantsQueryOptions } from './-components/queries/tenant.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import useTenantColumn from './-components/hooks/useTenantColumn';
import { searchSchema } from './-components/schema/tenantSearch.schema';

export const Route = createFileRoute('/$tenant/tenants/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.tenants)) {
      throw redirect({ to: `/${opt.params.tenant}` });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(tenantsQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),
  component: Tenants,
});

function Tenants() {
  const { data } = useSuspenseQuery(tenantsQueryOptions);
  const { columns } = useTenantColumn();
  const { tenant } = useParams({ strict: false });
  return (
    <MainWrapper title="Tenants" buttons={<TableHeaderButtons path={`/${tenant}/tenants/add`} />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
