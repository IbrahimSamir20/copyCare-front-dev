// tenants/route.lazy.tsx

import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$tenant/tenants')({
  component: () => <Outlet />,
});
