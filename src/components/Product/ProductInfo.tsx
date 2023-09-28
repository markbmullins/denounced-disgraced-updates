import React, { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/formatCurrency";
import { X, Minus, Plus } from "lucide-react";
import { Product } from "../../server/routers/products/schema";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-toastify";
import { Button } from "../styled/Button";

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Bruno;

  @media screen and (min-width: 1000px) {
    gap: 40px;
  }
  gap: 40px;
`;

const ProductTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const ProductLine = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const ProductPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #e12d32;
`;

const ProductSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;

  :hover {
    opacity: 0.8;
  }

  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
`;

const AddToCartButton = styled.button`
  width: 300px;
  height: 50px;
  background-color: #e12d32;
  :hover {
    opacity: 0.8;
  }
  border: 1px solid #e12d32;
  border-radius: 2px;
  color: white;
  font-weight: 700;
  font-family: Bruno;
  outline: none;
`;

const ProductInfo = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState(product.productColor);
  const colors = [product.productColor];
  const sizes = ["S", "M", "L"];
  const cart = useShoppingCart();
  const { addItem, cartDetails } = cart;

  const handleAddToCart = () => {
    if (!size || !color) return toast("Please select size & color");
    addItem(
      {
        name: product.productType,
        description: "test",
        id: product.id + size + color,
        image: product.imageUrls[0],
        price: product.price * 100,

        currency: "USD",
        product_data: {
          images: product.imageUrls,
          name: product.productType,
          metadata: {
            size: size,
            color: color,
            id: product.id,
          },
        },
      },
      { count: quantity },
    );
    toast(`${product.productLine} - ${product.productType} added to cart!`);
  };

  return (
    <ProductInfoContainer>
      <ProductLine>{product.productLine}</ProductLine>
      <ProductTitle>{product.productType}</ProductTitle>
      <ProductPrice> {formatCurrency(product.price)}</ProductPrice>
      <ProductSelect>
        Color:
        <ButtonsContainer>
          {colors.map((item, index) => {
            return (
              <Button
                key={index}
                active={color === item}
                onClick={() => {
                  setColor(item);
                }}
              >
                {item}
              </Button>
            );
          })}
        </ButtonsContainer>
      </ProductSelect>
      <ProductSelect>
        Size:
        <ButtonsContainer>
          {sizes.map((item, index) => {
            return (
              <Button
                key={index}
                active={size === item}
                onClick={() => {
                  setSize(item);
                }}
              >
                {item}
              </Button>
            );
          })}
        </ButtonsContainer>
      </ProductSelect>
      <ProductSelect>
        Quantity:
        <ButtonsContainer>
          <QuantityButton
            onClick={() => {
              quantity > 1 ? setQuantity(quantity - 1) : null;
            }}
          >
            <Minus />
          </QuantityButton>
          {quantity}
          <QuantityButton
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            <Plus />
          </QuantityButton>
        </ButtonsContainer>
      </ProductSelect>
      <AddToCartButton
        onClick={() => {
          handleAddToCart();
        }}
      >
        Add To Cart
      </AddToCartButton>
    </ProductInfoContainer>
  );
};

export default ProductInfo;
