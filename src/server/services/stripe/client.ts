import Stripe from "stripe";
import { CheckoutParams } from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  apiVersion: "2023-08-16",
});

export const createStripeClient = () => {
  const createSession = async (params: CheckoutParams) => {
    try {
      return await stripe.checkout.sessions.create(params);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to create session: ${error.message}`);
      else throw new Error("An unknown error occurred");
    }
  };
  
  const retireveCheckoutSession = async (id: string) => {
    const checkout_session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ["payment_intent"],
      })
      
      const lineItems = await stripe.checkout.sessions.listLineItems(
        id,
        {
          expand: ["data.price.product"],
        }
      )
    if (checkout_session) {
      return { session: checkout_session, items: lineItems }
    } else {
      return false
    }
  }


  return {
    createSession,
    retireveCheckoutSession
  };
};
