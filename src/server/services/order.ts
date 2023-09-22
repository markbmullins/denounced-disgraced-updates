import { Order, OrderInput, OrderItem } from "../routers/orders/schema";
import { OrdersDao } from "../db/accessors/orders/interface";
import RealOrdersDao from "../db/accessors/orders/real";
import MockOrdersDao from "../db/accessors/orders/mock";
import { mockOrders } from "../db/mocks/orders";

const useMocks = ["development", "test"].includes(process.env.NODE_ENV);
const orderDao: OrdersDao = useMocks ? MockOrdersDao : RealOrdersDao;

export const createOrder = async (input: OrderInput): Promise<Order> => {
  const orderItems: OrderItem[] = input.items.map((itemInput) => {
    const product = orderDao.getProductById(itemInput.product.id);
    if (!product)
      throw new Error(`Product with ID ${itemInput.product.id} not found!`);
    return { product, quantity: itemInput.quantity };
  });

  const newOrder: Order = {
    orderId: `O${mockOrders.length + 1}`,
    userId: input.userId,
    items: orderItems,
    datePlaced: new Date(),
  };

  return orderDao.createOrder(newOrder);
};

export const fetchOrdersByUser = async (userId: string): Promise<Order[]> => {
  return orderDao.getOrdersByUser(userId);
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  return orderDao.getAllOrders();
};
