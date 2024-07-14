import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { loanQueryOptions } from '../queries/loan.query';
import { Controller, useForm } from 'react-hook-form';
import { baseSchema, LoanPaymentSchema } from '../schema/loan-payment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '@/config/axios.config';
import { routesEnum } from '@/common/const/routesEnum';
import toast from 'react-hot-toast';
import { Button, DatePicker, Form, InputNumber } from 'antd';
import dayjs from 'dayjs';

const LoanPaymentForm = () => {
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useState(true);
  const { tenant, id, paymentId } = useParams({ from: '/$tenant/loans/pay/$id/edit/$paymentId' });
  const { data: loan } = useSuspenseQuery(loanQueryOptions(id));
  const { data: loanPayment } = useQuery({
    queryKey: ['loanPayment', paymentId],
    queryFn: () => axiosInstance.get(`/loan-payments/${paymentId}`),
    enabled: !!paymentId,
  });
  const navigate = useNavigate();
  const methods = useForm<LoanPaymentSchema>({
    resolver: zodResolver(baseSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;
  useEffect(() => {
    if (loan.data) {
      setValue('amount', paymentId ? loanPayment?.data.data.amount : loan.data.monthlyPayment);
      setValue('paymentDate', paymentId ? loanPayment?.data.data.paymentDate : new Date());
      setValue('loanId', +loan.data.id);
    }
  }, [loan, setValue, loanPayment, paymentId]);
  const addLoanPayment = async (data: LoanPaymentSchema) => {
    if (paymentId) {
      return axiosInstance.patch(`${routesEnum.loanPayments}/${paymentId}`, data);
    } else {
      return axiosInstance.post(routesEnum.loanPayments, data);
    }
  };

  const onsubmit = async (data: LoanPaymentSchema) => {
    await toast.promise(addLoanPayment(data), {
      loading: `Creating loan payment`,
      success: `Loan payment created`,
      error: `Failed to create loan payment`,
    });
    queryClient.invalidateQueries({ queryKey: [routesEnum.loans] });
    navigate({ to: `/$tenant/loans/pay/$id`, params: { tenant, id } });
  };
  return (
    <div className="fixed left-0 top-0 z-70 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 rounded-lg bg-white p-4 shadow lg:w-9/12">
        <div>
          <h4 className="border-b pb-2">Add New Payment</h4>
        </div>
        <div className="mt-4">
          <Form
            layout="vertical"
            onError={(e) => console.log(e)}
            onFinish={handleSubmit(onsubmit)}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-2 gap-2">
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
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={0.01}
                      disabled={disabled}
                      className="w-full"
                      type="number"
                      placeholder="Amount"
                      max={paymentId ? loan.data?.remaining + loanPayment?.data.data.amount : loan.data?.remaining}
                    />
                  )}
                />
              </Form.Item>

              <Form.Item
                validateStatus={errors.paymentDate ? 'error' : ''}
                help={errors.paymentDate?.message as React.ReactNode}
                label="payment Date"
                name="paymentDate"
              >
                <Controller
                  name="paymentDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      disabled={disabled}
                      className="w-full"
                      {...field}
                      value={dayjs(field.value)}
                      onChange={(e) => field.onChange(e.toDate())}
                    />
                  )}
                />
              </Form.Item>
            </div>
            <div className="col-span-2 flex w-full gap-3">
              <Button type="primary" htmlType="submit" className="w-28">
                Submit
              </Button>
              <Link to={`/$tenant/loans/pay/$id`} params={{ tenant, id }}>
                <Button className="w-28">Cancel</Button>
              </Link>
              <Button danger type="text" disabled={!disabled} onClick={() => setDisabled(!disabled)}>
                Change Amount & Date
              </Button>
              <Button
                disabled={disabled}
                onClick={() => {
                  setValue('amount', loan.data?.monthlyPayment);
                  setValue('paymentDate', new Date());
                }}
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoanPaymentForm;
