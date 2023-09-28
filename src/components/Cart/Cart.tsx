import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import styled from "styled-components";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import CartBlock from "./CartBlock";

const CartContainer = styled.div`
  display: flex;
  gap: 10px;
  font-family: Bruno;
  align-items: center;
`;

const Cart = () => {
  const [_, setDesktopCart] = useState(false);
  const { cartDetails } = useShoppingCart();

  const cartItems = Object.values(cartDetails ?? {}).map(
    (entry: any, index) => <CartBlock key={index} data={entry!} />,
  );

  return (
    <Link href="/cart">
      <CartContainer
        onClick={() => {
          setDesktopCart(true);
        }}
      >
        <ShoppingCart />
        {cartItems.length || 0}
      </CartContainer>
    </Link>
  );
};

export default Cart;
