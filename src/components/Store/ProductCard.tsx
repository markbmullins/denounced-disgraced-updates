import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { formatCurrency } from '../../utils/formatCurrency'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const ProductCardStyle = styled.div<{isTransparent:boolean}>`
  display: flex;
  background-color: ${({isTransparent}) => isTransparent ? 'transparent' :'#fff'} ;
  flex-direction: column;
  border-radius: 0.75rem;
  border: 2px#fff solid;

  box-shadow: 0 0 10px rgba(0,0,0,0.1); 
  color: ${({isTransparent}) => isTransparent ? 'white' :'#282828'} ;
  font-family: Bruno;
  justify-items: center;
  transition: all 0.2s ease-in-out;
  /* :hover{
    opacity: 0.8;
  } */
  
  padding: 10px;
  @media screen and (max-width: 1300px) {

    height:300px;

  }
  height:330px;

  overflow: hidden;
  grid-column: span 1;

`
const ProductImage = styled.div`
    width:100%;
    height:60%;
    position:relative;
    display:flex;
    justify-content: center;
`

const ProductInfo = styled(Link)`
    width:100%;
    height:40%;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap:10px;
    text-decoration:none;


`
const ProductList = styled.p<{type:string}>`
    font-size:${({ type }) => type === 'line' ?  '0.8rem' : type === 'title' ? '1.2rem' : '1rem'};
    font-weight: bold;
    color : ${({ type }) => type === 'price' ?  'green' : ""};
    
`

const Dot = styled.span<{ activeDot: boolean }>`
    width: 10px;
    height: 10px;
    background-color: ${({activeDot}) => activeDot ? '#C2FC30': '#B9B9B9'} ;
    border-radius: 100%;
    display: inline-block;
    margin:5px;

`
const DotContainer = styled.div`
    position: absolute;
    bottom:10px;
    width: 100%;
    display:flex;
    justify-content: center;
    `
const ChevronContainer = styled.div`
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    width: 100%;
    display:flex;
    justify-content: space-between;
    color:"#B9B9B9";
    z-index: 50;
    
`




export const ProductCardSkeleton = styled.div`
`





export const ProductCard = ({ title, price, image, line,id }: { title: string, price: number, image: string[], line: string,id:string }) => {
    
    const [selectedImage, setSelectedImage] = useState(0)
    const [isTransparent, setIsTransparent] = useState(false)
    
    
    return (
        <ProductCardStyle onMouseOver={() => {setIsTransparent(true)}} onMouseLeave={() =>{ setIsTransparent(false)}} isTransparent={isTransparent}>
            <ProductImage>
                <Image style={{ position: "absolute", width: '100%', height: "100%" }} fill src={image[selectedImage]!} alt={title} />
                
                {image.length > 1 ?
                    <>
                <DotContainer>
                    {  image.map((_, index) => <Dot key={index} activeDot={selectedImage === index} />)}
                    
                </DotContainer>
                <ChevronContainer>
                    <ChevronLeft style={{color:"black",cursor:'pointer'}} onClick={() => {if(selectedImage > 0 ){ setSelectedImage(selectedImage - 1) }}} />
                    <ChevronRight style={{color:"black",cursor:'pointer'}} onClick={() => {if(selectedImage < image.length - 1 ){ setSelectedImage(selectedImage + 1) }}} />


                </ChevronContainer></>
: null}
            </ProductImage>

            <ProductInfo href={`/product/${id}`}>
                <ProductList type={'line'}>{line}</ProductList>
                <ProductList type={'title'}>{title}</ProductList>
                <ProductList type={'price'}>{formatCurrency(price)}</ProductList>
 

            </ProductInfo>

            </ProductCardStyle>
    )

}


