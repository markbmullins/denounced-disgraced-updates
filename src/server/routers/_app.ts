import { z } from "zod";
import { procedure, router } from "../trpc";
import { productsRouter } from "./products/router";
import { ordersRouter } from "./orders/router";

export const appRouter = router({
  products: productsRouter,
  orders: ordersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
