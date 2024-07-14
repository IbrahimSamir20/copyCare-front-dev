import { Link, useNavigate } from '@tanstack/react-router';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { UserSchema, baseSchema, addSchema } from '../schema/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Form, Select } from 'antd';
import toast from 'react-hot-toast';
import PersonForm from './PersonForm';
import { useCreateUserMutation, useUpdateUserMutation } from '../queries/user.query';
import { FC, ReactNode, SetStateAction, useState, Dispatch } from 'react';
import { User } from '../interface/user.interface';
import { useSuspenseQuery } from '@tanstack/react-query';
import { rolesQueryOptions } from '@/routes/$tenant/roles/-components/queries/role.query';
import { motion } from 'framer-motion';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Props {
  id?: string;
  data?: User;
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

const UserForm: FC<Props> = ({ id, data }) => {
  const { data: roles } = useSuspenseQuery(rolesQueryOptions);
  const [activePanel, setActivePanel] = useState(1);
  const navigate = useNavigate();
  const methods = useForm<UserSchema>({
    resolver: zodResolver(id ? baseSchema : addSchema),
    defaultValues: data as any,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const { mutateAsync: addUser } = useCreateUserMutation();
  const { mutateAsync: editUser } = useUpdateUserMutation();
  const onsubmit = async (data: UserSchema) => {
    await toast.promise(id ? editUser({ ...(data as any), id }) : addUser(data), {
      loading: `${id ? 'updating' : 'creating'} user`,
      success: `user ${id ? 'updated' : 'created'}`,
      error: `failed to ${id ? 'update' : 'create'} user`,
    });
    navigate({ to: '/app/users', search: { limit: 10, page: 1 } });
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <ExpandPanel panelId={1} title="System Info" activePanel={activePanel} setActivePanel={setActivePanel} required>
          <Form.Item
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username?.message as React.ReactNode}
            required
            label="Username"
            name="username"
          >
            <Controller
              name="username"
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
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message as React.ReactNode}
            required
            label="Email"
            name="email"
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </Form.Item>
          {!id && (
            <Form.Item
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message as React.ReactNode}
              required
              label="Password"
              name="password"
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Form.Item>
          )}
          <Form.Item
            validateStatus={errors.roleId ? 'error' : ''}
            help={errors.roleId?.message as React.ReactNode}
            required
            label="Role"
            name="roleId"
          >
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  fieldNames={{
                    label: 'name',
                    value: 'id',
                  }}
                  filterOption={(input, option) => (option?.name ?? '').includes(input)}
                  options={roles.data}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Form.Item>
        </ExpandPanel>
        <ExpandPanel panelId={2} title="User Info" activePanel={activePanel} setActivePanel={setActivePanel}>
          <Form.Item
            validateStatus={errors.person ? 'error' : ''}
            help={errors.person?.message as React.ReactNode}
            name="person"
            className="col-span-2"
          >
            <Controller name="person" control={control} render={({ field }) => <PersonForm field={field} />} />
          </Form.Item>
        </ExpandPanel>

        <div className="col-span-2 flex w-full gap-3">
          <Button type="primary" htmlType="submit" className="w-28">
            Submit
          </Button>
          <Link to="/app/users" search={{ limit: 10, page: 1 }}>
            <Button className="w-28">Cancel</Button>
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
