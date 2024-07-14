// tenants/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import TenantForm from './-components/components/TenantForm';
import { tenantQueryOptions } from './-components/queries/tenant.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/tenants/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.tenants)) {
      throw redirect({ to: `/${opt.params.tenant}` });
    }
  },
  component: EditTenant,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(tenantQueryOptions(opt.params.id));
  },
});

function EditTenant() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(tenantQueryOptions(id));
  return (
    <MainWrapper title={'Add Tenant'}>
      <TenantForm id={id} data={data.data} />
    </MainWrapper>
  );
}
