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

const ProductCard = styled.div`
  //border: 1px solid white;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  overflow: hidden;
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

  return (
    <ProductList>
      {productsQuery.data.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id} passHref>
          <ProductCard as="a">
            <ProductImage
              src={product.imageUrl || "/path-to-placeholder-image.png"}
              alt={product.type}
            />
            <ProductDescription>
              {`${product.design} - ${product.type}`}
            </ProductDescription>
            <ProductPrice>${product.price}</ProductPrice>
          </ProductCard>
        </Link>
      ))}
    </ProductList>
  );
}
