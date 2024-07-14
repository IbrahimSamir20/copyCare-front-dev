import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import vendorService from './vendor.api';
import { queryClient } from '@/config';
import { Vendor } from '../interface/vendor.interface';

export const vendorsQueryOptions = queryOptions({
  queryKey: [routesEnum.vendors],
  queryFn: () => vendorService.getAll(),
});

export const vendorQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.vendors, id],
    queryFn: () => vendorService.getOne(id),
  });

export const useCreateVendorMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.vendors, 'create'],
    mutationFn: (data: any) => vendorService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.vendors] }),
    meta: {
      message: 'Create Vendor',
    },
  });
};

export const useUpdateVendorMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.vendors, 'update'],
    mutationFn: (data: Partial<Vendor>) => vendorService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Vendor',
    },
  });
};

export const useDeleteVendorMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.vendors, 'delete', id],
    mutationFn: () => vendorService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Vendor',
    },
  });
};

export const useSoftDeleteVendorMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.vendors, 'soft', id],
    mutationFn: () => vendorService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Vendor',
    },
  });
};

export const useRestoreVendorMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.vendors, 'restore', id],
    mutationFn: () => vendorService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Vendor',
    },
  });
};
