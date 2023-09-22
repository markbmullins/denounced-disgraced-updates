import { Product } from "../routers/products/schema";
import { fetchCloudinaryResources } from "../utils/cloudinary";
import { mockProducts } from "../db/mocks/products";

const formImageName = (product: Product) => {
  return `${product.design.toLowerCase().replace(" ", "-")}_${product.type
    .toLowerCase()
    .replace(" ", "-")}`;
};

const matchProductWithImage = (product: Product, images: any[]) => {
  const imageName = formImageName(product);
  console.log("Image Name:", imageName);

  const matchedImage = images.find((image: { public_id: string }) =>
    image.public_id.includes(imageName),
  );

  if (matchedImage)
    console.log("Match:", { imageName, public_id: matchedImage.public_id });
  else console.log("Miss:", imageName);

  return matchedImage ? matchedImage.url : undefined;
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const images = await fetchCloudinaryResources({ tag: "jac-mockups" });

  const allImageIds = images.map(
    (image: { public_id: string }) => image.public_id,
  );
  console.log("All Image Public Ids:", allImageIds);

  const modifiedProducts = mockProducts.map((product) => {
    const imageUrl = matchProductWithImage(product, images);
    return {
      ...product,
      imageUrl,
    };
  });

  const productsWithImages = modifiedProducts.filter(
    (product) => !!product.imageUrl,
  );
  console.log("Modified Products with Images:", productsWithImages);

  return productsWithImages.length > 0 ? productsWithImages : mockProducts;
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  return mockProducts.find((product) => product.id === id) || null;
};
