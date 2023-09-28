import { procedure, router } from "../../trpc";
import { z } from "zod";
import { fetchAllProducts, fetchProductById } from "../../services/product";

export const productsRouter = router({
  getAll: procedure.query(async () => {
    console.log("calling fetch products");
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
