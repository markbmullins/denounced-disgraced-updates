import { v2 as cloudinary, AdminAndResourceOptions } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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
