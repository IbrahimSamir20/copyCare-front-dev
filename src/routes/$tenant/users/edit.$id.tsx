// users/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import UserForm from './-components/components/UserForm';
import { userQueryOptions } from './-components/queries/user.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/users/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.users)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: EditUser,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(userQueryOptions(opt.params.id));
  },
});

function EditUser() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(userQueryOptions(id));
  return (
    <MainWrapper title={'Add User'}>
      <UserForm id={id} data={data.data} />
    </MainWrapper>
  );
}
