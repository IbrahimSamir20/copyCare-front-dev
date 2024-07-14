import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { EmployeeSchema, baseSchema } from '../schema/employee.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, InputNumber, Select } from 'antd';
import toast from 'react-hot-toast';
import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from '../queries/employee.query';
import { FC, ReactNode, SetStateAction, useState, Dispatch } from 'react';
import { Employee } from '../interface/employee.interface';
import { useSuspenseQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MdKeyboardArrowDown } from 'react-icons/md';
import PersonForm from '@/routes/$tenant/users/-components/components/PersonForm';
import { departmentsQueryOptions } from '@/routes/$tenant/departments/-components/queries/department.query';
import { jobTitlesQueryOptions } from '@/routes/$tenant/jobTitles/-components/queries/jobTitle.query';

interface Props {
  id?: string;
  data?: Employee;
}

const variants = {
  open: {
    height: 'auto',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  closed: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

interface PanelProps {
  children: ReactNode;
  panelId: number;
  title: string;
  required?: boolean;
  activePanel: number;
  setActivePanel: Dispatch<SetStateAction<number>>;
}

const ExpandPanel: FC<PanelProps> = ({ children, panelId, title, required, activePanel, setActivePanel }) => {
  return (
    <div className="overflow-hidden">
      <div
        onClick={() => setActivePanel(activePanel === panelId ? 0 : panelId)}
        className="flex cursor-pointer items-center justify-between rounded-t-lg border border-gray-100 bg-gray-100 p-4 text-textPrimary"
      >
        <div className="flex items-center gap-2">
          <MdKeyboardArrowDown />
          <div>{title}</div>
        </div>
        {required ? (
          <div>
            <span className="text-red-500">*</span> required
          </div>
        ) : (
          <div>Optional</div>
        )}
      </div>
      <motion.div
        variants={variants}
        animate={activePanel === panelId ? 'open' : 'closed'}
        className="border border-gray-100 shadow-md"
      >
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">{children}</div>
      </motion.div>
    </div>
  );
};

const EmployeeForm: FC<Props> = ({ id, data }) => {
  const { tenant } = useParams({ strict: false });
  const { data: departments } = useSuspenseQuery(departmentsQueryOptions);
  const { data: jobTitles } = useSuspenseQuery(jobTitlesQueryOptions);
  const [activePanel, setActivePanel] = useState(1);
  const navigate = useNavigate();
  const methods = useForm<EmployeeSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: data as any,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const { mutateAsync: addEmployee } = useCreateEmployeeMutation();
  const { mutateAsync: editEmployee } = useUpdateEmployeeMutation();
  const onsubmit = async (data: EmployeeSchema) => {
    await toast.promise(id ? editEmployee({ ...(data as any), id }) : addEmployee(data), {
      loading: `${id ? 'updating' : 'creating'} employee`,
      success: `employee ${id ? 'updated' : 'created'}`,
      error: `failed to ${id ? 'update' : 'create'} employee`,
    });
    navigate({ to: '/$tenant/employees', params: { tenant: tenant as string }, search: { limit: 10, page: 1 } });
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <ExpandPanel required panelId={1} title="User Info" activePanel={activePanel} setActivePanel={setActivePanel}>
          <Form.Item
            validateStatus={errors.person ? 'error' : ''}
            help={errors.person?.message as React.ReactNode}
            name="person"
            className="col-span-2"
          >
            <Controller name="person" control={control} render={({ field }) => <PersonForm field={field} />} />
          </Form.Item>
        </ExpandPanel>

        <ExpandPanel
          panelId={2}
          title="Employee Info"
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          required
        >
          <Form.Item
            validateStatus={errors.jobTitleId ? 'error' : ''}
            help={errors.jobTitleId?.message as React.ReactNode}
            required
            label="JobTitle"
            name="jobTitleId"
          >
            <Controller
              name="jobTitleId"
              control={control}
              render={({ field }) => (
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  fieldNames={{
                    label: 'jobTitle',
                    value: 'id',
                  }}
                  filterOption={(input, option) => (option?.jobTitle ?? '').includes(input)}
                  options={jobTitles.data}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.jobTitleId ? 'error' : ''}
            help={errors.jobTitleId?.message as React.ReactNode}
            required
            label="Department"
            name="departmentId"
          >
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => (
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  fieldNames={{
                    label: 'department',
                    value: 'id',
                  }}
                  filterOption={(input, option) => (option?.department ?? '').includes(input)}
                  options={departments.data}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.salary ? 'error' : ''}
            help={errors.salary?.message as React.ReactNode}
            required
            label="salary"
            name="salary"
          >
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <InputNumber
                  min={1}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    console.log(errors);
                  }}
                  addonAfter="$"
                />
              )}
            />
          </Form.Item>
        </ExpandPanel>

        <div className="col-span-2 flex w-full gap-3">
          <Button type="primary" htmlType="submit" className="w-28">
            Submit
          </Button>
          <Link to="/$tenant/employees" params={{ tenant: tenant as string }} search={{ limit: 10, page: 1 }}>
            <Button className="w-28">Cancel</Button>
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};

export default EmployeeForm;
