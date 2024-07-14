import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$tenant/roles/$id')({
  component: () => <div>Hello /app/roles/$id!</div>
})