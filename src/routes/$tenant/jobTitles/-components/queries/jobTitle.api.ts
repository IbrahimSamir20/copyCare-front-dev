import { BasicCrud } from '@/common/BasicApi.class';
import { JobTitle } from '../interface/jobTitle.interface';
import { routesEnum } from '@/common/const/routesEnum';

class JobTitleService extends BasicCrud<JobTitle, any> {}

export default new JobTitleService(routesEnum.jobTitles);
