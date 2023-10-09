import { createPrintfulClient } from "./client";
import { PrintfulOrder,PrintfulShipping,PrintfulWebhook } from "./types";

export const createPrintfulGateway = (client = createPrintfulClient()) => {
  const getProducts = async (): Promise<any> => {
    console.log("fetching products...");
    const url = `store/products`;
    return await client.get(url);
  };

  const createOrder = async (orderData: PrintfulOrder): Promise<any> => {
    const url = `orders`;
    return await client.post(url, { body: orderData });
  };

  const getProductInfo = async (productId: number): Promise<any> => {
    const url = `store/products/${productId}`;
    return await client.get(url);
  };

  const createMockUpImages =  async (productId: number,data:any): Promise<any> => {
    const url = `mockup-generator/create-task/${productId}`;
    return await client.post(url, { body: data });
  };

  const retrieveMockUpImages = async (taskId: number): Promise<any> => { 

    const url = `mockup-generator/task?task_key=${taskId}`
    return await client.get(url, );

  }

  const getProductTemplates = async (): Promise<any>=> {
    const url = 'product-templates'
    return await client.get(url, );

  }

  const getProductTemplate = async (id:string): Promise<any>=> {
    const url = `product-templates/${id}`
    return await client.get(url);

  }

  const subscribeToWebhook = async (data:PrintfulWebhook): Promise<any> => { 

    const url = `webhooks`
    return await client.post(url,{body:data} );
  }


  const getAllPrintOptions = async (id: string):Promise<any> =>   {
      const url = `mockup-generator/printfiles/${id}`
    return await client.get(url);

  }

  const getFile = async (id: string): Promise<any> => {
    
    console.log(id)
    const url = `files/${id}`
  return await client.get(url);

}

  


  const calculateShipping = async (data: PrintfulShipping): Promise<any> => {
    
    const url = `shipping/rates`;
    return await client.post(url,{body:data});
  };

  



  return { getProducts,getFile,getAllPrintOptions,getProductTemplates,getProductTemplate, createOrder, getProductInfo,createMockUpImages,calculateShipping,retrieveMockUpImages,subscribeToWebhook  };
};
