import { routesEnum } from '@/common/const/routesEnum';
import axiosInstance from '@/config/axios.config';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDebounce } from 'react-use';

export const Route = createLazyFileRoute('/_auth/register')({
  component: Register,
});

const validateLink = async (uuid: string) => {
  const tenant = await axiosInstance.get(routesEnum.tenants + '/validate/' + uuid);
  return tenant;
};
function Register() {
  const [uuid, setUuid] = useState('');
  const [isValidLink, setIsValidLink] = useState(false);

  useDebounce(
    async () => {
      if (uuid) {
        await validateLink(uuid);
      }
    },
    750,
    [uuid]
  );
  return (
    <div>
      <Form layout="vertical">
        <Form.Item validateStatus={`${isValidLink ? '' : 'error'}`} help="please enter valid link">
          <Input
            placeholder="Please Provide Register Link"
            value={uuid}
            onChange={(e) => {
              setIsValidLink(false);
              setUuid(e.target.value);
            }}
          />
        </Form.Item>
      </Form>

      <Link to="/register/$uuid" params={{ uuid }} disabled={!isValidLink}>
        <Button htmlType="button" className="w-full">
          Go To Link
        </Button>
      </Link>
    </div>
  );
}

export default Register;
