import { procedure, router } from "../../trpc";
import { any, z } from "zod";
import {
  createOrder,
  fetchAllOrders,
  fetchOrdersByUser,
  createCheckout
  
} from "../../services/order";
import { OrderInputSchema } from "./schema";

// Orders Router
export const ordersRouter = router({
  create: procedure.input(OrderInputSchema).mutation(async (opts) => {
    return createOrder(opts.input);
  }),
  stripeCheckout: procedure.input(
    z.object({
      data: any()
    })
  ).mutation(async (data) => {return createCheckout(data.input.data)}),
  getByUser: procedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async (opts) => {
      return fetchOrdersByUser(opts.input.userId);
    }),
  getOrders: procedure.query(async (opts) => {
    return await fetchAllOrders();
  }),
});
