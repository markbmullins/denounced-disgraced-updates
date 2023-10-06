import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import styled from "styled-components";
import Images from "../../components/Product/Images";
import ProductInfo from "../../components/Product/ProductInfo";
import { PrintfulProductType } from "../../server/services/printful/types";
import { createPrintfulGateway } from "../../server/services/printful/gateway";

const ProductContainer = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    flex-direction: column;
    width: 100%;
  }
  width: 100%;
  height: auto;
  gap: 20px;
  margin-bottom: 20px;
`;

export default function ProductPage({ product,id }: { product: PrintfulProductType,id:string }) {
  



  return (
    <ProductContainer>
      {/*change title later */}
      <Images product={product} id={id} />
      <ProductInfo product={product} />
    </ProductContainer>
  );
}


export const getServerSideProps = async (context) => {

  const id = context.params.id 
  const printful = createPrintfulGateway()

  const product = await printful.getProductInfo(id);

  if (!product) {
    return {
      redirect: {
        destination:"/404"
      }
    }
  }

  

  

  return {
    props: {
      product: product,
      id:id
    },
  };
}
