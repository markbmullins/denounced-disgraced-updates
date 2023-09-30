import { createPrintfulClient } from "./client";
<<<<<<< HEAD
=======
import { PrintfulOrder,PrintfulShipping } from "./types";
>>>>>>> master

export const createPrintfulGateway = (client = createPrintfulClient()) => {
  const getProducts = async (): Promise<any> => {
    console.log("fetching products...");
    const url = `store/products`;
    return await client.get(url);
  };

<<<<<<< HEAD
  const createOrder = async (orderData: any): Promise<any> => {
    const url = `orders`;
    return await client.post(url, orderData);
  };

  const getProductInfo = async (productId: number): Promise<any> => {
    const url = `products/${productId}`;
    return await client.get(url);
  };

  return { getProducts, createOrder, getProductInfo };
=======
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

  


  const calculateShipping = async (data: PrintfulShipping): Promise<any> => {
    
    const url = `shipping/rates`;
    return await client.post(url,{body:data});
  };

  



  return { getProducts,getProductTemplates, createOrder, getProductInfo,createMockUpImages,calculateShipping,retrieveMockUpImages  };
>>>>>>> master
};
