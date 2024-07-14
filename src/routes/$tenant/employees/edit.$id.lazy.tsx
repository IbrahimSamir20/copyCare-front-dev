// employees/edit.$id.tsx

import { createLazyFileRoute } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import EmployeeForm from './-components/components/EmployeeForm';
import { employeeQueryOptions } from './-components/queries/employee.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import useGuard from '@/hooks/useGuard';

export const Route = createLazyFileRoute('/$tenant/employees/edit/$id')({
  component: EditEmployee,
});

function EditEmployee() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(employeeQueryOptions(id));
  useGuard({ action: actionEnum.update, route: routesEnum.employees });
  return (
    <MainWrapper title={'Add Employee'}>
      <EmployeeForm id={id} data={data.data} />
    </MainWrapper>
  );
}
