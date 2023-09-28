import { OrdersDao } from "./interface";
import { Order } from "../../../routers/orders/schema";

// TODO: implement real dao and remove any
const RealOrdersDao: OrdersDao = {
  getProductById: (id: string): any => {},

  createOrder: (order: Order): any => {},

  getOrdersByUser: (userId: string): any => {},

  getAllOrders: (): any => {},
};

export default RealOrdersDao;
