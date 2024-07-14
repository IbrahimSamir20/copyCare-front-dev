import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import CustomerForm from './-components/components/CustomerForm';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/customers/add')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.create, routesEnum.customers)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: AddCustomer,
});

function AddCustomer() {
  return (
    <MainWrapper title={'Add Customer'}>
      <CustomerForm />
    </MainWrapper>
  );
}
