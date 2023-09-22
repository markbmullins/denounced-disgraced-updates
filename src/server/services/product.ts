import { ProductsDao } from "../db/accessors/products/interface";
import { Product } from "../routers/products/schema";
import { MockProductsDaoWithImages } from "../db/accessors/products/mock";
import { RealProductsDao } from "../db/accessors/products/real";

const useMocks = ["development", "test"].includes(process.env.NODE_ENV!);
const productDao: ProductsDao = useMocks
  ? MockProductsDaoWithImages
  : RealProductsDao;

export const fetchAllProducts = async (): Promise<Product[]> => {
  return productDao.getAllProducts();
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  return productDao.getProductById(id);
};
