import { Order } from "../../../routers/orders/schema";
import { mockProducts } from "../../mocks/products";
import { mockOrders } from "../../mocks/orders";
import { OrdersDao } from "./interface";

const MockOrdersDao: OrdersDao = {
  getProductById: (id: string) => {
    return mockProducts.find((p) => p.id === id);
  },

  createOrder: (order: Order) => {
    mockOrders.push(order);
    return order;
  },

  getOrdersByUser: (userId: string) => {
    return mockOrders.filter((order) => order.userId === userId);
  },

  getAllOrders: () => {
    return mockOrders;
  },
};

export default MockOrdersDao;
