// tenants/-components/queries/tenant.query.ts

import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import tenantService from './tenant.api';
import { queryClient } from '@/config';
import { Tenant } from '../interface/tenant.interface';

export const tenantsQueryOptions = queryOptions({
  queryKey: [routesEnum.tenants],
  queryFn: () => tenantService.getAll(),
});

export const tenantQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.tenants, id],
    queryFn: () => tenantService.getOne(id),
  });

export const useCreateTenantMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.tenants, 'create'],
    mutationFn: (data: any) => tenantService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.tenants] }),
    meta: {
      message: 'Create Tenant',
    },
  });
};

export const useUpdateTenantMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.tenants, 'update'],
    mutationFn: (data: Partial<Tenant>) => tenantService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Tenant',
    },
  });
};

export const useDeleteTenantMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.tenants, 'delete', id],
    mutationFn: () => tenantService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Tenant',
    },
  });
};

export const useSoftDeleteTenantMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.tenants, 'soft', id],
    mutationFn: () => tenantService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Tenant',
    },
  });
};

export const useRestoreTenantMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.tenants, 'restore', id],
    mutationFn: () => tenantService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Tenant',
    },
  });
};
