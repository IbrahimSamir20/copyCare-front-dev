import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { productsQueryOptions } from './-components/queries/product.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useProductColumn from './-components/hooks/useProductColumn';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import { searchSchema } from './-components/schema/productSearch.schema';

export const Route = createFileRoute('/$tenant/products/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.roles)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(productsQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),

  component: Products,
});

function Products() {
  const { data } = useSuspenseQuery(productsQueryOptions);
  const { columns } = useProductColumn();
  return (
    <MainWrapper title="Products" buttons={<TableHeaderButtons path="/$tenant/products/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
