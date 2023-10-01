import { NextApiRequest, NextApiResponse } from "next";
import { printful } from "../../../../server/services/printful";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const body = JSON.parse(req.body);

    try {
        const fullProductData = await printful.getProductInfo(body.data.sync_product.id)
        const tempalteId = await printful.getProductTemplate('@'+body.data.sync_product.id)


     
        
        res.status(200)
    }catch(e) {

        res.status(405).json({ message: e });

    }



    
    
}