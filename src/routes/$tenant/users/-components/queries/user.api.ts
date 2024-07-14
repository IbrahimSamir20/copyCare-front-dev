import { BasicCrud } from '@/common/BasicApi.class';
import { User } from '../interface/user.interface';
import { routesEnum } from '@/common/const/routesEnum';

class UserService extends BasicCrud<User, any> {}

export default new UserService(routesEnum.users);
