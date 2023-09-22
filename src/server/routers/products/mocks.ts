import { Product } from "./schema";
import { fetchCloudinaryResources } from "../../utils/cloudinary";

export const mockProducts: Product[] = [
  { id: "1", type: "T-shirt", design: "JAC", price: 20.0 },
  { id: "2", type: "Hoodie", design: "JAC", price: 40.0 },
  { id: "3", type: "Tank Top", design: "JAC", price: 18.0 },
  { id: "4", type: "Long Sleeve", design: "JAC", price: 25.0 },

  { id: "5", type: "T-shirt", design: "Design B", price: 21.0 },
  { id: "6", type: "Hoodie", design: "Design B", price: 42.0 },
  { id: "7", type: "Tank Top", design: "Design B", price: 19.0 },
  { id: "8", type: "Long Sleeve", design: "Design B", price: 26.0 },

  { id: "9", type: "T-shirt", design: "Design C", price: 22.0 },
  { id: "10", type: "Hoodie", design: "Design C", price: 43.0 },
  { id: "11", type: "Tank Top", design: "Design C", price: 20.0 },
  { id: "12", type: "Long Sleeve", design: "Design C", price: 27.0 },
];

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
