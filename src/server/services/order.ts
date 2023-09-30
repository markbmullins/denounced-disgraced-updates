import { Order, OrderInput, OrderItem } from "../routers/orders/schema";
import { OrdersDao } from "../db/accessors/orders/interface";
import RealOrdersDao from "../db/accessors/orders/real";
import MockOrdersDao from "../db/accessors/orders/mock";
import { mockOrders } from "../db/mocks/orders";
import { ShippingType } from "../../pages/shipping";
import { stripe, CheckoutParams, CheckoutSession } from "./stripe";
<<<<<<< HEAD
=======
import { printful } from "./printful";
import { DeliveryDetails } from "./stripe";
import { OrderItems, PrintfulShipping } from "./printful/types";
>>>>>>> master

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
<<<<<<< HEAD
) => {
=======
  deliveryDetails: DeliveryDetails,
  orderInfo: OrderItems
) => {
  let isProduction = process.env.NODE_ENV === "production"; // This is just an example for Node.js environment

  let developmentURL = `http://localhost:3000`;
  let productionURL = "https://denounceddisgraced.com";

>>>>>>> master
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

<<<<<<< HEAD
=======
  const shippingInfo = {
    shipping_rate_data: {
      fixed_amount: {
        amount: parseFloat(deliveryDetails.rate) * 100,
        currency: "USD",
      },
      display_name: "Shipping",
      type: "fixed_amount",
      delivery_estimate: {
        minimum: { unit: "day", value: deliveryDetails.minDeliveryDays },
        maximum: { unit: "day", value: deliveryDetails.maxDeliveryDays },
      },
    },
  };

>>>>>>> master
  const params: CheckoutParams = {
    mode: "payment",
    payment_method_types: ["card"],
    invoice_creation: {
      enabled: true,
    },
<<<<<<< HEAD
=======

    //@ts-ignore
    shipping_options: [shippingInfo],

>>>>>>> master
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
<<<<<<< HEAD
    },
    customer_email: shipping.email,
    line_items: dataArray,
    success_url: `https://denounceddisgraced.com/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "https://denounceddisgraced.com/shipping",
=======
      orderInfo: JSON.stringify(orderInfo),
    },
    customer_email: shipping.email,
    line_items: dataArray,
    success_url: `${
      !isProduction ? developmentURL : productionURL
    }/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${!isProduction ? developmentURL : productionURL}/shipping`,
>>>>>>> master
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
<<<<<<< HEAD
=======

export const calculateShipping = async (
  data: PrintfulShipping
): Promise<any> => {
  return printful.calculateShipping(data);
};
>>>>>>> master
