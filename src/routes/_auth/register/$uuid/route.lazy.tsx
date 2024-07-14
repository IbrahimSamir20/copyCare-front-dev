import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
// import GoogleLogin from '../-components/GoogleLogin';
import { useSuspenseQuery } from '@tanstack/react-query';
import axiosInstance from '@/config/axios.config';
import { RegisterFormInputs, registerSchema } from '../-components/register.schema';
import { useRegisterMutation } from '../-components/register.query';

export const Route = createLazyFileRoute('/_auth/register/$uuid')({
  component: Register,
});

function Register() {
  const { data: tenants } = useSuspenseQuery({
    queryKey: ['tenants'],
    queryFn: async () => (await axiosInstance.get('tenants')).data,
  });
  const { t } = useTranslation();
  const { mutate } = useRegisterMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="w-full rounded">
        <Form.Item
          label={t('tenant')}
          validateStatus={errors.tenantId ? 'error' : ''}
          help={errors.tenantId?.message}
          rules={[{ required: true, message: errors.tenantId?.message }]}
        >
          <Controller
            control={control}
            name="tenantId"
            render={({ field }) => (
              <Select
                options={tenants.data}
                onChange={(e) => {
                  field.onChange(e);
                  setValue('person.tenantId', e);
                }}
                allowClear
                fieldNames={{
                  label: 'name',
                  value: 'id',
                }}
              />
            )}
          ></Controller>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={t('firstname')}
            validateStatus={errors.person?.firstname ? 'error' : ''}
            help={errors.person?.firstname?.message}
            rules={[{ required: true, message: errors.person?.firstname?.message }]}
          >
            <Controller
              control={control}
              name="person.firstname"
              render={({ field }) => <Input placeholder={t('firstname')} {...field} className="w-full" />}
            ></Controller>
          </Form.Item>
          <Form.Item
            label={t('lastname')}
            validateStatus={errors.person?.lastname ? 'error' : ''}
            help={errors.person?.lastname?.message}
            rules={[{ required: true, message: errors.person?.lastname?.message }]}
          >
            <Controller
              control={control}
              name="person.lastname"
              render={({ field }) => <Input placeholder={t('lastname')} {...field} className="w-full" />}
            ></Controller>
          </Form.Item>
        </div>
        <Form.Item
          label={t('username')}
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username?.message}
          rules={[{ required: true, message: errors.username?.message }]}
        >
          <Controller
            control={control}
            name="username"
            render={({ field }) => <Input placeholder={t('username')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <Form.Item
          label={t('email')}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
          rules={[{ required: true, message: errors.email?.message }]}
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input placeholder={t('email')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <Form.Item
          label={t('password')}
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
          rules={[{ required: true, message: errors.password?.message }]}
        >
          <Controller
            control={control}
            name="password"
            render={({ field }) => <Input.Password placeholder={t('password')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <Form.Item
          label={t('confirm_password')}
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
          rules={[{ required: true, message: errors.confirmPassword?.message }]}
        >
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => <Input.Password placeholder={t('confirm_password')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>

        <div className="mb-2 flex items-center justify-between text-sm text-indigo-500">
          <Link to="/login">{t('login')}</Link>
          {/* <Link to="/forgot-password">{t('forgot_password')}</Link> */}
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('register')}
          </Button>
        </Form.Item>
      </Form>
      {/* <GoogleLogin /> */}
    </div>
  );
}

export default Register;
