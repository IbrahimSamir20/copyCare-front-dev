import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$tenant/products')({
  component: () => <Outlet />,
});
