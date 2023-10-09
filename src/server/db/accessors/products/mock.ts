import { ProductsDao } from "./interface";
import {
  fetchCloudinaryResources,
  matchProductWithImages,
} from "../../../services/cloudinary/cloudinary";
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

      // Fetch all product images from Cloudinary
      const images = await fetchCloudinaryResources({ tag: "jac-mockups" });

      // Match products to image URLs
      return (
        mockProducts
          .map((product) => {
            const imageUrls = matchProductWithImages(product, images);
            return {
              ...product,
              imageUrls,
            };
          })
          // Only returning products with images for dev purposes
          .filter((p) => p.imageUrls.length > 0)
      );
    },

    getProductById: async (id: string) => {
      const product = mockProducts.find((product) => product.id === id)!;
      if (!config?.fetchImages) return product;

      const images = await fetchCloudinaryResources({ tag: "jac-mockups" });
      return { ...product, imageUrls: matchProductWithImages(product, images) };
    },
  };
}

export const MockProductsDaoWithImages = createMockProductsDao({
  fetchImages: true,
});

export const MockProductsDaoWithoutImages = createMockProductsDao();
