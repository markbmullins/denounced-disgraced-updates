import MailerLite from "mailerlite-api-v2-node";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API!);


const mailerlite = MailerLite(process.env.MAILER_LITE!);

export const joinNewsLetter = async (email: string) => {
  const subscribe = await mailerlite.addSubscriber({ email: email });

    return subscribe
    };


    export const sendEmail = async (email: string, subject: string, template:any ) => {
    
      const data = await resend.emails.send({
        from: 'ThirdMerch <contact@thirdmerch.com>',
        to: [email],
        subject:  subject,
        react:template,
      });
  
  console.log(data)
  
 


}