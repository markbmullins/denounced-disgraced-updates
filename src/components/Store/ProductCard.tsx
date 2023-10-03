import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { formatCurrency } from "../../utils/formatCurrency";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { PrintfulProductType } from "../../server/services/printful/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ProductCardStyle = styled.div<{ isHovered: boolean }>`
  display: flex;
  background-color: transparent;
  flex-direction: column;
  border-radius: 0.75rem;
  // border: 2px solid ${({ isHovered }) => (isHovered ? "red" : "#fff")};

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: ${({ isHovered }) => (isHovered ? "red" : "white")};
  font-family: Bruno;
  justify-items: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  /* :hover{
    opacity: 0.8;
  } */

  padding: 10px;
  @media screen and (max-width: 1300px) {
    height: 300px;
    padding: 5px;
  }
  height: 330px;

  overflow: hidden;
  grid-column: span 1;
`;

const ProductImage = styled.div<{ isHovered: boolean }>`
  width: 15rem;
  aspect-ratio: 1/1;
  margin: 0 auto;
  @media screen and (max-width: 700px) {
    width: 10rem;
  }

  position: relative;
  display: flex;
  justify-content: center;
`;

const ProductInfo = styled.div`
  height: 20%;
  width: 15rem;
  margin: 0 auto;
  @media screen and (max-width: 700px) {
    width: 10rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
  text-decoration: none;
`;

const ProductList = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

export const ProductCard = ({
  product
}: {
  product:PrintfulProductType
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variantWithLowestPrice = product.sync_variants.reduce((lowest, currentProduct) => {
    return parseFloat(currentProduct.retail_price) < parseFloat(lowest.retail_price) ? currentProduct : lowest;
  }, product.sync_variants[0]);
  
  console.log(variantWithLowestPrice.retail_price,'test')
  
  // const lowestPrice = product.snyc_variants.sort( )
  const uniqueColorImages = product.sync_variants.reduce((acc:any, variant) => {
    // If the color is not already in the accumulator, add the thumbnail
    if (!acc.some(item => item.color === variant.color)) {
        acc.push({ color: variant.color, thumbnail: variant.product.image });
    }
    return acc;
}, []);
  return (
    <Link href={`/product/${product.sync_product.id}`}>
      <ProductCardStyle
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        isHovered={isHovered}
      >
        <ProductImage isHovered={isHovered}>
        
          {uniqueColorImages.length > 1 ? (
            <Swiper
              style={{
                width: "100%",
                height: "100%",
              }}
              navigation={true}
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {uniqueColorImages.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      fill
                      priority={true}
                      src={item.thumbnail}
                      alt={product.sync_product.name}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <Image
              style={{ position: "absolute", width: "100%", height: "100%" }}
              priority={true}
              fill
              src={uniqueColorImages[0].thumbnail}
              alt={product.sync_product.name}
            />
          )}
              
          
        </ProductImage>

        <ProductInfo>
          <ProductList>
            {/* {line} {title} */}
            {product.sync_product.name}
          </ProductList>
          <ProductList>{formatCurrency(parseFloat(variantWithLowestPrice.retail_price))}</ProductList>
        </ProductInfo>
      </ProductCardStyle>
    </Link>
  );
};
