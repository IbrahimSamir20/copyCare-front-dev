// tenants/add.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import TenantForm from './-components/components/TenantForm';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/tenants/add')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.create, routesEnum.tenants)) {
      throw redirect({ to: `/${opt.params.tenant}` });
    }
  },
  component: AddTenant,
});

function AddTenant() {
  return (
    <MainWrapper title={'Add Tenant'}>
      <TenantForm />
    </MainWrapper>
  );
}
