import TableActions from '@/components/Table/TableActions';
import { useDeleteLoanMutation, useSoftDeleteLoanMutation, useRestoreLoanMutation } from '../queries/loan.query';
import { Employee } from '@/routes/$tenant/employees/-components/interface/employee.interface';

const useLoanColumn = () => {
  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (employee: Employee) => `${employee.person.firstname} ${employee.person.lastname}`,
    },

    {
      title: 'amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'monthlyPayment',
      dataIndex: 'monthlyPayment',
      key: 'monthlyPayment',
    },
    {
      title: 'remaining',
      dataIndex: 'remaining',
      key: 'remaining',
    },
    {
      title: 'issueDate',
      dataIndex: 'issueDate',
      key: 'issueDate',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: 'Action',
      key: 'action',
      render: (ele: Record<string, any>) => {
        return (
          <TableActions
            deleteMutation={useDeleteLoanMutation}
            softDeleteMutation={useSoftDeleteLoanMutation}
            restoreMutation={useRestoreLoanMutation}
            actions={['edit', 'delete', 'soft', 'pay']}
            mainPath="loans"
            id={ele.id}
            active={!ele.deletedAt}
          />
        );
      },
    },
  ];

  return { columns };
};

export default useLoanColumn;
