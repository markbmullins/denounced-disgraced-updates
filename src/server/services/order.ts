import { Order, OrderInput, OrderItem } from "../routers/orders/schema";
import { mockProducts } from "../db/mocks/products";
import { mockOrders } from "../db/mocks/orders";

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
