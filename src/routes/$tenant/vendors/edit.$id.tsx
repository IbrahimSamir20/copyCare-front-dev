// vendors/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import VendorForm from './-components/components/VendorForm';
import { vendorQueryOptions } from './-components/queries/vendor.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/vendors/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.vendors)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: EditVendor,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(vendorQueryOptions(opt.params.id));
  },
});

function EditVendor() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(vendorQueryOptions(id));
  return (
    <MainWrapper title={'Add Vendor'}>
      <VendorForm id={id} data={data.data} />
    </MainWrapper>
  );
}
