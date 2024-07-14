import { createLazyFileRoute } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useResetPasswordMutation } from './-components/reset-password.query';
import { ResetPasswordFormInputs, resetPasswordSchema } from './-components/reset-password.schema';

export const Route = createLazyFileRoute('/_auth/reset-password/$token')({
  component: ResetPassword,
});

function ResetPassword() {
  const { t } = useTranslation();
  const { token } = Route.useParams();

  const { mutate } = useResetPasswordMutation(token);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormInputs) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="w-full max-w-md rounded">
        <Form.Item
          label={t('password')}
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword?.message}
          required
        >
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => <Input.Password placeholder={t('password')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <Form.Item
          label={t('confirm_password')}
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
          required
        >
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => <Input.Password placeholder={t('confirm_password')} {...field} className="w-full" />}
          ></Controller>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('reset_password')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ResetPassword;
