import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  productLine: z.literal("jac"),
  productType: z.union([
    z.literal("t-shirt"),
    z.literal("hoodie"),
    z.literal("tank-top"),
    z.literal("long-sleeve"),
    z.literal("sweatshirt"),
    z.literal("phone-case"),
    z.literal("shorts"),
  ]),
  artStyle: z.union([
    z.literal("full-color"),
    z.literal("black-and-white-red-outline"),
    z.literal("black-and-white-green-outline"),
    z.literal("mixed"),
  ]),
  productColor: z.union([
    z.literal("black"),
    z.literal("white"),
    z.literal("red"),
    z.literal("green"),
  ]),
  price: z.number(),
  imageUrls: z.array(z.string().optional()),
});

export type Product = z.infer<typeof ProductSchema>;
