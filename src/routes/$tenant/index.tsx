import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$tenant/')({
  component: Dashboard,
});

function Dashboard() {
  return <h1>Dashboard</h1>;
}
