import Stripe from "stripe";

export type CheckoutParams = Stripe.Checkout.SessionCreateParams;
export type CheckoutSession = Stripe.Checkout.Session;
