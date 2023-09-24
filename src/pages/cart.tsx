import React from "react";
import styled from "styled-components";
import CartBlock from "../components/Cart/CartBlock";
import Subtotal from "../components/Cart/Subtotal";
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
`

const CartPage = () => {
  const testCart = [1];
  return (
    <CartContainer>
      <CartHeader>cart</CartHeader>
      {/* <CartBlock /> */}
      {testCart.length > 0 ? (
        testCart.map((item, index) => (
          <>
            {" "}
                <CartBlock key={index} /> <Subtotal />
                <CheckoutContainer >
                <ContinueShoppingButton>Checkout</ContinueShoppingButton>

                </CheckoutContainer>
                
          </>
        ))
      ) : (
        <EmptyCartContainer>
          <h3>YOUR CART IS EMPTY!</h3>
          <ContinueShoppingButton>Continue Shopping</ContinueShoppingButton>
        </EmptyCartContainer>
      )}
    </CartContainer>
  );
};

export default CartPage;
