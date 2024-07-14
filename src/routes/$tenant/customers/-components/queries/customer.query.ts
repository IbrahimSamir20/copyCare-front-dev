import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import customerService from './customer.api';
import { queryClient } from '@/config';
import { Customer } from '../interface/customer.interface';

export const customersQueryOptions = queryOptions({
  queryKey: [routesEnum.customers],
  queryFn: () => customerService.getAll(),
});

export const customerQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.customers, id],
    queryFn: () => customerService.getOne(id),
  });

export const useCreateCustomerMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.customers, 'create'],
    mutationFn: (data: any) => customerService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.customers] }),
    meta: {
      message: 'Create Customer',
    },
  });
};

export const useUpdateCustomerMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.customers, 'update'],
    mutationFn: (data: Partial<Customer>) => customerService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Customer',
    },
  });
};

export const useDeleteCustomerMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.customers, 'delete', id],
    mutationFn: () => customerService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Customer',
    },
  });
};

export const useSoftDeleteCustomerMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.customers, 'soft', id],
    mutationFn: () => customerService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Customer',
    },
  });
};

export const useRestoreCustomerMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.customers, 'restore', id],
    mutationFn: () => customerService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Customer',
    },
  });
};
