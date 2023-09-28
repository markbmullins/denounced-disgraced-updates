import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { formatCurrency } from "../../utils/formatCurrency";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

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
  title,
  price,
  image,
  line,
  id,
}: {
  title: string;
  price: number;
  image: string[];
  line: string;
  id: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/product/${id}`}>
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
          {image.length > 1 ? (
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
              {image.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      fill
                      priority={true}
                      src={image[index]}
                      alt={title}
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
              src={image[0]!}
              alt={title}
            />
          )}
        </ProductImage>

        <ProductInfo>
          <ProductList>
            {line} {title}
          </ProductList>
          <ProductList>{formatCurrency(price)}</ProductList>
        </ProductInfo>
      </ProductCardStyle>
    </Link>
  );
};
