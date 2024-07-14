import { createLazyFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$tenant/hamada')({
  component: () => (
    <div>
      <Link to="/about">About</Link>
    </div>
  ),
});
