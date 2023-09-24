import React from "react";
import styled from "styled-components";
import CartBlock from "../components/Cart/CartBlock";
import Subtotal from "../components/Cart/Subtotal";
import { useShoppingCart } from "use-shopping-cart";
import { createOrder } from "../server/services/order";
import { trpc } from "../utils/trpc";

import Link from "next/link";
const CartHeader = styled.div`
  font-size: 40px;
  font-weight: bold;
  font-family: Bruno;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyCartContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-family: Bruno;
  h3 {
    @media screen and (max-width: 726px) {
      font-size: 20px;
    }
    font-size: 30px;
  }
`;

const ContinueShoppingButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: #36284c;
  border-radius: 10px;
  font-family: Bruno;
  color: white;
`;
const CheckoutContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  padding: 10px 0;
`;

const CartPage = () => {
  const cart = useShoppingCart();
  const { cartDetails, formattedTotalPrice,redirectToCheckout } = cart;
  const orderMutation = trpc.orders.stripeCheckout.useMutation();

  const CartItems = Object.values(cartDetails ?? {}).map(
    (entry: any, index) => <CartBlock key={index} data={entry!} />
  );

  const createCheckout = async () => {
      const checkoutSessionId = await orderMutation.mutateAsync({ data: cartDetails });
      if (checkoutSessionId) {
        const result = await redirectToCheckout(checkoutSessionId)

      }

  };

  return (
    <CartContainer>
      <CartHeader>cart</CartHeader>
      {/* <CartBlock /> */}
      {CartItems.length > 0 ? (
        <>
          {" "}
          {CartItems} <Subtotal formattedTotalPrice={formattedTotalPrice} />
          <CheckoutContainer>
            <ContinueShoppingButton
              onClick={() => {
                createCheckout();
              }}
            >
              Checkout
            </ContinueShoppingButton>
          </CheckoutContainer>
        </>
      ) : (
        <EmptyCartContainer>
          <h3>YOUR CART IS EMPTY!</h3>
          <Link href="/store">
            <ContinueShoppingButton>Continue Shopping</ContinueShoppingButton>
          </Link>
        </EmptyCartContainer>
      )}
    </CartContainer>
  );
};

export default CartPage;
