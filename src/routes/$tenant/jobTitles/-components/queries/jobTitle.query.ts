import { routesEnum } from '@/common/const/routesEnum';
import { queryOptions, useMutation } from '@tanstack/react-query';
import jobTitleService from './jobTitle.api';
import { queryClient } from '@/config';
import { JobTitle } from '../interface/jobTitle.interface';

export const jobTitlesQueryOptions = queryOptions({
  queryKey: [routesEnum.jobTitles],
  queryFn: () => jobTitleService.getAll(),
});

export const jobTitleQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [routesEnum.jobTitles, id],
    queryFn: () => jobTitleService.getOne(id),
  });

export const useCreateJobTitleMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.jobTitles, 'create'],
    mutationFn: (data: any) => jobTitleService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [routesEnum.jobTitles] }),
    meta: {
      message: 'Create JobTitle',
    },
  });
};

export const useUpdateJobTitleMutation = () => {
  return useMutation({
    mutationKey: [routesEnum.jobTitles, 'update'],
    mutationFn: (data: Partial<JobTitle>) => jobTitleService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    meta: {
      message: 'Update JobTitle',
    },
  });
};

export const useDeleteJobTitleMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.jobTitles, 'delete', id],
    mutationFn: () => jobTitleService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Delete JobTitle',
    },
  });
};

export const useSoftDeleteJobTitleMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.jobTitles, 'soft', id],
    mutationFn: () => jobTitleService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Soft Delete JobTitle',
    },
  });
};

export const useRestoreJobTitleMutation = (id: string) => {
  return useMutation({
    mutationKey: [routesEnum.jobTitles, 'restore', id],
    mutationFn: () => jobTitleService.restore(id),
    onSuccess: () => queryClient.invalidateQueries(),
    meta: {
      message: 'Restore Delete JobTitle',
    },
  });
};
