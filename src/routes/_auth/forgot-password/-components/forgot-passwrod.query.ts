import axiosInstance from '@/config/axios.config';
import { ForgotPasswordFormInputs } from '../schema';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { router } from '@/config';

export const forgotPassword = async (data: ForgotPasswordFormInputs) => {
  const response = await axiosInstance.post('/auth/forgot-password', data);
  return response.data;
};

export const useForgotPasswordQuery = () =>
  useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Password reset link sent');
      router.navigate({ to: '/login' });
    },
    onError: (error: any) => {
      toast.error(`Failed to send reset link: ${error.response?.data?.message || error.message}`);
    },
  });
