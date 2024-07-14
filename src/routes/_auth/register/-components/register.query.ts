import { router } from '@/config';
import axiosInstance from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { RegisterFormInputs } from './register.schema';

export const register = async (data: RegisterFormInputs) => {
  const response = await axiosInstance.post('/auth/register', data);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const useRegisterMutation = () =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onSuccess: () => {
      toast.success('Registration successful');
      router.navigate({ to: '/company-select' });
    },
    onError: (error: any) => {
      toast.error(`Registration failed: ${error.response?.data?.message || error.message}`);
    },
  });
