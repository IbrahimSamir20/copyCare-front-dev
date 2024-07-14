// tenants/-components/components/TenantForm.tsx

import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { TenantSchema, schema } from '../schema/tenant.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Form, Checkbox, DatePicker } from 'antd';
import toast from 'react-hot-toast';
import { useCreateTenantMutation, useUpdateTenantMutation } from '../queries/tenant.query';
import { FC } from 'react';
import { Tenant } from '../interface/tenant.interface';
import dayjs from 'dayjs';

interface Props {
  id?: string;
  data?: Tenant;
}

const TenantForm: FC<Props> = ({ id, data }) => {
  const navigate = useNavigate();
  const { tenant }: { tenant: string } = useParams({ strict: false });
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<TenantSchema>({
    resolver: zodResolver(schema),
    defaultValues: data as any,
  });
  const { mutateAsync: addTenant } = useCreateTenantMutation();
  const { mutateAsync: editTenant } = useUpdateTenantMutation();
  const onsubmit = async (data: TenantSchema) => {
    if (!data.userRegistration) delete data.registrationLinkExpiry;
    await toast.promise(id ? editTenant({ ...(data as any), id }) : addTenant(data), {
      loading: `${id ? 'updating' : 'creating'} tenant`,
      success: `tenant ${id ? 'updated' : 'created'}`,
      error: `failed to ${id ? 'update' : 'create'} tenant`,
    });
    navigate({ to: `/$tenant/tenants`, params: { tenant }, search: { limit: 10, page: 1 } });
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onsubmit)}
      className="grid grid-cols-1 gap-6 p-1 md:grid-cols-2 lg:p-6"
    >
      <Form.Item
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name?.message}
        required
        label="Name"
        name="name"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        validateStatus={errors.subdomain ? 'error' : ''}
        help={errors.subdomain?.message}
        required
        label="Subdomain"
        name="Subdomain"
      >
        <Controller
          name="subdomain"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          )}
        />
      </Form.Item>
      <div>
        <h3>Use Registration Link</h3>
        <div className="mt-3 flex gap-2">
          <Controller
            name="userRegistration"
            control={control}
            render={({ field }) => <Checkbox checked={field.value} {...field} />}
          />
          <Controller
            name="registrationLinkExpiry"
            control={control}
            render={({ field }) => (
              <DatePicker
                disabled={!watch('userRegistration')}
                className="w-full"
                {...field}
                value={dayjs(field.value)}
                onChange={(e) => field.onChange(e.toDate())}
              />
            )}
          />
        </div>
      </div>
      <div className="col-span-2 flex w-full gap-3">
        <Button type="primary" htmlType="submit" className="w-28">
          Submit
        </Button>
        <Link to="/$tenant/tenants" params={{ tenant }} search={{ limit: 10, page: 1 }}>
          <Button className="w-28">Cancel</Button>
        </Link>
      </div>
    </Form>
  );
};

export default TenantForm;
