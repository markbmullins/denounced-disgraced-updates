import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import styled from "styled-components";
import Images from "../../components/Product/Images";
import ProductInfo from "../../components/Product/ProductInfo";
import { Product } from "../../server/routers/products/schema";

const ProductDetails = styled.div`
  padding: 20px;
`;

const ProductContainer = styled.div`
display:flex;
@media screen and (max-width: 950px) {
  flex-direction: column;
  width: 100%;
  
};
width: 100%;
height: 100vh;
gap:20px;
margin-bottom:20px;`



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
    <ProductContainer>
      {/*change title later */}
      <Images images={product.imageUrls} title={'test'} />
      {/*@ts-ignore */}
      <ProductInfo product={product} />
    </ProductContainer>
   
  );
}
