import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import productService from './product.api';
import { queryClient } from '@/config';
import { Product } from '../interface/product.interface';

export const productsQueryOptions = queryOptions({
  queryKey: [routesEnum.products],
  queryFn: () => productService.getAll(),
});

export const productQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.products, id],
    queryFn: () => productService.getOne(id),
  });

export const useCreateProductMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.products, 'create'],
    mutationFn: (data: any) => productService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.products] }),
    meta: {
      message: 'Create Product',
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.products, 'update'],
    mutationFn: (data: Partial<Product>) => productService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Product',
    },
  });
};

export const useDeleteProductMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.products, 'delete', id],
    mutationFn: () => productService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Product',
    },
  });
};

export const useSoftDeleteProductMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.products, 'soft', id],
    mutationFn: () => productService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Product',
    },
  });
};

export const useRestoreProductMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.products, 'restore', id],
    mutationFn: () => productService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Product',
    },
  });
};
