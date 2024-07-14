import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import employeeService from './employee.api';
import { queryClient } from '@/config';
import { Employee } from '../interface/employee.interface';

export const employeesQueryOptions = queryOptions({
  queryKey: [routesEnum.employees],
  queryFn: () => employeeService.getAll(),
});

export const employeeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.employees, id],
    queryFn: () => employeeService.getOne(id),
  });

export const useCreateEmployeeMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.employees, 'create'],
    mutationFn: (data: any) => employeeService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.employees] }),
    meta: {
      message: 'Create Employee',
    },
  });
};

export const useUpdateEmployeeMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.employees, 'update'],
    mutationFn: (data: Partial<Employee>) => employeeService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Employee',
    },
  });
};

export const useDeleteEmployeeMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.employees, 'delete', id],
    mutationFn: () => employeeService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Employee',
    },
  });
};

export const useSoftDeleteEmployeeMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.employees, 'soft', id],
    mutationFn: () => employeeService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Employee',
    },
  });
};

export const useRestoreEmployeeMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.employees, 'restore', id],
    mutationFn: () => employeeService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Employee',
    },
  });
};
