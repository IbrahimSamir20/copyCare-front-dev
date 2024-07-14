import createAbilityForUser from '@/common/abilities';
import { setAbilities } from '@/common/state/abilities.state';
import { selectUser, setUser } from '@/common/state/user.state';
import axiosInstance from '@/config/axios.config';
import { User } from '@/routes/$tenant/users/-components/interface/user.interface';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Route = createLazyFileRoute('/_auth/company-select')({
  component: CompanySelect,
});

function CompanySelect() {
  const [selectedCompany, setSelectedCompany] = useState();
  const user: User = useSelector(selectUser) as User;
  const navigate = Route.useNavigate();
  const dispatch = useDispatch();
  const { data: tenants } = useSuspenseQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const res = await axiosInstance.get('tenants');
      return res;
    },
  });
  useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axiosInstance.get('/profile');
      if (!res.data.isApproved) navigate({ to: `/approval` });
      dispatch(setUser(res.data));
      const abilities = await createAbilityForUser(res.data);
      dispatch(setAbilities(abilities));
      return res;
    },
  });

  useEffect(() => {
    if (!user.isMaster) {
      navigate({
        to: '/$tenant',
        params: { tenant: user.tenantId + '' },
      });
    }
  }, [user]);

  return (
    <div>
      <div>please select your company</div>
      <Select
        className="w-full"
        placeholder="please select company"
        options={tenants.data.data}
        onChange={setSelectedCompany}
        fieldNames={{ value: 'id', label: 'name' }}
        value={selectedCompany}
      />
      <Link to={`/$tenant`} params={{ tenant: selectedCompany! }} disabled={!selectedCompany}>
        <Button className="mt-4 w-full" type="primary" disabled={!selectedCompany}>
          Select
        </Button>
      </Link>
    </div>
  );
}
