import axiosInstance from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ResetPasswordFormInputs } from './reset-password.schema';
import { router } from '@/config';

export const resetPassword = async (data: ResetPasswordFormInputs, token: string) => {
  const response = await axiosInstance.post(`/auth/reset-password?token=${token}`, data);
  return response.data;
};

export const useResetPasswordMutation = (token: string) =>
  useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (data: ResetPasswordFormInputs) => resetPassword(data, token),
    onSuccess: () => {
      toast.success('Password reset successful');
      router.navigate({ to: '/login' });
    },
    onError: (error: any) => {
      toast.error(`Password reset failed: ${error.response?.data?.message || error.message}`);
    },
  });
