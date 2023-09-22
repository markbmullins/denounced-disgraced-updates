import { ProductsDao } from "./interface";
import {
  fetchCloudinaryResources,
  matchProductWithImages,
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
          const imageUrls = matchProductWithImages(product, images);
          return {
            ...product,
            imageUrls,
          };
        })
        .filter((p) => p.imageUrl.length > 0); // Only returning products with images for dev purposes
    },

    getProductById: async (id: string) =>
      mockProducts.find((product) => product.id === id) || null,
  };
}

export const MockProductsDaoWithImages = createMockProductsDao({
  fetchImages: true,
});

export const MockProductsDaoWithoutImages = createMockProductsDao();
