import React, { ReactNode, useState } from "react";
import { ShoppingCart } from "lucide-react";
import styled from "styled-components";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

const CartContainer = styled.div`
  display: flex;
  gap: 10px;
  font-family: Bruno;
  align-items: center;
`;

const Cart = () => {
  const cart = useShoppingCart();
  const { cartDetails } = cart;

  const CartItems = Object.values(cartDetails ?? {}).map((entry) => entry);

  return (
    <Link href="/cart">
      <CartContainer>
        <ShoppingCart />
        {CartItems.length || 0}
      </CartContainer>
    </Link>
  );
};

export default Cart;
