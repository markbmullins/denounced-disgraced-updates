import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../../../server/services/mail";
import ShippingTemplate from "../../../../../emails/shipped";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const body = JSON.parse(req.body);

    console.log(body)

    try {
        const orderEmail = await sendEmail(
            'sbkobaidze@gmail.com',
            `Order ${body.data.shipment.id} has been shipped`,
            ShippingTemplate({
              orderId: body.order.recipient.email,
              orderDate:new Date().toString()
            })
        );
        
        res.status(200)
    }catch(e) {

        res.status(405).json({ message: e });

    }



    
    
}