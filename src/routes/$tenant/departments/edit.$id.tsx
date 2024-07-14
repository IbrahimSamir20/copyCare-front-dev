// departments/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import DepartmentForm from './-components/components/DepartmentForm';
import { departmentQueryOptions } from './-components/queries/department.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/departments/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.departments)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
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
