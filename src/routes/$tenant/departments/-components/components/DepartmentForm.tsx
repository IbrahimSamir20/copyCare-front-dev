import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { DepartmentSchema, baseSchema } from '../schema/department.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '../queries/department.query';
import { FC } from 'react';
import { Department } from '../interface/department.interface';

interface Props {
  id?: string;
  data?: Department;
}

const DepartmentForm: FC<Props> = ({ id, data }) => {
  const { tenant } = useParams({ strict: false });
  const navigate = useNavigate();
  const methods = useForm<DepartmentSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: data as any,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const { mutateAsync: addDepartment } = useCreateDepartmentMutation();
  const { mutateAsync: editDepartment } = useUpdateDepartmentMutation();
  const onsubmit = async (data: DepartmentSchema) => {
    await toast.promise(id ? editDepartment({ ...(data as any), id }) : addDepartment(data), {
      loading: `${id ? 'updating' : 'creating'} department`,
      success: `department ${id ? 'updated' : 'created'}`,
      error: `failed to ${id ? 'update' : 'create'} department`,
    });
    navigate({ to: '/$tenant/departments', search: { limit: 10, page: 1 }, params: { tenant: tenant as string } });
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <Form.Item
          validateStatus={errors.department ? 'error' : ''}
          help={errors.department?.message as React.ReactNode}
          required
          label="Department Name"
          name="department"
        >
          <Controller
            name="department"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Type Department Name" />}
          />
        </Form.Item>

        <div className="col-span-2 flex w-full gap-3">
          <Button type="primary" htmlType="submit" className="w-28">
            Submit
          </Button>
          <Link to="/$tenant/departments" params={{ tenant: tenant as string }} search={{ limit: 10, page: 1 }}>
            <Button className="w-28">Cancel</Button>
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};

export default DepartmentForm;
