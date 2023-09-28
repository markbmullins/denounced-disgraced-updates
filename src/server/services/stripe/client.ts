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

  return {
    createSession,
  };
};
