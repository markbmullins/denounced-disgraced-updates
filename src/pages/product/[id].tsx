import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import styled from "styled-components";
import Images from "../../components/Product/Images";
import ProductInfo from "../../components/Product/ProductInfo";
import { PrintfulProductType } from "../../server/services/printful/types";
import { createPrintfulGateway } from "../../server/services/printful/gateway";
import prisma from "../../utils/prisma/prisma";
import { Product } from "@prisma/client";
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

export default function ProductPage({ product,images }: { product: PrintfulProductType,images:Product }) {
  

  return (
    <ProductContainer>
      {/*change title later */}
      <Images product={product} imagesData={images} />
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
  const images = await prisma.product.findFirst({
    where: {
      printfulId:parseInt(id)
    },
    
  })

  

  

  return {
    props: {
      product: product,
      images:images
    },
  };
}
