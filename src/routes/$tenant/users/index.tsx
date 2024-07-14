import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { usersQueryOptions } from './-components/queries/user.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useUserColumn from './-components/hooks/useUserColumn';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import { searchSchema } from './-components/schema/userSearch.schema';

export const Route = createFileRoute('/$tenant/users/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.users)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(usersQueryOptions());
  },
  validateSearch: (search) => searchSchema.parse(search),
  component: Users,
});

function Users() {
  const { data } = useSuspenseQuery(usersQueryOptions());
  const { columns } = useUserColumn();
  return (
    <MainWrapper title="Users" buttons={<TableHeaderButtons path="/$tenant/users/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
