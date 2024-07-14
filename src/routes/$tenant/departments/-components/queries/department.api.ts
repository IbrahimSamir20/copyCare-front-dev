import { BasicCrud } from '@/common/BasicApi.class';
import { Department } from '../interface/department.interface';
import { routesEnum } from '@/common/const/routesEnum';

class DepartmentService extends BasicCrud<Department, any> {}

export default new DepartmentService(routesEnum.departments);
