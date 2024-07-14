import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import loanService from './loan.api';
import { queryClient } from '@/config';
import { Loan } from '../interface/loan.interface';

export const loansQueryOptions = queryOptions({
  queryKey: [routesEnum.loans],
  queryFn: () => loanService.getAll(),
});

export const loanQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.loans, id],
    queryFn: () => loanService.getOne(id),
  });

export const useCreateLoanMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.loans, 'create'],
    mutationFn: (data: any) => loanService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.loans] }),
    meta: {
      message: 'Create Loan',
    },
  });
};

export const useUpdateLoanMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.loans, 'update'],
    mutationFn: (data: Partial<Loan>) => loanService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update Loan',
    },
  });
};

export const useDeleteLoanMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.loans, 'delete', id],
    mutationFn: () => loanService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete Loan',
    },
  });
};

export const useSoftDeleteLoanMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.loans, 'soft', id],
    mutationFn: () => loanService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete Loan',
    },
  });
};

export const useRestoreLoanMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.loans, 'restore', id],
    mutationFn: () => loanService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete Loan',
    },
  });
};
