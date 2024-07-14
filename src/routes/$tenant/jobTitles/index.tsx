import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import { jobTitlesQueryOptions } from './-components/queries/jobTitle.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppTable from '@/components/AppTable';
import TableHeaderButtons from '../-components/TableHeaderButtons';
import useJobTitleColumn from './-components/hooks/useJobTitleColumn';
import { searchSchema } from './-components/schema/jobTitleSearch.schema';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/jobTitles/')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.read, routesEnum.jobTitles)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(jobTitlesQueryOptions);
  },
  validateSearch: (search) => searchSchema.parse(search),

  component: JobTitles,
});

function JobTitles() {
  const { data } = useSuspenseQuery(jobTitlesQueryOptions);
  const { columns } = useJobTitleColumn();
  return (
    <MainWrapper title="JobTitles" buttons={<TableHeaderButtons path="/$tenant/jobTitles/add" />}>
      <AppTable dataSource={data.data} total={data.total as number} columns={columns} />
    </MainWrapper>
  );
}
