import { procedure, router } from "../../trpc";
import { z } from "zod";
import { createOrder, fetchAllOrders, fetchOrdersByUser } from "./mocks";
import { OrderInputSchema } from "./schema";

// Orders Router
export const ordersRouter = router({
  create: procedure.input(OrderInputSchema).mutation(async (opts) => {
    return createOrder(opts.input);
  }),
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
