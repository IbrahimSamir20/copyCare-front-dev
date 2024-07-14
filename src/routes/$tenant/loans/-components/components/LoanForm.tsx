import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { LoanSchema, baseSchema } from '../schema/loan.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, DatePicker, Select, InputNumber } from 'antd';
import toast from 'react-hot-toast';
import { useCreateLoanMutation, useUpdateLoanMutation } from '../queries/loan.query';
import { FC } from 'react';
import { Loan } from '../interface/loan.interface';
import { useSuspenseQuery } from '@tanstack/react-query';
import { employeesQueryOptions } from '@/routes/$tenant/employees/-components/queries/employee.query';
import dayjs from 'dayjs';

interface Props {
  id?: string;
  data?: Loan;
}

const LoanForm: FC<Props> = ({ id, data }) => {
  const { tenant } = useParams({ strict: false });
  const { data: employess } = useSuspenseQuery(employeesQueryOptions);
  const navigate = useNavigate();
  const methods = useForm<LoanSchema>({
    resolver: zodResolver(baseSchema),
    defaultValues: data as any,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = methods;

  const { mutateAsync: addLoan } = useCreateLoanMutation();
  const { mutateAsync: editLoan } = useUpdateLoanMutation();
  const onsubmit = async (data: LoanSchema) => {
    await toast.promise(id ? editLoan({ ...data, id }) : addLoan(data), {
      loading: `${id ? 'Updating' : 'Creating'} loan`,
      success: `Loan ${id ? 'updated' : 'created'}`,
      error: `Failed to ${id ? 'update' : 'create'} loan`,
    });
    navigate({ to: `/${tenant}/loans`, search: { limit: 10, page: 1 }, params: { tenant: tenant as string } });
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <Form.Item
          validateStatus={errors.employeeId ? 'error' : ''}
          help={errors.employeeId?.message as React.ReactNode}
          required
          label="Employee"
          name="employeeId"
        >
          <Controller
            name="employeeId"
            control={control}
            render={({ field }) => (
              <Select
                options={employess.data}
                fieldNames={{ value: 'id', label: 'fullName' }}
                {...field}
                placeholder="Employee"
              />
            )}
          />
        </Form.Item>

        <div className="grid grid-cols-3 gap-2">
          <Form.Item
            validateStatus={errors.amount ? 'error' : ''}
            help={errors.amount?.message as React.ReactNode}
            required
            label="Loan Amount"
            name="amount"
          >
            <Controller
              name="amount"
              control={control}
              render={({ field }) => <InputNumber className="w-full" {...field} type="number" placeholder="Amount" />}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.issueDate ? 'error' : ''}
            help={errors.issueDate?.message as React.ReactNode}
            label="Issue Date"
            name="issueDate"
          >
            <Controller
              name="issueDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(e) => field.onChange(e.toDate())}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.monthlyPayment ? 'error' : ''}
            help={errors.monthlyPayment?.message as React.ReactNode}
            required
            label="Monthly Payment"
            name="monthlyPayment"
          >
            <Controller
              name="monthlyPayment"
              control={control}
              render={({ field }) => (
                <InputNumber
                  max={getValues('amount')}
                  className="w-full"
                  {...field}
                  type="number"
                  placeholder="Monthly Payment"
                />
              )}
            />
          </Form.Item>
        </div>
        <div className="col-span-2 flex w-full gap-3">
          <Button type="primary" htmlType="submit" className="w-28">
            Submit
          </Button>
          <Link to={`/${tenant}/loans`} params={{ tenant: tenant as string }} search={{ limit: 10, page: 1 }}>
            <Button className="w-28">Cancel</Button>
          </Link>
        </div>
      </Form>
    </FormProvider>
  );
};

export default LoanForm;
