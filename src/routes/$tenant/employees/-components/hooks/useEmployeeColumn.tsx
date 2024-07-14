import TableActions from '@/components/Table/TableActions';
import {
  useDeleteEmployeeMutation,
  useSoftDeleteEmployeeMutation,
  useRestoreEmployeeMutation,
} from '../queries/employee.query';

const useEmployeeColumn = () => {
  const columns = [
    {
      title: 'fullName',
      dataIndex: 'fullName',
      key: 'fullName',
    },
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
            deleteMutation={useDeleteEmployeeMutation}
            softDeleteMutation={useSoftDeleteEmployeeMutation}
            restoreMutation={useRestoreEmployeeMutation}
            actions={['edit', 'delete', 'soft', 'pay']}
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

export default useEmployeeColumn;
