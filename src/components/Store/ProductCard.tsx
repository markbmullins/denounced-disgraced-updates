import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { formatCurrency } from "../../utils/formatCurrency";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';

export const ProductCardStyle = styled.div<{ isTransparent: boolean }>`
  display: flex;
  background-color: ${({ isTransparent }) =>
    isTransparent ? "transparent" : "#fff"};
  flex-direction: column;
  border-radius: 0.75rem;
  border: 2px#fff solid;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: ${({ isTransparent }) => (isTransparent ? "white" : "#282828")};
  font-family: Bruno;
  justify-items: center;
  transition: all 0.2s ease-in-out;
  /* :hover{
    opacity: 0.8;
  } */

  padding: 10px;
  @media screen and (max-width: 1300px) {
    height: 300px;
    padding:5px;
  }
  height: 330px;

  overflow: hidden;
  grid-column: span 1;
`;
const ProductImage = styled.div`
  width: 100%;
  height: 60%;
  @media screen and (max-width:700px) {
    height: 70%;
    
  }
  position: relative;
  display: flex;
  justify-content: center;
`;

const ProductInfo = styled.div`
  width: 100%;
  height: 40%;
  @media screen and (max-width:700px) {
    height: 30%;
    
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
  text-decoration: none;
`;
const ProductList = styled.p<{ type: string }>`
  font-size: ${({ type }) =>
    type === "line" ? "0.8rem" : type === "title" ? "1.2rem" : "1rem"};
  font-weight: bold;
  color: ${({ type }) => (type === "price" ? "green" : "")};
`;



export const ProductCardSkeleton = styled.div``;

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
  const [selectedImage, setSelectedImage] = useState(0);
  const [isTransparent, setIsTransparent] = useState(false);

  return (
    <Link href={`/product/${id}`}>
      <ProductCardStyle
        onMouseOver={() => {
          setIsTransparent(true);
        }}
        onMouseLeave={() => {
          setIsTransparent(false);
        }}
        isTransparent={isTransparent}
      >
        <ProductImage>
          {image.length > 1 ? (
                      <Swiper
                          style={{
                              width: '100%',
                              height:'100%'
                          }}
              navigation={true}
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}

              className="mySwiper"
            >
              {" "}
              {image.map((item, index) => {
                return <SwiperSlide key={index}  >
                  {" "}
                  <Image
                    
                        fill
                    priority={true}
                    
                    src={image[index]}
                    alt={title}
                  />
                </SwiperSlide>;
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
          <ProductList type={"line"}>{line}</ProductList>
          <ProductList type={"title"}>{title}</ProductList>
          <ProductList type={"price"}>{formatCurrency(price)}</ProductList>
        </ProductInfo>
      </ProductCardStyle>
    </Link>
  );
};
