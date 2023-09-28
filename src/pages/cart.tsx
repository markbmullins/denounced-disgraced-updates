import React from "react";
import styled from "styled-components";
import CartBlock from "../components/Cart/CartBlock";
import Subtotal from "../components/Cart/Subtotal";
import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";
import { Button } from "../components/styled/Button";

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

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
  font-family: Bruno;
`;

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  padding: 10px 0;
`;

const CartPage = () => {
  const cart = useShoppingCart();
  const { cartDetails, formattedTotalPrice } = cart;

  const CartItems = Object.values(cartDetails ?? {}).map(
    (entry: any, index) => <CartBlock key={index} data={entry!} />,
  );

  return (
    <CartContainer>
      <CartHeader>cart</CartHeader>
      {CartItems.length > 0 ? (
        <>
          {CartItems} <Subtotal formattedTotalPrice={formattedTotalPrice} />
          <CheckoutContainer>
            <Link href="/shipping">
              <StyledButton active>Checkout</StyledButton>
            </Link>
          </CheckoutContainer>
        </>
      ) : (
        <EmptyCartContainer>
          <h3>YOUR CART IS EMPTY!</h3>
          <Link href="/store">
            <StyledButton active>Continue Shopping</StyledButton>
          </Link>
        </EmptyCartContainer>
      )}
    </CartContainer>
  );
};

export default CartPage;
