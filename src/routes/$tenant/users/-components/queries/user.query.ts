import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import userService from './user.api';
import { queryClient } from '@/config';
import { User } from '../interface/user.interface';

export const usersQueryOptions = (query?: string) =>
  queryOptions({
    queryKey: [routesEnum.users],
    queryFn: () => userService.getAll(query),
  });

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.users, id],
    queryFn: () => userService.getOne(id),
  });

export const useCreateUserMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.users, 'create'],
    mutationFn: (data: any) => userService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.users] }),
    meta: {
      message: 'Create User',
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.users, 'update'],
    mutationFn: (data: Partial<User>) => userService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update User',
    },
  });
};

export const useDeleteUserMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.users, 'delete', id],
    mutationFn: () => userService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete User',
    },
  });
};

export const useSoftDeleteUserMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.users, 'soft', id],
    mutationFn: () => userService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete User',
    },
  });
};

export const useRestoreUserMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.users, 'restore', id],
    mutationFn: () => userService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete User',
    },
  });
};

export const useApproveUserMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.users, 'approve', id],
    mutationFn: () => userService.approve(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Approve User',
    },
  });
};
