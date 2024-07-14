import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <></>,
  beforeLoad: () => console.log(1),
});
