import { trpc } from "../utils/trpc";
import styled from "styled-components";
import Link from "next/link";

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
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
            <ProductDescription>{product.design}</ProductDescription>
            <ProductPrice>${product.price}</ProductPrice>
          </ProductCard>
        </Link>
      ))}
    </ProductList>
  );
}
