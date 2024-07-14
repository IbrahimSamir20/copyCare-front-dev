import { BasicCrud } from '@/common/BasicApi.class';
import { Vendor } from '../interface/vendor.interface';
import { routesEnum } from '@/common/const/routesEnum';

class VendorService extends BasicCrud<Vendor, any> {}

export default new VendorService(routesEnum.vendors);
