import { trpc } from "../utils/trpc";
import styled from "styled-components";
import Link from "next/link";

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

export default function StorePage() {
  const productsQuery = trpc.products.getAll.useQuery();

  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productsQuery.error) {
    return <div>Error loading products</div>;
  }

  console.log({ data: productsQuery.data });
  return (
    <ProductList>
      {productsQuery.data.map((product) => (
        <ProductCard href={`/product/${product.id}`} key={product.id}>
          <ProductImage
            src={product.imageUrls[0] || "/path-to-placeholder-image.png"}
            alt={product.productType}
          />
          <ProductDescription>
            {`${product.productLine} - ${product.productType}`}
          </ProductDescription>
          <ProductPrice>${product.price}</ProductPrice>
        </ProductCard>
      ))}
    </ProductList>
  );
}
