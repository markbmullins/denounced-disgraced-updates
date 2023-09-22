import { Product } from "../../../routers/products/schema";

export interface ProductsDao {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
}
