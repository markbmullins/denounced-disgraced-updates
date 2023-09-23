import { v2 as cloudinary, AdminAndResourceOptions } from "cloudinary";
import { Product } from "../routers/products/schema";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const format = (str: string) => str.toLowerCase().replace(/ /g, "-");

export const formImageName = (product: Product) => {
  const { productLine, productType, artStyle, productColor } = product;

  return `${format(productLine)}_${format(productType)}_${format(
    artStyle,
  )}_${format(productColor)}`;
};

export const matchProductWithImages = (
  product: Product,
  images: any[],
): string[] => {
  const imageName = formImageName(product);

  const matchedImages = images
    .filter((image: { public_id: string }) =>
      image.public_id.includes(imageName),
    )
    .sort((a, b) => {
      const numberA = parseInt(a.public_id.split("_").pop() || "0", 10);
      const numberB = parseInt(b.public_id.split("_").pop() || "0", 10);
      return numberA - numberB;
    })
    .map((image: { url: string }) => image.url); // map over matched images to extract their URLs

  return matchedImages || []; // returns an array of URLs
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
