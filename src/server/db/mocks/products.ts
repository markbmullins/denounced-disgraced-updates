import { Product } from "../../routers/products/schema";

export const mockProducts: Product[] = [
  { id: "1", type: "T-shirt", design: "JAC", price: 20.0 },
  { id: "2", type: "Hoodie", design: "JAC", price: 40.0 },
  { id: "3", type: "Tank Top", design: "JAC", price: 18.0 },
  { id: "4", type: "Long Sleeve", design: "JAC", price: 25.0 },

  { id: "5", type: "T-shirt", design: "Design B", price: 21.0 },
  { id: "6", type: "Hoodie", design: "Design B", price: 42.0 },
  { id: "7", type: "Tank Top", design: "Design B", price: 19.0 },
  { id: "8", type: "Long Sleeve", design: "Design B", price: 26.0 },

  { id: "9", type: "T-shirt", design: "Design C", price: 22.0 },
  { id: "10", type: "Hoodie", design: "Design C", price: 43.0 },
  { id: "11", type: "Tank Top", design: "Design C", price: 20.0 },
  { id: "12", type: "Long Sleeve", design: "Design C", price: 27.0 },
];
