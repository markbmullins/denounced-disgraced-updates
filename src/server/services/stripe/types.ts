import Stripe from "stripe";

export type CheckoutParams = Stripe.Checkout.SessionCreateParams;
export type CheckoutSession = Stripe.Checkout.Session;
<<<<<<< HEAD
=======
export interface DeliveryDetails {
    currency: string;
    id: string;
    maxDeliveryDate: string;
    maxDeliveryDays: number;
    minDeliveryDate: string;
    minDeliveryDays: number;
    name: string;
    rate: string;
  }
>>>>>>> master
