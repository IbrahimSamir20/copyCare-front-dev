import { BasicCrud } from '@/common/BasicApi.class';
import { Employee } from '../interface/employee.interface';
import { routesEnum } from '@/common/const/routesEnum';

class EmployeeService extends BasicCrud<Employee, any> {}

export default new EmployeeService(routesEnum.employees);
