// roles/route.lazy.tsx

import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$tenant/roles')({
  component: () => <Outlet />,
});
