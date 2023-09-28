import { v2 as cloudinary, AdminAndResourceOptions } from "cloudinary";
import { Product } from "../routers/products/schema";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const format = (str: string) => str.toLowerCase().replace(/ /g, "-");

/**
 * Formats the product fields into the Cloudinary image naming scheme
 * product-line_product-type_art-style_product-color_mockup#
 *
 * For example: jac_hoodie_black-and-white-red-outline__black_1
 * Each productLine / productType / artStyle and productColor combination
 * can support multiple mockups
 * @param product
 */
export const formImageName = (product: Product) => {
  const { productLine, productType, artStyle, productColor } = product;

  return `${format(productLine)}_${format(productType)}_${format(
    artStyle,
  )}_${format(productColor)}`;
};

/**
 * Finds all mockup images for a given product. Sorts them in order of mockup#. Mockup 1
 * should be the primary image
 *
 * @param product
 * @param images an array of image URLs
 */
export const matchProductWithImages = (
  product: Product,
  images: any[],
): string[] => {
  const imageName = formImageName(product);

  const matchedImages = images
    .filter((image: { public_id: string }) =>
      image.public_id.includes(imageName),
    )
    // Sort by mockup#
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
