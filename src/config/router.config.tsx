// Import the generated route tree
import { createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { queryClient, store } from '.';
import Loader from '@/components/Loader';

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: { store: store.getState(), queryClient },
  defaultPendingComponent: () => <Loader />,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
