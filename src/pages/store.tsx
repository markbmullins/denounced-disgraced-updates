import { trpc } from "../utils/trpc";
import styled from "styled-components";
import Link from "next/link";
import { Product } from "../server/routers/products/schema";

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const ProductCard = styled(Link)`
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductDescription = styled.p`
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-weight: bold;
`;

const groupProducts = (products: Product[]): Product[][] => {
  const map = products.reduce(
    (acc: Map<string, Product[]>, product: Product) => {
      const key = `${product.productLine}_${product.productType}_${product.artStyle}`;
      const group = acc.get(key) || [];
      acc.set(key, [...group, product]);
      return acc;
    },
    new Map<string, Product[]>(),
  );

  return Array.from(map.values());
};

// TODO: Implement
const ImageCarousel = styled.div``;

export default function StorePage() {
  const productsQuery = trpc.products.getAll.useQuery();

  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productsQuery.error) {
    return <div>Error loading products</div>;
  }

  return (
    <ProductList>
      {groupProducts(productsQuery.data).map((productGroup, groupIndex) => (
        <ProductCard
          href={`/product/${productGroup[0].id}`} // Navigate to the first product in the group by default
          key={groupIndex}
        >
          <ImageCarousel>
            {productGroup.map((product, productIndex) => (
              <ProductImage
                src={
                  product.imageUrls[productIndex] ||
                  "/path-to-placeholder-image.png"
                }
                alt={product.productType}
                key={productIndex}
              />
            ))}
          </ImageCarousel>
          <ProductDescription>
            {`${productGroup[0].productLine} - ${productGroup[0].productType} - ${productGroup[0].artStyle}`}
          </ProductDescription>
          <ProductPrice>${productGroup[0].price}</ProductPrice>
        </ProductCard>
      ))}
    </ProductList>
  );
}
