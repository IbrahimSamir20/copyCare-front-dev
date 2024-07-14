// products/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import ProductForm from './-components/components/ProductForm';
import { productQueryOptions } from './-components/queries/product.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/products/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.products)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: EditProduct,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(productQueryOptions(opt.params.id));
  },
});

function EditProduct() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(productQueryOptions(id));
  return (
    <MainWrapper title={'Add Product'}>
      <ProductForm id={id} data={data.data} />
    </MainWrapper>
  );
}
