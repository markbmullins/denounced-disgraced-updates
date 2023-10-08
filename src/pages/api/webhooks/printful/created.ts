import { NextApiRequest, NextApiResponse } from "next";

import { printful } from "../../../../server/services/printful";


import createImages from '../../../../../defer/created'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body


  
  await createImages(body.data.sync_product.id)

  res.status(200).json({ ok: true });

}
