import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { JobTitleSchema, baseSchema } from '../schema/jobTitle.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useCreateJobTitleMutation, useUpdateJobTitleMutation } from '../queries/jobTitle.query';
import { FC } from 'react';
import { JobTitle } from '../interface/jobTitle.interface';

interface Props {
  id?: string;
  data?: JobTitle;
}

const JobTitleForm: FC<Props> = ({ id, data }) => {
  const { tenant } = useParams({ strict: false });
  const navigate = useNavigate();
  const methods = useForm<JobTitleSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: data as any,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const { mutateAsync: addJobTitle } = useCreateJobTitleMutation();
  const { mutateAsync: editJobTitle } = useUpdateJobTitleMutation();
  const onsubmit = async (data: JobTitleSchema) => {
    await toast.promise(id ? editJobTitle({ ...(data as any), id }) : addJobTitle(data), {
      loading: `${id ? 'updating' : 'creating'} jobTitle`,
      success: `jobTitle ${id ? 'updated' : 'created'}`,
      error: `failed to ${id ? 'update' : 'create'} jobTitle`,
    });
    navigate({ to: '/$tenant/jobTitles', search: { limit: 10, page: 1 }, params: { tenant: tenant as string } });
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <Form.Item
          validateStatus={errors.jobTitle ? 'error' : ''}
          help={errors.jobTitle?.message as React.ReactNode}
          required
          label="JobTitle Name"
          name="jobTitle"
        >
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Type JobTitle Name" />}
          />
        </Form.Item>

        <div className="col-span-2 flex w-full gap-3">
          <Button type="primary" htmlType="submit" className="w-28">
            Submit
          </Button>
          <Link to="/$tenant/jobTitles" params={{ tenant: tenant as string }} search={{ limit: 10, page: 1 }}>
            <Button className="w-28">Cancel</Button>
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};

export default JobTitleForm;
