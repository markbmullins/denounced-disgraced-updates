import { Order, OrderInput, OrderItem } from "../routers/orders/schema";
import { OrdersDao } from "../db/accessors/orders/interface";
import RealOrdersDao from "../db/accessors/orders/real";
import MockOrdersDao from "../db/accessors/orders/mock";
import { mockOrders } from "../db/mocks/orders";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
});

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

export const createCheckout = async (cartDetails: any) => {
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


  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    payment_method_types: ["card"],
    invoice_creation: {
      enabled: true,
    },

    shipping_address_collection: {
      allowed_countries: ["US"],
    }, 
    line_items: dataArray,

    success_url: `https://denounceddisgraced.com/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://denounceddisgraced.com/`,
  };


  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params)

  return checkoutSession.id

};

export const fetchOrdersByUser = async (userId: string): Promise<Order[]> => {
  return orderDao.getOrdersByUser(userId);
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  return orderDao.getAllOrders();
};
