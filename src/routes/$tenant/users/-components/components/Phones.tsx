import { FC, useEffect, useState } from 'react';
import { phoneSchema, PhoneSchema } from '../schema/person.schema';
import { Button, Input, Select, Space } from 'antd';
import { ZodError } from 'zod';
import { FcPhone } from 'react-icons/fc';
import { MdOutlineBusinessCenter, MdFax } from 'react-icons/md';
import { IoPhonePortraitOutline } from 'react-icons/io5';

interface Props {
  field: any;
}

const getIcon = (type: 'mobile' | 'home' | 'work' | 'fax' | 'other'): JSX.Element => {
  switch (type) {
    case 'mobile':
      return <IoPhonePortraitOutline />;
    case 'home':
      return <FcPhone />;
    case 'work':
      return <MdOutlineBusinessCenter />;
    case 'fax':
      return <MdFax />;
    default:
      return <FcPhone />;
  }
};

const Phones: FC<Props> = ({ field }) => {
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState<PhoneSchema>({
    countryCode: '+02',
    phoneNumber: '',
    type: 'mobile',
    notes: '',
  });
  const [errors, setErrors] = useState<{ path: (string | number)[]; message: string }[]>([]);

  useEffect(() => {}, []);
  errors?.map((e) => e.message);
  return (
    <div className="border p-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div>Phones</div>
        <Button onClick={() => setShowForm(true)}>Add New Phone</Button>
      </div>
      {(!field.value || field.value?.length === 0) && <div className="mt-3 text-error">No Phones Added Yet</div>}
      <div className="flex gap-4">
        {field.value?.map((phone: PhoneSchema) => {
          return (
            <a
              href={`tel:${phone.countryCode}${phone.phoneNumber}`}
              className="flex items-center gap-2"
              key={phone.countryCode + phone.phoneNumber + phone.type}
            >
              <div>{getIcon(phone.type)} </div>
              <div className="flex">
                <div>
                  {phone.countryCode}
                  {phone.phoneNumber}
                </div>
              </div>
              <div>{phone.notes}</div>
            </a>
          );
        })}
      </div>
      {showForm && (
        <div className="fixed left-0 top-0 z-60 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40">
          <div className="flex flex-col gap-2 rounded bg-white p-6 shadow-md">
            <div>
              <div>phone</div>
              <Space.Compact>
                <Input
                  className="w-1/5"
                  defaultValue="+020"
                  placeholder="country code"
                  value={phone.countryCode}
                  onChange={(e) => setPhone({ ...phone, countryCode: e.target.value })}
                />
                <Input
                  className="w-4/5"
                  defaultValue="1111111111"
                  placeholder="phone number"
                  value={phone.phoneNumber}
                  onChange={(e) => setPhone({ ...phone, phoneNumber: e.target.value })}
                />
              </Space.Compact>
              <div>
                <small className="text-red-500">{errors[0]?.message}</small>
              </div>
            </div>
            <div>
              Type
              <Select
                defaultValue="mobile"
                value={phone.type}
                onChange={(value) => setPhone({ ...phone, type: value as any })}
                options={[
                  {
                    label: 'Mobile',
                    value: 'mobile',
                  },
                  {
                    label: 'Home',
                    value: 'home',
                  },
                  {
                    label: 'Work',
                    value: 'work',
                  },
                  {
                    label: 'Fax',
                    value: 'fax',
                  },
                  {
                    label: 'Other',
                    value: 'other',
                  },
                ]}
              />
            </div>
            <div>
              Notes{' '}
              <Input.TextArea value={phone.notes} onChange={(e) => setPhone({ ...phone, notes: e.target.value })} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                type="primary"
                htmlType="button"
                className="w-full"
                onClick={() => {
                  try {
                    phoneSchema.parse(phone);
                    // If the data is valid, proceed with your logic
                    if (field.value) {
                      field.onChange([...field.value, phone]);
                    } else field.onChange([phone]);
                  } catch (error) {
                    if (error instanceof ZodError) {
                      // Handle validation errors
                      const errorMessages = error.errors.map((err) => {
                        return { path: err.path, message: err.message };
                      });
                      setErrors(errorMessages);
                      console.error('Validation errors:', errorMessages);
                      // Return or throw the error messages as needed
                      throw new Error(JSON.stringify(errorMessages));
                    } else {
                      // Handle other errors
                      console.error('Unexpected error:', error);
                      throw error;
                    }
                  }
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false);
                  setPhone({
                    phoneNumber: '',
                    countryCode: '+02',
                    type: 'mobile',
                    notes: '',
                  });
                }}
                type="primary"
                danger
                htmlType="button"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phones;
