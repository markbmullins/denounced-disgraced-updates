import { Order } from "../../routers/orders/schema";
import { mockProducts } from "./products";

export const mockOrders: Order[] = [
  {
    orderId: "O1",
    userId: "U1",
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[3], quantity: 1 },
    ],
    datePlaced: new Date("2023-01-01"),
  },
  {
    orderId: "O2",
    userId: "U2",
    items: [
      { product: mockProducts[5], quantity: 3 },
      { product: mockProducts[8], quantity: 1 },
    ],
    datePlaced: new Date("2023-02-15"),
  },
];
