// roles/-components/components/RoleForm.tsx

import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { RoleSchema, schema } from '../schema/role.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Form } from 'antd';
import toast from 'react-hot-toast';
import Permissions from './Permissions';
import { useCreateRoleMutation, useUpdateRoleMutation } from '../queries/role.query';
import { FC } from 'react';
import { Role } from '../interface/role.interface';

interface Props {
  id?: string;
  data?: Role;
}

const RoleForm: FC<Props> = ({ id, data }) => {
  const { tenant } = useParams({ strict: false });
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RoleSchema>({
    resolver: zodResolver(schema),
    defaultValues: data as any,
  });
  const { mutateAsync: addRole } = useCreateRoleMutation();
  const { mutateAsync: editRole } = useUpdateRoleMutation();
  const onsubmit = async (data: RoleSchema) => {
    await toast.promise(id ? editRole({ ...(data as any), id }) : addRole(data), {
      loading: `${id ? 'updating' : 'creating'} role`,
      success: `role ${id ? 'updated' : 'created'}`,
      error: `failed to ${id ? 'update' : 'create'} role`,
    });
    navigate({ to: '/$tenant/roles', params: { tenant: tenant as string }, search: { limit: 10, page: 1 } });
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
        validateStatus={errors.permissions ? 'error' : ''}
        help={errors.permissions?.message}
        label="Permissions"
        name="permissions"
        className="col-span-2"
      >
        <Controller name="permissions" control={control} render={({ field }) => <Permissions field={field} />} />
      </Form.Item>
      <div className="col-span-2 flex w-full gap-3">
        <Button type="primary" htmlType="submit" className="w-28">
          Submit
        </Button>
        <Link to="/$tenant/roles" params={{ tenant: tenant as string }} search={{ limit: 10, page: 1 }}>
          <Button className="w-28">Cancel</Button>
        </Link>
      </div>
    </Form>
  );
};

export default RoleForm;
