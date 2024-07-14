import TableActions from '@/components/Table/TableActions';
import {
  useDeleteJobTitleMutation,
  useSoftDeleteJobTitleMutation,
  useRestoreJobTitleMutation,
} from '../queries/jobTitle.query';

const useJobTitleColumn = () => {
  const columns = [
    {
      title: 'jobTitle',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },

    {
      title: 'Action',
      key: 'action',
      render: (ele: Record<string, any>) => {
        return (
          <TableActions
            deleteMutation={useDeleteJobTitleMutation}
            softDeleteMutation={useSoftDeleteJobTitleMutation}
            restoreMutation={useRestoreJobTitleMutation}
            actions={['edit', 'delete', 'soft']}
            mainPath="jobTitles"
            id={ele.id}
            active={!ele.deletedAt}
          />
        );
      },
    },
  ];

  return { columns };
};

export default useJobTitleColumn;
