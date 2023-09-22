import { ProductsDao } from "./interface";
import {
  fetchCloudinaryResources,
  matchProductWithImage,
} from "../../../services/cloudinary";
import { mockProducts } from "../../mocks/products";

interface MockProductsDaoConfig {
  fetchImages?: boolean;
}

export function createMockProductsDao(
  config?: MockProductsDaoConfig,
): ProductsDao {
  return {
    getAllProducts: async () => {
      if (!config?.fetchImages) return mockProducts;

      const images = await fetchCloudinaryResources({ tag: "jac-mockups" });

      return mockProducts
        .map((product) => {
          const imageUrl = matchProductWithImage(product, images);
          return {
            ...product,
            imageUrl,
          };
        })
        .filter((p) => !!p.imageUrl);
    },

    getProductById: async (id: string) =>
      mockProducts.find((product) => product.id === id) || null,
  };
}

export const MockProductsDaoWithImages = createMockProductsDao({
  fetchImages: true,
});

export const MockProductsDaoWithoutImages = createMockProductsDao();
