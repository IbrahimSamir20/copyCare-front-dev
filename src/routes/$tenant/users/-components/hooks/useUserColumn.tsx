import TableActions from '@/components/Table/TableActions';
import {
  useDeleteUserMutation,
  useSoftDeleteUserMutation,
  useRestoreUserMutation,
  useApproveUserMutation,
} from '../queries/user.query';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

const useUserColumn = () => {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (ele: Record<string, any>) => ele.name,
    },
    {
      title: 'Is Approved',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render: (ele: boolean) => (
        <div className="items-center">
          {ele ? <BsCheckCircle className="text-green-500" /> : <BsXCircle className="text-red-500" />}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (ele: Record<string, any>) => {
        return (
          <TableActions
            deleteMutation={useDeleteUserMutation}
            softDeleteMutation={useSoftDeleteUserMutation}
            restoreMutation={useRestoreUserMutation}
            approveMutation={useApproveUserMutation}
            actions={['edit', 'delete', 'soft']}
            mainPath="users"
            id={ele.id}
            active={!ele.deletedAt}
            approved={ele.isApproved}
          />
        );
      },
    },
  ];

  return { columns };
};

export default useUserColumn;
