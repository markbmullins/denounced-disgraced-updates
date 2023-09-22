import { v2 as cloudinary, AdminAndResourceOptions } from "cloudinary";
import { Product } from "../routers/products/schema";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const formImageName = (product: Product) => {
  return `${product.design.toLowerCase().replace(" ", "-")}_${product.type
    .toLowerCase()
    .replace(" ", "-")}`;
};

export const matchProductWithImage = (product: Product, images: any[]) => {
  const imageName = formImageName(product);

  const matchedImage = images.find((image: { public_id: string }) =>
    image.public_id.includes(imageName),
  );

  return matchedImage ? matchedImage.url : undefined;
};

export const fetchCloudinaryResources = async (
  opts: AdminAndResourceOptions,
) => {
  try {
    const response = await cloudinary.api.resources({
      type: "upload",
      ...opts,
    });
    return response.resources;
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return [];
  }
};
