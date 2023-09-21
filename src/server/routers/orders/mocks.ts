import { OrderInput, Order, OrderItem } from "./schema";
import { mockProducts } from "../products/mocks";

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
  // Add more mock orders as required
];

export const createOrder = async (input: OrderInput): Promise<Order> => {
  // Map through the input items and transform them into OrderItems
  const orderItems: OrderItem[] = input.items.map((itemInput) => {
    const product = mockProducts.find((p) => p.id === itemInput.product.id);
    if (!product)
      throw new Error(`Product with ID ${itemInput.product.id} not found!`);
    return { product, quantity: itemInput.quantity };
  });

  const newOrder: Order = {
    orderId: `O${mockOrders.length + 1}`, // simplistic way to generate a new orderId
    userId: input.userId,
    items: orderItems,
    datePlaced: new Date(),
  };

  mockOrders.push(newOrder);

  return newOrder;
};

export const fetchOrdersByUser = async (userId: string): Promise<Order[]> => {
  return mockOrders.filter((order) => order.userId === userId);
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  return mockOrders;
};
