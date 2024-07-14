// roles/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import RoleForm from './-components/components/RoleForm';
import { roleQueryOptions } from './-components/queries/role.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/roles/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.roles)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: EditRole,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(roleQueryOptions(opt.params.id));
  },
});

function EditRole() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(roleQueryOptions(id));
  return (
    <MainWrapper title={'Add Role'}>
      <RoleForm id={id} data={data.data} />
    </MainWrapper>
  );
}
