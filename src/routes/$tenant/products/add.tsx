import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import ProductForm from './-components/components/ProductForm';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/products/add')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.create, routesEnum.products)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: AddProduct,
});

function AddProduct() {
  return (
    <MainWrapper title={'Add Product'}>
      <ProductForm />
    </MainWrapper>
  );
}
