// roles/-components/queries/role.api.ts

import { BasicCrud } from '@/common/BasicApi.class';
import { Role } from '../interface/role.interface';
import { routesEnum } from '@/common/const/routesEnum';

class RoleService extends BasicCrud<Role, any> {}

export default new RoleService(routesEnum.roles);
