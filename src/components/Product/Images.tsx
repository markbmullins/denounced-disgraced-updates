import React,{useState} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
const ImagesContainer = styled.div`
    display: flex;
    @media screen and (max-width:950px) {
        flex-direction: column-reverse;
        width: 100%;
        
    }
    width: 60%;
    height: 80%;
    gap:20px;

`

const SideImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
    width: 20%;

`

const MainImage = styled.div<{ isTransparent: boolean }>`
    display: flex;
    width: 70%;
    height: 70%;
    @media screen and (max-width:950px) {
        width: 100%;
        
        
    }
    position: relative;
    justify-content: center;
    border-radius: 5px;
    transition: all 0.3 ease-in-out;



`

const SideImage = styled.div<{active:boolean}>`
    display: flex;
    border:${({active}) => active ? '2px solid black' : '2px solid white'};
    width: 80%;
    height: 120px;
    @media screen and (max-width:950px) {
        height: 80px;
        
    }
    background-color: white;
    position: relative;
    border-radius: 5px;
`






const Images = ({images,title}:{images:any[],title:string}) => {

    const [activeImage, setActiveImage] = useState(images[0])
    const [activeImageIndex,setActiveImageIndex] = useState(0)
    const [isTransparent,setIsTransparent] = useState(false)



  return (
      <ImagesContainer>
          <SideImageContainer>
              {images?.map((item, index) => {
                  return <SideImage active={activeImageIndex === index} onClick={() => { setActiveImageIndex(index), setActiveImage(item) } } key={index}>
                  <Image src={item}  alt={title} fill />
    
                  </SideImage> 
              })}
             
              
          </SideImageContainer>
          <MainImage onMouseOver={() => {setIsTransparent(true)}} onMouseLeave={() => { setIsTransparent(false)}} isTransparent={isTransparent}>
                <Image src={activeImage} fill alt={title} style={{position:"absolute"}} />
              

          </MainImage>
         

    </ImagesContainer>
  )
}

export default Images