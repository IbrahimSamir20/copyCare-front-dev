import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/approval')({
  component: Approval,
});

function Approval() {
  return (
    <div className="flex h-screen w-screen flex-grow items-center justify-center rounded-lg bg-white p-6 shadow-lg">
      <div className="text-2xl">Waiting Your Admin Approval please contact them</div>
    </div>
  );
}
