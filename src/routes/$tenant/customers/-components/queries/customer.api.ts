import { BasicCrud } from '@/common/BasicApi.class';
import { Customer } from '../interface/customer.interface';
import { routesEnum } from '@/common/const/routesEnum';

class CustomerService extends BasicCrud<Customer, any> {}

export default new CustomerService(routesEnum.customers);
