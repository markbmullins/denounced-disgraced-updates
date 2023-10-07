import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/formatCurrency";
import { X, Minus, Plus } from "lucide-react";
import { Product } from "../../server/routers/products/schema";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-toastify";
import { Button } from "../styled/Button";
import { useAtom } from "jotai/react";
import { proudctColorsAtom } from "../../utils/jotai";
import {
  PrintfulProductType,
  SyncProductVariant,
} from "../../server/services/printful/types";

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

const ProductInfo = ({ product }: { product: PrintfulProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.sync_variants[0].size);
  const [currentVariant, setCurrentVariant] = useState<SyncProductVariant>();
  const [color, setColor] = useAtom(proudctColorsAtom);

  const cart = useShoppingCart();
  const { addItem, cartDetails } = cart;

  const sizes = product.sync_variants.reduce((acc: any, product) => {
    if (!acc.includes(product.size)) {
      acc.push(product.size);
    }
    return acc;
  }, []);

  const colors = product.sync_variants.reduce((acc: any, product) => {
    if (!acc.includes(product.color)) {
      acc.push(product.color);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (color) {
      const variant = product.sync_variants.find(
        (item) => item.size === size && item.color === color
      );
      setCurrentVariant(variant);
    }
  }, [color, size]);

  useEffect(() => {
    setColor(product.sync_variants[0].color);
  }, [product]);


  const handleAddToCart = () => {
    if (!size || !color) return toast("Please select size & color");

    addItem(
      {
        name: product.sync_product.name,
        description: "test",
        id: currentVariant?.variant_id?.toString()!,
        image: currentVariant?.product.image!,
        price: parseFloat(currentVariant?.retail_price!) * 100,

        currency: "USD",
        product_data: {
          images: [currentVariant?.product.image!],
          name: product.sync_product.name,
          metadata: {
            size: size,
            color: color,
            id: product.sync_product.id!,
            variant_id: currentVariant?.product.variant_id,
            sync_variant_id: currentVariant?.id,

            quantity: quantity,
            retail_price: currentVariant?.retail_price!,
          },
        },
      },
      { count: quantity }
    );
    toast(` ${product.sync_product.name} - added to cart!`);
  };

  return (
    <ProductInfoContainer>
      <ProductTitle>{product.sync_product.name}</ProductTitle>
      <ProductPrice>
        {" "}
        {formatCurrency(parseFloat(currentVariant?.retail_price!))}
      </ProductPrice>
      <ProductSelect>
        Color:
        <ButtonsContainer>
          {colors.map((item, index) => {
            return (
              <Button
                active={color === item}
                key={index}
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
