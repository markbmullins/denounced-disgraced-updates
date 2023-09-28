import React, { ReactNode, useState,useEffect,useRef } from "react";
import { ShoppingCart } from "lucide-react";
import styled from "styled-components";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { X } from "lucide-react";
import CartBlock from "./CartBlock";

const CartContainer = styled.div`
  display: flex;
  gap: 10px;
  font-family: Bruno;
  align-items: center;
`;


const Cart = () => {
  const [desktopCart,setDesktopCart] = useState(false)
  const cart = useShoppingCart();
  const { cartDetails } = cart;
  const desktopCartRef = useRef(null);


  



const CartItems = Object.values(cartDetails ?? {}).map(
  (entry: any, index) => <CartBlock key={index} data={entry!} inBox={true} />
);
  return (
    <Link href="/cart" >
      <CartContainer onClick={() => {setDesktopCart(true)}}  >
        <ShoppingCart />
        {CartItems.length || 0}
      </CartContainer>

    </Link>
  );
};

export default Cart;
