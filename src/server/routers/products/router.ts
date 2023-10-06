import { procedure, router } from "../../trpc";
import { z ,any} from "zod";
import { fetchAllProducts, fetchProductById } from "../../services/product";
import mockups from '../../../../mockups.json'

export const productsRouter = router({
  getAll: procedure.query(async () => {
    console.log("calling fetch products");
    return fetchAllProducts();
  }),

  getProductMockups: procedure
  .input(
    z.object({
      id: any(),
    }),
  )
    .query(async (opts) => {
    return  mockups[opts.input.id];
    ;
  }),

  

  getById: procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      return fetchProductById(opts.input.id);
    }),
});
