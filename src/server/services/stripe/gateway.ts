import { createStripeClient } from "./client";
import { CheckoutParams } from "./types";

export const createStripeGateway = (client = createStripeClient()) => {
  const createCheckout = async (params: CheckoutParams) => {
    return await client.createSession(params);
  };

  const retrieveCheckout = async (id: string) => {
     return await client.retireveCheckoutSession(id)
   }

  
  return {
    createCheckout,
    retrieveCheckout
  };
};