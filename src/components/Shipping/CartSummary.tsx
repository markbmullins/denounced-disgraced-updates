import React from "react";
import styled from "styled-components";
import { useShoppingCart } from "use-shopping-cart";
import CartSummaryBlock from "./CartSummaryBlock";

const OrderSummaryContainer = styled.div`
    width: 100%;

  max-height: 600px;
  border-radius: 10px;
  border: 1px solid white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 950px) {
    width: 100%;
    height: auto;
  }
`;

const OrderSummaryHeader = styled.h3`
  font-size: 30px;
  font-family: Bruno;
  font-weight: bold;
`;

const OrderFooter = styled.div`
  width: 100%;
  height: 30%;
`;

const OrderFooterLi = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-family: Bruno;
  font-weight: bold;
  padding: 10px 0;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-family: Bruno;
  font-weight: bold;
  padding: 10px 0;
  border-top: 2px solid white;
`;

const CartBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const CartSummary = () => {
  const { cartDetails, formattedTotalPrice } = useShoppingCart();

  const CartItems = Object.values(cartDetails ?? {}).map(
    (entry: any, index) => <CartSummaryBlock key={index} data={entry!} />,
  );

  return (
    <OrderSummaryContainer id="ordersummary">
      <OrderSummaryHeader>Cart Summary</OrderSummaryHeader>
      <CartBlockContainer>{CartItems}</CartBlockContainer>
      <OrderFooter>
        <OrderFooterLi>
          <p>SubTotal</p>
          <p>{formattedTotalPrice}</p>
        </OrderFooterLi>
        <OrderFooterLi>
          <p>Shipping</p>
          <p>Pending</p>
        </OrderFooterLi>
        <OrderFooterLi>
          <p>Tax</p>
          <p>Pending</p>
        </OrderFooterLi>
        <OrderTotal>
          <p>Total</p>
          <p>{formattedTotalPrice}</p>
        </OrderTotal>
      </OrderFooter>
    </OrderSummaryContainer>
  );
};

export default CartSummary;
