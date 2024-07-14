// roles/index.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { rolesQueryOptions } from './-components/queries/role.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import useRoleColumn from './-components/hooks/useRoleColumn';
import { searchSchema } from './-components/schema/roleSearch.schema';

export const Route = createFileRoute('/$tenant/roles/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.roles)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(rolesQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),
  component: Roles,
});

function Roles() {
  const { data } = useSuspenseQuery(rolesQueryOptions);
  const { columns } = useRoleColumn();
  return (
    <MainWrapper title="Roles" buttons={<TableHeaderButtons path="/$tenant/roles/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
