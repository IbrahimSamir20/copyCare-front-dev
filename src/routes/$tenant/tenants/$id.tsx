import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$tenant/tenants/$id')({
  component: () => <div>Hello /tenants/$id!</div>,
});
