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

const DesktopCartContainer = styled.div<{ desktopCart: boolean }>`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  right:${({ desktopCart }) => (desktopCart ? "120px" : "-100%")};
  top:70px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  padding:5px;
  overflow-y: scroll;
  z-index: 50;
  color:#2a2a2a;
  @media screen and (max-width: 768px) {
    display: none;
    
  }
`

const Cart = () => {
  const [desktopCart,setDesktopCart] = useState(false)
  const cart = useShoppingCart();
  const { cartDetails } = cart;
  const desktopCartRef = useRef(null);


  

// Function to handle click outside the desktopCart container
//   const handleClickOutside = (event) => {
//   console.log('are you in??')
//     if (desktopCartRef.current && !desktopCartRef.current.contains(event.target)) {
//       console.log('are you in??',desktopCart)

//     setDesktopCart(false);
//   }
// };

// // Add a click event listener when desktopCart is open
// useEffect(() => {
//   if (desktopCart) {
//     document.addEventListener('click', handleClickOutside);
//   } else {
//     document.removeEventListener('click', handleClickOutside);
//   }

//   // Clean up the event listener when the component unmounts
//   return () => {
//     document.removeEventListener('click', handleClickOutside);
//   };
// }, [desktopCart]);


const CartItems = Object.values(cartDetails ?? {}).map(
  (entry: any, index) => <CartBlock key={index} data={entry!} inBox={true} />
);
  return (
    <Link href="/cart" >
      <CartContainer onClick={() => {setDesktopCart(true)}}  >
        <ShoppingCart />
        {CartItems.length || 0}
      </CartContainer>
      {/* <DesktopCartContainer desktopCart={desktopCart} ref={desktopCartRef} >
        <X style={{ color: "#2a2a2a" }} onClick={() =>{ setDesktopCart(false)}} />

      </DesktopCartContainer> */}
    </Link>
  );
};

export default Cart;
