import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import departmentService from './department.api';
import { queryClient } from '@/config';
import { Department } from '../interface/department.interface';

export const departmentsQueryOptions = queryOptions({
  queryKey: [routesEnum.departments],
  queryFn: () => departmentService.getAll(),
});

export const departmentQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.departments, id],
    queryFn: () => departmentService.getOne(id),
  });

export const useCreateDepartmentMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.departments, 'create'],
    mutationFn: (data: any) => departmentService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.departments] }),
    meta: {
      message: 'Create Department',
    },
  });
};

export const useUpdateDepartmentMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.departments, 'update'],
    mutationFn: (data: Partial<Department>) => departmentService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Department',
    },
  });
};

export const useDeleteDepartmentMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.departments, 'delete', id],
    mutationFn: () => departmentService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Department',
    },
  });
};

export const useSoftDeleteDepartmentMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.departments, 'soft', id],
    mutationFn: () => departmentService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Department',
    },
  });
};

export const useRestoreDepartmentMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.departments, 'restore', id],
    mutationFn: () => departmentService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Department',
    },
  });
};
