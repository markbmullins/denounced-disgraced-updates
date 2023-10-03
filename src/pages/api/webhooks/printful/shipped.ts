import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../../../server/services/mail";
import ShippingTemplate from "../../../../../emails/shipped";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const body = req.body
    try {
        

        const orderEmail = await sendEmail(
            'sbkobaidze@gmail.com',
            `Order ${body.data.order.id} has been shipped`,
            ShippingTemplate({
                orderId: body.data.order.id,
                orderDate: new Date().toString()
            })
        );
        res.status(200).json({ message: 'Email sent' })

    } catch (e) {
        return res.status(405).json({ message: e.message })
    }
        





    
    
}