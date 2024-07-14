import { createLazyFileRoute } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import EmployeeForm from './-components/components/EmployeeForm';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import useGuard from '@/hooks/useGuard';

export const Route = createLazyFileRoute('/$tenant/employees/add')({
  component: AddEmployee,
});

function AddEmployee() {
  useGuard({ action: actionEnum.create, route: routesEnum.employees });
  return (
    <MainWrapper title={'Add Employee'}>
      <EmployeeForm />
    </MainWrapper>
  );
}
