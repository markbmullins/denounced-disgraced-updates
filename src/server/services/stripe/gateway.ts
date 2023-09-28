import { createStripeClient } from "./client";
import { CheckoutParams } from "./types";

export const createStripeGateway = (client = createStripeClient()) => {
  const createCheckout = async (params: CheckoutParams) => {
    return await client.createSession(params);
  };

  return {
    createCheckout,
  };
};
