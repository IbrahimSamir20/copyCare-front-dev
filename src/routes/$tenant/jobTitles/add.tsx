import { createFileRoute, redirect } from '@tanstack/react-router';
import MainWrapper from '../-components/MainWrapper';
import JobTitleForm from './-components/components/JobTitleForm';
import { actionEnum } from '@/common/const/actionEnum';
import { routesEnum } from '@/common/const/routesEnum';

export const Route = createFileRoute('/$tenant/jobTitles/add')({
  beforeLoad: (opt) => {
    if (opt.context.store.abilities.abilities?.cannot(actionEnum.create, routesEnum.jobTitles)) {
      throw redirect({ to: '/$tenant', params: { tenant: opt.params.tenant } });
    }
  },
  component: AddJobTitle,
});

function AddJobTitle() {
  return (
    <MainWrapper title={'Add JobTitle'}>
      <JobTitleForm />
    </MainWrapper>
  );
}
