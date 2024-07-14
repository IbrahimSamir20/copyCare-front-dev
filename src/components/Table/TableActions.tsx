import { UseMutationResult } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { Checkbox, Popconfirm, Switch } from 'antd';
import { FC } from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

interface Props {
  actions: string[];
  mainPath: string;
  id: string;
  active: boolean;
  approved?: boolean;
  deleteMutation: (id: string) => UseMutationResult<any, Error, void, any>;
  softDeleteMutation: (id: string) => UseMutationResult<any, Error, void, any>;
  restoreMutation: (id: string) => UseMutationResult<any, Error, void, any>;
  approveMutation?: (id: string) => UseMutationResult<any, Error, void, any>;
}

const TableActions: FC<Props> = ({
  actions,
  mainPath,
  id,
  active,
  approved,
  softDeleteMutation,
  restoreMutation,
  deleteMutation,
  approveMutation,
}) => {
  const { tenant } = useParams({ strict: false });
  const { mutateAsync: deleteElement } = deleteMutation(id);
  const { mutateAsync: soft } = softDeleteMutation(id);
  const { mutateAsync: restore } = restoreMutation(id);
  const approveMutate = approveMutation ? approveMutation!(id) : undefined;

  return (
    <div className="flex items-center gap-3">
      {actions.includes('edit') && (
        <Link to={`/${tenant}/${mainPath}/edit/${id}`}>
          <CiEdit className="cursor-pointer text-xl text-blue-700" />
        </Link>
      )}

      {actions.includes('delete') && (
        <Popconfirm
          title="Delete the Element"
          description="Are you sure to delete this Element?"
          onConfirm={() => deleteElement()}
          // onCancel={()=>{}}
          okText="Yes"
          cancelText="No"
        >
          <CiTrash className="cursor-pointer text-xl text-error" />
        </Popconfirm>
      )}

      {actions.includes('soft') && (
        <Switch
          checked={active}
          size="small"
          onChange={async () => {
            active ? soft() : restore();
          }}
        />
      )}
      {actions.includes('approve') && !approved && (
        <Checkbox
          checked={approved}
          onChange={() => {
            if (approveMutate) approveMutate.mutateAsync();
          }}
        />
      )}
      {actions.includes('pay') && (
        <Link to={`pay/${id}`}>
          <FaMoneyBillTransfer />
        </Link>
      )}
    </div>
  );
};

export default TableActions;
