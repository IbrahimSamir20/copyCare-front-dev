import { BasicCrud } from '@/common/BasicApi.class';
import { Product } from '../interface/product.interface';
import { routesEnum } from '@/common/const/routesEnum';

class ProductService extends BasicCrud<Product, any> {}

export default new ProductService(routesEnum.products);
