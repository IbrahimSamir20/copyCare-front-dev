// roles/-components/queries/role.query.ts

import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import roleService from './role.api';
import { queryClient } from '@/config';
import { Role } from '../interface/role.interface';

export const rolesQueryOptions = queryOptions({
  queryKey: [routesEnum.roles],
  queryFn: () => roleService.getAll(),
});

export const roleQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.roles, id],
    queryFn: () => roleService.getOne(id),
  });

export const useCreateRoleMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.roles, 'create'],
    mutationFn: (data: any) => roleService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.roles] }),
    meta: {
      message: 'Create Role',
    },
  });
};

export const useUpdateRoleMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.roles, 'update'],
    mutationFn: (data: Partial<Role>) => roleService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Role',
    },
  });
};

export const useDeleteRoleMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.roles, 'delete', id],
    mutationFn: () => roleService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Role',
    },
  });
};

export const useSoftDeleteRoleMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.roles, 'soft', id],
    mutationFn: () => roleService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Role',
    },
  });
};

export const useRestoreRoleMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.roles, 'restore', id],
    mutationFn: () => roleService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Role',
    },
  });
};
