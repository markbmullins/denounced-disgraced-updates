import { formatCurrency } from "../../../utils/formatCurrency";
import Stripe from "stripe";

import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "node:stream/consumers";

import { sendEmail } from "../../../server/services/mail";
import OrderTemplate from "../../../../emails/order";

import { printful } from "../../../server/services/printful";
interface ExtendedCheckoutSession extends Stripe.Checkout.Session {
  metadata: any;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
});

const webhookSecret: string ="whsec_d14c0b45d3a65cac4025b8bd3c6b29c2e9423e35cba5d49b5b5d6a9628b1123a"
  // process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buff = await buffer(req);

    //@ts-ignore
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buff, sig!, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(404).json({ message: `Webhook Error: ${errorMessage}` });
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.type);

    // Cast event data to Stripe object.
    if (event.type === "payment_intent.succeeded") {
      const payment = event.data.object as Stripe.Subscription;
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object as ExtendedCheckoutSession;

      const shippingData = JSON.parse(checkoutSession.metadata?.shipping);
      const orderData = JSON.parse(checkoutSession.metadata?.orderInfo);

      //get cart data info
      const lineItems = await stripe.checkout.sessions.listLineItems(
        checkoutSession.id,
        {
          expand: ["data.price.product"],
        }
      );

      //map data to for order email
      const lineItemsForOrderEmail = lineItems.data.map((item: any) => {
        return {
          title: item.price?.product?.metadata?.title!,
          quantity: item.quantity,
          amount: formatCurrency(item.amount_subtotal / 100),
          image: item.price?.product.images[0],
        };
      });

      const createOrder = await printful.createOrder({
        recipient: {
          name: shippingData?.firstName! + " " + shippingData?.lastName,
          address1: shippingData?.address,
          city: shippingData?.city,
          state_code: shippingData?.stateCode,
          country_code: shippingData?.country,
          zip: shippingData?.postalCode,
        },

        items: orderData,
      });



      //send email
      const orderEmail = await sendEmail(
        checkoutSession?.customer_details?.email!,
        "Order Received",
        OrderTemplate({
          lineItems: lineItemsForOrderEmail,
          shippingAddress: shippingData?.address,
          orderId: createOrder.id,
          orderDate:new Date().toString()
        })
      );
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }
    res.status(200).json({ received: true });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
