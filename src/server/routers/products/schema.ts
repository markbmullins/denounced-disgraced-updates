import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  type: z.union([
    z.literal("T-shirt"),
    z.literal("Hoodie"),
    z.literal("Tank Top"),
    z.literal("Long Sleeve"),
  ]),
  design: z.union([
    z.literal("Design A"),
    z.literal("Design B"),
    z.literal("Design C"),
  ]),
  price: z.number(),
  imageUrl: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
