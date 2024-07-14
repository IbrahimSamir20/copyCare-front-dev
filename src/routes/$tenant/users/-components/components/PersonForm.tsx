import { Controller, useFormContext } from 'react-hook-form';
import { Input, Form } from 'antd';
import { FC } from 'react';
// import dayjs from 'dayjs';
// import Phones from './Phones';
// import Locations from './Locations';

interface Props {
  field: any;
}

const PersonForm: FC<Props> = ({ field }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Form.Item
        validateStatus={errors.firstname ? 'error' : ''}
        help={errors.firstname?.message as React.ReactNode}
        label="First Name"
        name={`${field.name}.firstname`}
        required
      >
        <Controller
          name={`${field.name}.firstname`}
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
        validateStatus={errors.lastname ? 'error' : ''}
        help={errors.lastname?.message as React.ReactNode}
        label="Last Name"
        name={`${field.name}.lastname`}
        required
      >
        <Controller
          name={`${field.name}.lastname`}
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
      {/* <Form.Item
        validateStatus={errors.gender ? 'error' : ''}
        help={errors.gender?.message as React.ReactNode}
        label="Gender"
        name={`${field.name}.gender`}
      >
        <Controller
          name={`${field.name}.gender`}
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
      </Form.Item> */}
      {/* <Form.Item
        validateStatus={errors.birthday ? 'error' : ''}
        help={errors.birthday?.message as React.ReactNode}
        label="Birthday"
        name={`${field.name}.birthday`}
      >
        <Controller
          name={`${field.name}.birthday`}
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={dayjs(field.value ?? new Date())}
              onChange={(e) => {
                console.log(new Date(e as any));
                console.log(errors);
                field.onChange(new Date(e as any));
              }}
            />
          )}
        />
      </Form.Item> */}
      {/* <Form.Item
        className="col-span-1 w-full sm:col-span-2 lg:col-span-3 xl:col-span-4"
        validateStatus={errors.phones ? 'error' : ''}
        help={errors.phones?.message as React.ReactNode}
        name={`${field.name}.phones`}
      >
        <Controller name={`${field.name}.phones`} control={control} render={({ field }) => <Phones field={field} />} />
      </Form.Item>
      <Form.Item
        validateStatus={errors.locations ? 'error' : ''}
        help={errors.locations?.message as React.ReactNode}
        label="Locations"
        name={`${field.name}.locations`}
        className="col-span-2"
      >
        <Controller
          name={`${field.name}.locations`}
          control={control}
          render={({ field }) => <Locations field={field} />}
        />
      </Form.Item> */}
    </div>
  );
};

export default PersonForm;
