import axiosInstance from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { router } from '@/config';
import { LoginFormInputs } from './login.schema';

export const login = async (data: LoginFormInputs) => {
  const response = await axiosInstance.post('/auth/login', data);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('tenant', JSON.stringify(response.data.user.tenant));
  // console.log(response.data);
  return response.data;
};

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (res) => {
      toast.success('Login successful');
      console.log(res.user);
      if (res.user.isMaster) {
        router.navigate({ to: '/company-select' });
      } else {
        if (res.user.isApproved)
          router.navigate({
            to: '/$tenant',
            params: { tenant: res.user.tenant.id + '' },
          });
        else router.navigate({ to: '/approval' });
      }
      // router.navigate({ to: '/company-select' });
    },
    onError: (error: any) => {
      toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
    },
  });
