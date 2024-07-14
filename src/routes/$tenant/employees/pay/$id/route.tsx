import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { routesEnum } from '@/common/const/routesEnum';
import axiosInstance from '@/config/axios.config';
import MainWrapper from '@/routes/$tenant/-components/MainWrapper';
import { Button, Popconfirm } from 'antd';
import { Salary } from '../../-components/interface/salary.interface';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { IRes } from '@/common/BasicApi.class';

export const Route = createFileRoute('/$tenant/employees/pay/$id')({
  component: Salaries,
});

function Salaries() {
  const { tenant, id } = Route.useParams();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    queryKey: [routesEnum.salaries],
    queryFn: async (): Promise<IRes<Salary[]>> =>
      (await axiosInstance.get(`${routesEnum.salaries}/${routesEnum.employees}/${id}`)).data,
  });

  const deleteElement = async (id: string) => {
    await axiosInstance.delete(`${routesEnum.salaries}/${id}`);
    queryClient.invalidateQueries({ queryKey: [routesEnum.employees] });
  };
  return (
    <MainWrapper
      title={'Salary History'}
      buttons={
        <Link to="/$tenant/employees/pay/$id/add" params={{ tenant, id }}>
          <Button>New Payment</Button>
        </Link>
      }
    >
      {/*  */}
      <hr />
      <div className="mt-3 border p-3">
        {data.data.length === 0 ? (
          <div>There is no payment till now</div>
        ) : (
          <div>
            <div className="mb-2 grid grid-cols-4 gap-2">
              <div>Name: {data.data[0].employee.fullName}</div>
              <div>Salary: {data.data[0].employee.salary}</div>
              <div>Last Salary: {data.data[data.data.length - 1]?.paymentDate.toString()}</div>
            </div>
            <div className="mb-3 grid grid-cols-3 font-medium text-stone-600">
              <div>Amount</div>
              <div>Payment Date</div>
              <div>Actions</div>
            </div>
          </div>
        )}

        {data.data.map((l: Salary) => (
          <div className="grid grid-cols-3 space-y-2">
            <div>{l.amount}</div>
            <div>{l.paymentDate.toString()}</div>
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
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </MainWrapper>
  );
}
