// tenants/-components/queries/tenant.api.ts

import { BasicCrud } from '@/common/BasicApi.class';
import { Tenant } from '../interface/tenant.interface';
import { routesEnum } from '@/common/const/routesEnum';

class TenantService extends BasicCrud<Tenant, any> {}

export default new TenantService(routesEnum.tenants);
