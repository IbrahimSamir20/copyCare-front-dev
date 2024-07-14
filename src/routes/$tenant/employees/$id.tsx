import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper.tsx';
import EmployeeForm from './-components/components/EmployeeForm.tsx';
import { employeeQueryOptions } from './-components/queries/employee.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/employees/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.employees)) {
      throw redirect({ to: `/${opt.params.tenant}` });
    }
  },
  component: EditEmployee,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(employeeQueryOptions(opt.params.id));
  },
});

function EditEmployee() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(employeeQueryOptions(id));
  return (
    <MainWrapper title={'Add Employee'}>
      <EmployeeForm id={id} data={data.data} />
    </MainWrapper>
  );
}
