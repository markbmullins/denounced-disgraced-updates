import { procedure, router } from "../../trpc";
import { z } from "zod";

// Products Router
export const productsRouter = router({
  getAll: procedure.query(async () => {
    // Implement logic to retrieve all products from your database or service
    return fetchAllProducts();
  }),

  getById: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      return fetchProductById(opts.input.id);
    }),
});
