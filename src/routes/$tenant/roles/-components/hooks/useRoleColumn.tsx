// roles/-components/hooks/useRoleColumn.tsx

import TableActions from '@/components/Table/TableActions';
import { useDeleteRoleMutation, useSoftDeleteRoleMutation, useRestoreRoleMutation } from '../queries/role.query';

const useRoleColumn = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (ele: Record<string, any>) => {
        return (
          <TableActions
            deleteMutation={useDeleteRoleMutation}
            softDeleteMutation={useSoftDeleteRoleMutation}
            restoreMutation={useRestoreRoleMutation}
            actions={['edit', 'delete', 'soft']}
            mainPath="roles"
            id={ele.id}
            active={!ele.deletedAt}
          />
        );
      },
    },
  ];

  return { columns };
};

export default useRoleColumn;
