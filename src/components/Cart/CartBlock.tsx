import React from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/formatCurrency";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";

const _CartBlock = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;

    
  }
  height: auto;
  padding: 15px 0;
  border-bottom: 2px solid white;
`;

const CartBlockItem = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
    
  }
`;
const CartBlockQuantity = styled.div`
display: flex;
  align-items: center;
  gap:9px;
  font-weight: 700;
  font-size: 1.2rem;
  /* http://res.cloudinary.com/dwutvwrw4/image/upload/v1695427762/jac_t-shirt_black-and-white-red-outline_white_1.png */
`;
const CartBlockPrice = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  font-family: Bruno;

`;
const Button = styled.button`
  border-radius: 100%;
  width: 30px;
  height: 30px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  :hover{
    opacity: 0.8;
  }

`;

const CartProductImage = styled.div`
  position: relative;
  height: 120px;
  width: 150px;
`;
const CartProductData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CartProductTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
`;

const CartProductSizeAndColor = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const CardProductPrice = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;
const CartBlockQuantityContainer = styled.div`

        display:flex;
        justify-content: space-between;
        width: 50%;
        @media screen and (max-width: 768px) {
    width: 100%;
    
  }

`


const CartBlock = () => {
  return (
    <_CartBlock>
      <CartBlockItem>
        <Button>
          <X size={20} color="white" />
        </Button>
        <CartProductImage>
          <Image
            src="http://res.cloudinary.com/dwutvwrw4/image/upload/v1695427762/jac_t-shirt_black-and-white-red-outline_white_1.png"
            alt="product"
            className="absolute"
            fill
          />
        </CartProductImage>
        <CartProductData>
          <CartProductTitle>Test PRDOCUT COOL</CartProductTitle>
          <CartProductSizeAndColor>Black / M</CartProductSizeAndColor>
          <CardProductPrice>{formatCurrency(25)}</CardProductPrice>
        </CartProductData>
          </CartBlockItem>
          <CartBlockQuantityContainer>
      <CartBlockQuantity>
        {" "}
        <Button>
          <Minus size={20} color="white" />
              </Button>
              1
        <Button>
          <Plus size={20} color="white" />
        </Button>
      </CartBlockQuantity>
              <CartBlockPrice>{formatCurrency(25)}</CartBlockPrice>
              </CartBlockQuantityContainer>
    </_CartBlock>
  );
};

export default CartBlock;
