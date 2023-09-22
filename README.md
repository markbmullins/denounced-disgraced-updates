Shape of products interface:


```typescript
type Product = {
  id: string;
  productLine: 'just-a-corpse';
  productType: 't-shirt' | 'hoodie' | 'tank-top' | 'long-sleeve' | 'phone-case' | 'shorts';
  artStyle: 'full-color' | 'black-and-white-red-outline' | 'black-and-white-green-outline' | 'mixed-red-outline' | 'mixed-green-outline';
  productColor: 'black' | 'white' | 'red' | 'green';
  price: number;
  imageUrl?: string[];
};
```

This shape is defined in src/server/routers/products/schema


There should be a single card on the All Products page for each unique combination of productLine + productType + style.

Then on the product details page, you should be able to choose between different productColors and sizes.

ImageURL will need to be updated to be an array of image to support the carosel on the product card.

Example of what I mean by image carosel on the product card: https://www.indiemerchstore.com/collections/t-shirt

Example of what I mean by being able to select the productColor / size on the product details page: https://www.indiemerchstore.com/products/chimaira-tior-anniversary-event-tee-t-shirt
