import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { usersQueryOptions } from './-components/queries/user.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { rolesQueryOptions } from '../roles/-components/queries/role.query';
import { Button, Checkbox, Select } from 'antd';
import MainWrapper from '../-components/MainWrapper';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '@/config/axios.config';

export const Route = createFileRoute('/$tenant/users/approved')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.create, routesEnum.users)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },

  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(usersQueryOptions('isApproved=0'));
  },
  component: ApprovingList,
});

function ApprovingList() {
  const [approvedUser, setApprovedUser] = useState<Array<Record<string, any>>>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const { tenant } = Route.useParams();
  const { data } = useSuspenseQuery(usersQueryOptions('isApproved=0'));
  const { data: roles } = useSuspenseQuery(rolesQueryOptions);
  const approveCall = async () => {
    const users = approvedUser.filter((u) => checked.includes(u.userId));
    if (users.length === 0) toast.error('please check the users');
    await axiosInstance.patch('users/approve', { users });
  };
  return (
    <MainWrapper
      title={'Users Approval'}
      buttons={
        <div className="flex gap-4">
          <Link to="/$tenant/users" params={{ tenant }} search={{ limit: 10, page: 1 }}>
            <Button type="text">Back To User</Button>
          </Link>
          <Button disabled={approvedUser.length === 0} type="primary" onClick={approveCall}>
            Approve
          </Button>
        </div>
      }
    >
      <div className="space-y-2">
        {data.data.length === 0 && <div className="text-center">No Users To Approve</div>}
        {data.data.map((user) => {
          const currentRoles = roles.data.filter((role) => role.tenantId === user.tenantId);
          return (
            <div className="flex w-full items-center justify-between rounded-lg p-4" key={user.id}>
              <Checkbox
                checked={checked.includes(user.id)}
                onChange={() => {
                  const hasRole = approvedUser.some((u) => {
                    return u.userId == user.id;
                  });
                  if (!hasRole) {
                    toast.error('please select role first');
                    return;
                  }
                  const checkIndex = checked.indexOf(user.id);
                  if (checkIndex > -1) {
                    setChecked((prev) => {
                      const arr = [...prev];
                      arr.splice(checkIndex, 1);
                      return arr;
                    });
                  } else setChecked([...checked, user.id]);
                }}
              />
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>
                <Select
                  notFoundContent={
                    <Link to="/$tenant/roles/add" params={{ tenant }}>
                      <div className="text-center">Please Add Roles For That Company</div>
                    </Link>
                  }
                  allowClear
                  onClear={() => {
                    const checkIndex = checked.indexOf(user.id);
                    setChecked((prev) => {
                      const arr = [...prev];
                      arr.splice(checkIndex, 1);
                      return arr;
                    });
                  }}
                  onChange={(e) => setApprovedUser([...approvedUser, { userId: user.id, roleId: e }])}
                  options={currentRoles}
                  placeholder="Please Assign User To role"
                  fieldNames={{ value: 'id', label: 'name' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </MainWrapper>
  );
}
