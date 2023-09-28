import { createPrintfulClient } from "./client";

export const createPrintfulGateway = (client = createPrintfulClient()) => {
  const getProducts = async (): Promise<any> => {
    console.log("fetching products...");
    const url = `store/products`;
    return await client.get(url);
  };

  const createOrder = async (orderData: any): Promise<any> => {
    const url = `orders`;
    return await client.post(url, orderData);
  };

  const getProductInfo = async (productId: number): Promise<any> => {
    const url = `products/${productId}`;
    return await client.get(url);
  };

  return { getProducts, createOrder, getProductInfo };
};
