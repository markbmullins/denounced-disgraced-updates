import { Product } from "./schema";

export const mockProducts: Product[] = [
  { id: "1", type: "T-shirt", design: "Design A", price: 20.0 },
  { id: "2", type: "Hoodie", design: "Design A", price: 40.0 },
  { id: "3", type: "Tank Top", design: "Design A", price: 18.0 },
  { id: "4", type: "Long Sleeve", design: "Design A", price: 25.0 },

  { id: "5", type: "T-shirt", design: "Design B", price: 21.0 },
  { id: "6", type: "Hoodie", design: "Design B", price: 42.0 },
  { id: "7", type: "Tank Top", design: "Design B", price: 19.0 },
  { id: "8", type: "Long Sleeve", design: "Design B", price: 26.0 },

  { id: "9", type: "T-shirt", design: "Design C", price: 22.0 },
  { id: "10", type: "Hoodie", design: "Design C", price: 43.0 },
  { id: "11", type: "Tank Top", design: "Design C", price: 20.0 },
  { id: "12", type: "Long Sleeve", design: "Design C", price: 27.0 },
];

export const fetchAllProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  return mockProducts.find((product) => product.id === id) || null;
};
