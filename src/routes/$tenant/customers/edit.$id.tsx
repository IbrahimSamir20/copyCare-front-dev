// customers/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import CustomerForm from './-components/components/CustomerForm';
import { customerQueryOptions } from './-components/queries/customer.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/customers/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.customers)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: EditCustomer,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(customerQueryOptions(opt.params.id));
  },
});

function EditCustomer() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(customerQueryOptions(id));
  return (
    <MainWrapper title={'Add Customer'}>
      <CustomerForm id={id} data={data.data} />
    </MainWrapper>
  );
}
