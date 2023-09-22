import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import styled from "styled-components";

const ProductDetails = styled.div`
  padding: 20px;
`;

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const productQuery = trpc.products.getById.useQuery({ id: id as string });

  if (productQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productQuery.error || !productQuery.data) {
    return <div>Error loading product details</div>;
  }

  const product = productQuery.data;

  return (
    <ProductDetails>
      <h1>{product.type}</h1>
      <p>Design: {product.design}</p>
      <p>Price: ${product.price}</p>
      <button>Add to Cart</button> {/* Implement functionality as required */}
    </ProductDetails>
  );
}
