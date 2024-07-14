import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import UserForm from './-components/components/UserForm';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/users/add')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.create, routesEnum.users)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: AddUser,
});

function AddUser() {
  return (
    <MainWrapper title={'Add User'}>
      <UserForm />
    </MainWrapper>
  );
}
