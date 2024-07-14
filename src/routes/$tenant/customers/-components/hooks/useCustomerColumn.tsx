import TableActions from '@/components/Table/TableActions';
import {
  useDeleteCustomerMutation,
  useSoftDeleteCustomerMutation,
  useRestoreCustomerMutation,
} from '../queries/customer.query';

const useCustomerColumn = () => {
  const columns = [
    {
      title: 'jobTitle',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (ele: Record<string, any>) => ele.jobTitle,
    },
    {
      title: 'department',
      dataIndex: 'department',
      key: 'department',
      render: (ele: Record<string, any>) => ele.department,
    },
    {
      title: 'salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Action',
      key: 'action',
      render: (ele: Record<string, any>) => {
        return (
          <TableActions
            deleteMutation={useDeleteCustomerMutation}
            softDeleteMutation={useSoftDeleteCustomerMutation}
            restoreMutation={useRestoreCustomerMutation}
            actions={['edit', 'delete', 'soft']}
            mainPath="employees"
            id={ele.id}
            active={!ele.deletedAt}
          />
        );
      },
    },
  ];

  return { columns };
};

export default useCustomerColumn;
