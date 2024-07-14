import { BasicCrud } from '@/common/BasicApi.class';
import { Loan } from '../interface/loan.interface';
import { routesEnum } from '@/common/const/routesEnum';

class LoanService extends BasicCrud<Loan, any> {}

export default new LoanService(routesEnum.loans);
