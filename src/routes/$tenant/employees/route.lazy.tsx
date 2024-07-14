import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';
import useGuard from '@/hooks/useGuard';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$tenant/employees')({
  component: Employees,
});

function Employees() {
  useGuard({ action: actionEnum.read, route: routesEnum.employees });
  return <Outlet />;
}
