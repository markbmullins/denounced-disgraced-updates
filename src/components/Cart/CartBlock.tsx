import React from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/formatCurrency";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { CartEntry as ICartEntry } from "use-shopping-cart/core";
import Link from "next/link";

import { useShoppingCart } from "use-shopping-cart";

interface ExpandedCartEntry extends ICartEntry {
    product_data: {
        metadata: {
            [key:string]:string
        }
    }
    
}
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
  gap: 9px;
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
  :hover {
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
  font-weight: 600;
  text-transform: capitalize;

`;

const CardProductPrice = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;
const CartBlockQuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CartBlock = ({ data  }: { data: ExpandedCartEntry  }) => {
  const cart = useShoppingCart();
  const { removeItem, setItemQuantity } = cart;
  const cartRemove = () => {
    removeItem(data?.id!);
  };

  const cartIncrease = () => {
    setItemQuantity(data?.id, data.quantity + 1);
  };

  const cartDecrease = () => {
    setItemQuantity(data.id, data.quantity - 1);
  };
  return (
    <_CartBlock>
      <CartBlockItem>
        <Button onClick={cartRemove}>
          <X size={20} color="white" />
              </Button>
              <Link href={`/product/${data.product_data?.metadata?.id}`}>
        <CartProductImage>
          <Image src={data.image!} alt="product" className="absolute" fill />
                  </CartProductImage>
                  </Link>
        <CartProductData>
          <CartProductTitle>{data.name}</CartProductTitle>
                  <CartProductSizeAndColor>
                      
            {data?.product_data?.metadata?.size} /{" "}
            {data?.product_data?.metadata?.color}
          </CartProductSizeAndColor>
          <CardProductPrice>
            {formatCurrency(data.price / 100)}
          </CardProductPrice>
        </CartProductData>
      </CartBlockItem>
      <CartBlockQuantityContainer>
        <CartBlockQuantity>
          {" "}
          <Button onClick={cartDecrease}>
            <Minus size={20} color="white" />
          </Button>
          {data.quantity}
          <Button onClick={cartIncrease}>
            <Plus size={20} color="white" />
          </Button>
        </CartBlockQuantity>
        <CartBlockPrice>
          {formatCurrency((data.price * data.quantity) / 100)}
        </CartBlockPrice>
      </CartBlockQuantityContainer>
    </_CartBlock>
  );
};

export default CartBlock;