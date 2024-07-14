import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import MainWrapper from '../../../-components/MainWrapper';
import { Button, Popconfirm } from 'antd';
import { ILoanPayment } from '../../-components/interface/loan-payment.interface';
import { loanQueryOptions } from '../../-components/queries/loan.query';
import { CiEdit, CiTrash } from 'react-icons/ci';
import axiosInstance from '@/config/axios.config';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/loans/pay/$id')({
  component: LoanPay,
});

function LoanPay() {
  const { tenant, id } = Route.useParams();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(loanQueryOptions(id));
  const deleteElement = async (id: string) => {
    await axiosInstance.delete(`${routesEnum.loanPayments}/${id}`);
    queryClient.invalidateQueries({ queryKey: [routesEnum.loans] });
  };
  return (
    <MainWrapper
      title={'Payment History'}
      buttons={
        <Link to="/$tenant/loans/pay/$id/add" params={{ tenant, id }}>
          <Button>New Payment</Button>
        </Link>
      }
    >
      {data.data.payments.length === 0 && <div>There is no payment till now</div>}
      <div className="mb-2 grid grid-cols-4 gap-2">
        <div>Name: {data.data.employee.fullName}</div>
        <div>Loan: {data.data.amount}</div>
        <div>Remain: {data.data.remaining}</div>
        <div>Issue date: {data.data.issueDate as string}</div>
      </div>
      <hr />
      <div className="mt-3 border p-3">
        <div>
          <div className="mb-3 grid grid-cols-3 font-medium text-stone-600">
            <div>Amount</div>
            <div>Payment Date</div>
            <div>Actions</div>
          </div>
        </div>
        {data.data.payments.map((l: ILoanPayment) => (
          <div className="grid grid-cols-3 space-y-2">
            <div>{l.amount}</div>
            <div>{l.paymentDate}</div>
            <div className="flex gap-2">
              <Link to={`/$tenant/loans/pay/$id/edit/$paymentId`} params={{ tenant, id, paymentId: l.id + '' }}>
                <CiEdit className="cursor-pointer text-xl text-blue-700" />
              </Link>
              <Popconfirm
                title="Delete the Element"
                description="Are you sure to delete this Element?"
                onConfirm={() => deleteElement(l.id + '')}
                okText="Yes"
                cancelText="No"
              >
                <CiTrash className="cursor-pointer text-xl text-error" />
              </Popconfirm>{' '}
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </MainWrapper>
  );
}
