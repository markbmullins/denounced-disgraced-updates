import { Product } from "../../../routers/products/schema";
import { Order } from "../../../routers/orders/schema";

export interface OrdersDao {
  getProductById(id: string): Product | undefined;
  createOrder(order: Order): Order;
  getOrdersByUser(userId: string): Order[];
  getAllOrders(): Order[];
}
