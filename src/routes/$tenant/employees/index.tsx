import { createFileRoute } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { employeesQueryOptions } from './-components/queries/employee.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useEmployeeColumn from './-components/hooks/useEmployeeColumn';
import { searchSchema } from './-components/schema/employeeSearch.schema';

export const Route = createFileRoute('/$tenant/employees/')({
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(employeesQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),

  component: Employees,
});

function Employees() {
  const { data } = useSuspenseQuery(employeesQueryOptions);
  const { columns } = useEmployeeColumn();
  return (
    <MainWrapper title="Employees" buttons={<TableHeaderButtons path="/$tenant/employees/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
