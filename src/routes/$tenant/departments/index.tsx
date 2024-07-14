import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { departmentsQueryOptions } from './-components/queries/department.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useDepartmentColumn from './-components/hooks/useDepartmentColumn';
import { searchSchema } from './-components/schema/departmentSearch.schema';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/departments/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.departments)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(departmentsQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),

  component: Departments,
});

function Departments() {
  const { data } = useSuspenseQuery(departmentsQueryOptions);
  const { columns } = useDepartmentColumn();
  return (
    <MainWrapper title="Departments" buttons={<TableHeaderButtons path="/$tenant/departments/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
