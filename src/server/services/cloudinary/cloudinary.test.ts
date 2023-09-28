import * as cloudinaryFunctions from "./cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Mocking the cloudinary API call
jest.mock("cloudinary", () => ({
  v2: {
    api: {
      resources: jest.fn(),
    },
    config: jest.fn(),
  },
}));

describe("Cloudinary functions", () => {
  describe("formImageName", () => {
    it("should format product fields into Cloudinary image naming scheme", () => {
      const product = {
        productLine: "Jac",
        productType: "Hoodie",
        artStyle: "Black and White Red Outline",
        productColor: "Black",
      };

      const formattedName = cloudinaryFunctions.formImageName(product as any);
      expect(formattedName).toEqual(
        "jac_hoodie_black-and-white-red-outline_black",
      );
    });
  });

  describe("matchProductWithImages", () => {
    it("should match and sort product images correctly", () => {
      const product = {
        productLine: "Jac",
        productType: "Hoodie",
        artStyle: "Black and White Red Outline",
        productColor: "Black",
      };
      const images = [
        {
          public_id: "jac_hoodie_black-and-white-red-outline_black_2",
          url: "url2",
        },
        {
          public_id: "jac_hoodie_black-and-white-red-outline_black_1",
          url: "url1",
        },
      ];
      const matchedImages = cloudinaryFunctions.matchProductWithImages(
        product as any,
        images,
      );
      expect(matchedImages).toEqual(["url1", "url2"]);
    });
  });

  describe("fetchCloudinaryResources", () => {
    it("should return resources on successful fetch", async () => {
      (cloudinary.api.resources as jest.Mock).mockResolvedValueOnce({
        resources: ["resource1", "resource2"],
      });
      const resources = await cloudinaryFunctions.fetchCloudinaryResources({});
      expect(resources).toEqual(["resource1", "resource2"]);
    });

    it("should log an error and return an empty array on failure", async () => {
      (cloudinary.api.resources as jest.Mock).mockRejectedValueOnce(
        new Error("An error occurred"),
      );
      console.error = jest.fn();

      const resources = await cloudinaryFunctions.fetchCloudinaryResources({});
      expect(resources).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching images from Cloudinary:",
        new Error("An error occurred"),
      );
    });
  });
});
