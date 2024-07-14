import TableActions from '@/components/Table/TableActions';
import {
  useDeleteDepartmentMutation,
  useSoftDeleteDepartmentMutation,
  useRestoreDepartmentMutation,
} from '../queries/department.query';

const useDepartmentColumn = () => {
  const columns = [
    {
      title: 'department',
      dataIndex: 'department',
      key: 'department',
    },

    {
      title: 'Action',
      key: 'action',
      render: (ele: Record<string, any>) => {
        return (
          <TableActions
            deleteMutation={useDeleteDepartmentMutation}
            softDeleteMutation={useSoftDeleteDepartmentMutation}
            restoreMutation={useRestoreDepartmentMutation}
            actions={['edit', 'delete', 'soft']}
            mainPath="departments"
            id={ele.id}
            active={!ele.deletedAt}
          />
        );
      },
    },
  ];

  return { columns };
};

export default useDepartmentColumn;
