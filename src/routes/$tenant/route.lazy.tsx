import createAbilityForUser from '@/common/abilities';
import { setAbilities } from '@/common/state/abilities.state';
import { setUser } from '@/common/state/user.state';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import axiosInstance from '@/config/axios.config';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute, Outlet, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const Route = createLazyFileRoute('/$tenant')({
  component: App,
});

function App() {
  const { tenant } = useParams({ strict: false });
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = Route.useNavigate();
  const dispatch = useDispatch();
  useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axiosInstance.get('/profile');
      if (res.data.tenantId !== +tenant! && !res.data.isMaster) navigate({ to: `/${res.data.tenantId}` });
      if (!res.data.isApproved) navigate({ to: `/${tenant}/approval` });
      dispatch(setUser(res.data));
      const abilities = await createAbilityForUser(res.data);
      dispatch(setAbilities(abilities));
      return res;
    },
  });
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#f8f7fa]">
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="flex h-screen w-full flex-grow flex-col overflow-auto">
        <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="flex flex-grow p-6 2.5xl:mx-[5vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
