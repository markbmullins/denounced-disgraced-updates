import React from "react";
import styled from "styled-components";
import { ExpandedCartEntry } from "../Cart/CartBlock";
import Image from "next/image";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  CartProductImage,
  CartProductData,
  CartProductTitle,
  CartProductSizeAndColor,
  CardProductPrice,
} from "../Cart/CartBlock";
export const _CartSummaryBlock = styled.div`
  display: flex;
  align-items: center;

  height: auto;
  padding: 15px 0;
  border-bottom: 2px solid white;
`;
const CartSummaryBlock = ({ data }: { data: ExpandedCartEntry }) => {
  return (
    <_CartSummaryBlock>
      <CartProductImage>
        <Image src={data.image!} alt="product" className="absolute" fill />
      </CartProductImage>
      <CartProductData>
        <CartProductTitle>{data.name}</CartProductTitle>
        <CartProductSizeAndColor>
          {data?.product_data?.metadata?.size} /{" "}
          {data?.product_data?.metadata?.color}
        </CartProductSizeAndColor>

        <CardProductPrice>
          {formatCurrency((data.price * data.quantity) / 100)}
        </CardProductPrice>
      </CartProductData>
    </_CartSummaryBlock>
  );
};

export default CartSummaryBlock;
