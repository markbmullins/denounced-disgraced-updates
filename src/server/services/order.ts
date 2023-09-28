import { Order, OrderInput, OrderItem } from "../routers/orders/schema";
import { OrdersDao } from "../db/accessors/orders/interface";
import RealOrdersDao from "../db/accessors/orders/real";
import MockOrdersDao from "../db/accessors/orders/mock";
import { mockOrders } from "../db/mocks/orders";
import { ShippingType } from "../../pages/shipping";
import { stripe, CheckoutParams, CheckoutSession } from "./stripe";

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

export const createCheckout = async (
  cartDetails: any,
  shipping: ShippingType,
) => {
  const dataArray = Object.keys(cartDetails).reduce((result: any, key) => {
    const itemTotal = cartDetails[key].quantity * cartDetails[key].price;
    result.push({
      quantity: cartDetails[key].quantity,
      price_data: {
        currency: "USD",
        unit_amount: cartDetails[key].price,
        product_data: cartDetails[key].product_data,
      },
    });
    return result;
  }, []);

  const params: CheckoutParams = {
    mode: "payment",
    payment_method_types: ["card"],
    invoice_creation: {
      enabled: true,
    },
    payment_intent_data: {
      shipping: {
        address: {
          line1: shipping.address,
          country: shipping.country,
          city: shipping.city,
          postal_code: shipping.postalCode,
        },
        name: shipping.firstName + " " + shipping.lastName,
        phone: shipping.phone,
      },
    },
    metadata: {
      shipping: JSON.stringify(shipping),
    },
    customer_email: shipping.email,
    line_items: dataArray,
    success_url: `https://denounceddisgraced.com/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "https://denounceddisgraced.com/shipping",
  };

  const checkoutSession: CheckoutSession = await stripe.createCheckout(params);

  return checkoutSession.id;
};

export const fetchOrdersByUser = async (userId: string): Promise<Order[]> => {
  return orderDao.getOrdersByUser(userId);
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  return orderDao.getAllOrders();
};
