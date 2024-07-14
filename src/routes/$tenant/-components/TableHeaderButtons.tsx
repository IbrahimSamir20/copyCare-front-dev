import { FC } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { Button } from 'antd';

interface Props {
  path: string;
}

const TableHeaderButtons: FC<Props> = ({ path }) => {
  const { tenant } = useParams({ strict: false });
  return (
    <>
      <Button type="text">Export</Button>
      <Link to={path} params={{ tenant }}>
        <Button type="primary">+ Add</Button>
      </Link>
    </>
  );
};

export default TableHeaderButtons;
