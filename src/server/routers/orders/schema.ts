import { z } from "zod";
import { ProductSchema, Product } from "../products/schema";

export const OrderItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number(),
});

export const OrderInputSchema = z.object({
  userId: z.string(),
  items: z.array(OrderItemSchema),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

export type OrderInput = z.infer<typeof OrderInputSchema>;

export type Order = {
  orderId: string;
  userId: string;
  items: OrderItem[];
  datePlaced: Date;
};
