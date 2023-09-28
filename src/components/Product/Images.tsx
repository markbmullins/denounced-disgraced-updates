import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
const ImagesContainer = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    flex-direction: column-reverse;
    width: 100%;
    height: 100%;
  }
  width: 60%;
  height: 80%;
  gap: 20px;
`;

const SideImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 850px) {
    flex-direction: row;
    width: 100%;
  }
  gap: 10px;
  width: 20%;
`;

const MainImage = styled.div<{ isTransparent: boolean }>`
  display: flex;
  aspect-ratio: 1/1;
  width: 600px;
  height: 600px;

  @media screen and (max-width: 1300px) {
    height: 500px;
    width: 500px;
  }

  @media screen and (max-width: 1100px) {
    height: 400px;
    width: 400px;
  }

  @media screen and (max-width: 850px) {
    height: 600px;
    width: 600px;
  }

  @media screen and (max-width: 620px) {
    height: calc(100vw - 10px);
    width: calc(100vw - 10px);
  }

  position: relative;
  justify-content: center;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
`;

const SideImage = styled.div<{ active: boolean }>`
  display: flex;
  border: ${({ active }) => (active ? "2px solid black" : "2px solid white")};
  min-width: 120px;
  width: 80%;
  height: 100px;
  @media screen and (max-width: 950px) {
    height: 80px;
    width: 80px;
  }
  background-color: white;
  position: relative;
  border-radius: 5px;
`;

const Images = ({ images, title }: { images: any[]; title: string }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransparent, setIsTransparent] = useState(false);

  return (
    <ImagesContainer>
      <SideImageContainer>
        {images?.map((item, index) => {
          return (
            <SideImage
              active={activeImageIndex === index}
              onClick={() => {
                setActiveImageIndex(index), setActiveImage(item);
              }}
              key={index}
            >
              <Image src={item} alt={title} fill />
            </SideImage>
          );
        })}
      </SideImageContainer>
      <MainImage
        onMouseOver={() => {
          setIsTransparent(true);
        }}
        onMouseLeave={() => {
          setIsTransparent(false);
        }}
        isTransparent={isTransparent}
      >
        <Image
          src={activeImage}
          fill
          alt={title}
          style={{ position: "absolute" }}
        />
      </MainImage>
    </ImagesContainer>
  );
};

export default Images;
