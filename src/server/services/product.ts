import { ProductsDao } from "../db/accessors/products/interface";
import { Product } from "../routers/products/schema";
import { MockProductsDaoWithImages } from "../db/accessors/products/mock";
import { RealProductsDao } from "../db/accessors/products/real";
import { createPrintfulGateway } from "./printful/gateway";

// const useMocks = ["development", "test"].includes(process.env.NODE_ENV!);
// const productDao: ProductsDao = useMocks
//   ? MockProductsDaoWithImages
//   : RealProductsDao;
// Alway use mocks
const productDao = MockProductsDaoWithImages;
const printful = createPrintfulGateway();

export const fetchAllProducts = async (): Promise<Product[]> => {
  const products = await printful.getProducts();
<<<<<<< HEAD
  console.log({ products });
  return productDao.getAllProducts();
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  return productDao.getProductById(id);
};
=======
  return products
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  return printful.getProductInfo(id)
};

>>>>>>> master
