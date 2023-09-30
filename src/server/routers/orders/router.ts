import { procedure, router } from "../../trpc";
import { any, z } from "zod";
import {
  createOrder,
  fetchAllOrders,
  fetchOrdersByUser,
  createCheckout,
<<<<<<< HEAD
} from "../../services/order";
import { OrderInputSchema } from "./schema";
=======
  calculateShipping,
} from "../../services/order";
import { OrderInputSchema } from "./schema";
import { joinNewsLetter } from "../../services/mail";
import { stripe, } from "../../services/stripe";
>>>>>>> master

// Orders Router
export const ordersRouter = router({
  create: procedure.input(OrderInputSchema).mutation(async (opts) => {
    return createOrder(opts.input);
  }),
  stripeCheckout: procedure
    .input(
      z.object({
        cartData: any(),
        shipping: any(),
<<<<<<< HEAD
      }),
    )
    .mutation(async (data) => {
      return createCheckout(data.input.cartData, data.input.shipping);
    }),
=======
        deliveryDetails: any(),
        orderInfo:any()
      })
    )
    .mutation(async (data) => {
      return createCheckout(
        data.input.cartData,
        data.input.shipping,
        data.input.deliveryDetails,
        data.input.orderInfo
      );
    }),
  calculateShipping: procedure
    .input(
      z.object({
        data: any(),
      })
    )
    .mutation(async (data) => {
      return calculateShipping(data.input.data);
    }),
  
  
  
  
  
  
  joinsNewsLetter: procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async (data) => {
      console.log("this should", data.input.email);
      return await joinNewsLetter(data.input.email);
    }),

    retrieveCheckout: procedure
    .input(
      z.object({
        checkoutId: z.string(),
      })
    )
    .query(async (opts) => {
      return await stripe.retrieveCheckout(opts.input.checkoutId);
    }),
  
  
  
  
>>>>>>> master
  getByUser: procedure
    .input(
      z.object({
        userId: z.string(),
<<<<<<< HEAD
      }),
=======
      })
>>>>>>> master
    )
    .query(async (opts) => {
      return fetchOrdersByUser(opts.input.userId);
    }),
  getOrders: procedure.query(async (opts) => {
    return await fetchAllOrders();
  }),
});
