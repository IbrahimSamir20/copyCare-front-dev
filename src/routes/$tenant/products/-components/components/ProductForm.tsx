import { Link, useNavigate } from '@tanstack/react-router';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { ProductSchema, baseSchema } from '../schema/product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import toast from 'react-hot-toast';
import { useCreateProductMutation, useUpdateProductMutation } from '../queries/product.query';
import { FC, ReactNode, SetStateAction, useState, Dispatch } from 'react';
import { Product } from '../interface/product.interface';
import { useSuspenseQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MdKeyboardArrowDown } from 'react-icons/md';
import PersonForm from '@/routes/$tenant/users/-components/components/PersonForm';
import axiosInstance from '@/config/axios.config';
import { routesEnum } from '@/common/const/routesEnum';

interface Props {
  id?: string;
  data?: Product;
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

const ProductForm: FC<Props> = ({ id, data }) => {
  const { data: departments } = useSuspenseQuery({
    queryKey: ['departments'],
    queryFn: () => axiosInstance.get(`${routesEnum.departments}`),
  });
  const { data: jobTitles } = useSuspenseQuery({
    queryKey: ['jobTitles'],
    queryFn: () => axiosInstance.get(`${routesEnum.jobTitles}`),
  });
  const [activePanel, setActivePanel] = useState(1);
  const navigate = useNavigate();
  const methods = useForm<ProductSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: data as any,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const { mutateAsync: addProduct } = useCreateProductMutation();
  const { mutateAsync: editProduct } = useUpdateProductMutation();
  const onsubmit = async (data: ProductSchema) => {
    await toast.promise(id ? editProduct({ ...(data as any), id }) : addProduct(data), {
      loading: `${id ? 'updating' : 'creating'} product`,
      success: `product ${id ? 'updated' : 'created'}`,
      error: `failed to ${id ? 'update' : 'create'} product`,
    });
    navigate({ to: '/app/products', search: { limit: 10, page: 1 } });
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <ExpandPanel
          panelId={1}
          title="Product Info"
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
                  filterOption={(input, option) => (option?.name ?? '').includes(input)}
                  options={jobTitles.data.data}
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
                  filterOption={(input, option) => (option?.name ?? '').includes(input)}
                  options={departments.data.data}
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
          <Link to="/app/products" search={{ limit: 10, page: 1 }}>
            <Button className="w-28">Cancel</Button>
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};

export default ProductForm;
