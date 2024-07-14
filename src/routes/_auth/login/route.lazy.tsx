import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
// import GoogleLogin from '../-components/GoogleLogin';
import { useLoginMutation } from './-components/login.query';
import { LoginFormInputs, loginSchema } from './-components/login.schema';

export const Route = createLazyFileRoute('/_auth/login')({
  component: Login,
});

function Login() {
  const { t } = useTranslation();
  const { mutate } = useLoginMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="w-full max-w-md rounded">
        <Form.Item
          label={t('identity')}
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username?.message}
          required
        >
          <Controller
            control={control}
            name="username"
            render={({ field }) => <Input placeholder={t('identity')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <Form.Item
          label={t('password')}
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
          required
        >
          <Controller
            control={control}
            name="password"
            render={({ field }) => <Input.Password placeholder={t('password')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <div className="mb-2 flex items-center justify-between text-sm text-indigo-500">
          <Link to="/forgot-password">{t('forgot_password')}</Link>
          <Link to="/register">{t('register')}</Link>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('login')}
          </Button>
        </Form.Item>
        {/* <GoogleLogin /> */}
      </Form>
    </div>
  );
}
