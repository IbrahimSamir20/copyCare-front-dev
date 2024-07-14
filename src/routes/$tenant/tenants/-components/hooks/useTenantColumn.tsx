// tenants/-components/hooks/useTenantColumn.tsx

import TableActions from '@/components/Table/TableActions';
import {
  useDeleteTenantMutation,
  useSoftDeleteTenantMutation,
  useRestoreTenantMutation,
} from '../queries/tenant.query';

const useTenantColumn = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Subdomain',
      dataIndex: 'subdomain',
      key: 'subdomain',
    },
    {
      title: 'Action',
      key: 'action',
      render: (ele: Record<string, any>) => {
        return (
          <TableActions
            deleteMutation={useDeleteTenantMutation}
            softDeleteMutation={useSoftDeleteTenantMutation}
            restoreMutation={useRestoreTenantMutation}
            actions={['edit', 'delete', 'soft']}
            mainPath="tenants"
            id={ele.id}
            active={!ele.deletedAt}
          />
        );
      },
    },
  ];

  return { columns };
};

export default useTenantColumn;
