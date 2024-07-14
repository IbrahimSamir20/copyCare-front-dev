import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordQuery } from './-components/forgot-passwrod.query';
import { ForgotPasswordFormInputs, forgotPasswordSchema } from './-components/forgot-password.schema';

export const Route = createLazyFileRoute('/_auth/forgot-password')({
  component: ForgotPassword,
});

function ForgotPassword() {
  const { t } = useTranslation();
  const { mutate } = useForgotPasswordQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormInputs) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="w-full max-w-md rounded">
        <Form.Item
          label={t('email')}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
          required
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input placeholder={t('email')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('send_reset_link')}
          </Button>
        </Form.Item>
      </Form>
      <div className="mt-4 flex w-full items-center justify-between text-sm text-indigo-500">
        <Link to="/login">{t('login')}</Link>
        <Link to="/register">{t('register')}</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
