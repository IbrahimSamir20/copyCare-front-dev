import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper.tsx';
import DepartmentForm from './-components/components/DepartmentForm.tsx';
import { departmentQueryOptions } from './-components/queries/department.query.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/departments/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.departments)) {
      throw redirect({ to: `/${opt.params.tenant}` });
    }
  },
  component: EditDepartment,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(departmentQueryOptions(opt.params.id));
  },
});

function EditDepartment() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(departmentQueryOptions(id));
  return (
    <MainWrapper title={'Add Department'}>
      <DepartmentForm id={id} data={data.data} />
    </MainWrapper>
  );
}
