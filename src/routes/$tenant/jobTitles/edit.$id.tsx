// jobTitles/edit.$id.tsx

import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import JobTitleForm from './-components/components/JobTitleForm';
import { jobTitleQueryOptions } from './-components/queries/jobTitle.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/jobTitles/edit/$id')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.update, routesEnum.jobTitles)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: EditJobTitle,
  loader: async (opt) => {
    return opt.context.queryClient.ensureQueryData(jobTitleQueryOptions(opt.params.id));
  },
});

function EditJobTitle() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(jobTitleQueryOptions(id));
  return (
    <MainWrapper title={'Add JobTitle'}>
      <JobTitleForm id={id} data={data.data} />
    </MainWrapper>
  );
}
