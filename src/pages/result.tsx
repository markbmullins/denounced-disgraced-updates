import React from 'react'
import styled from 'styled-components'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'
import { Loader } from 'lucide-react'
import { SpinnerDiv } from './store'
import Image from 'next/image'
import { formatCurrency } from '../utils/formatCurrency'


const Header = styled.h1`
    font-family: Bruno;
    font-size: 40px;
`

const SubHeader = styled.h2<{size:string}>`
    font-family: Bruno;
    font-size:${({size}) => size ? size : '20px'} ;
    padding-top:5px;
 

`

const Container = styled.div`
display: flex;
flex-direction: column;
gap:20px;
`

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
    min-width:350px;

`
const ImageContainer = styled.div`
    height:300px;
    position:relative;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: Bruno;
  gap: 0.75rem;

  @media (min-width: 768px) {
    flex-direction: row
  }
`;
const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const TotalPrice = styled.div`

    font-weight:bold;
    font-size:30px;
    font-family: Bruno;

`

const ResultPage = () => {

    const router = useRouter()

    const query = router.query

    const { data, isLoading, error } = trpc.orders.retrieveCheckout.useQuery({ checkoutId: query?.session_id!  as string})
    
    if (isLoading ) {
        return (
          <SpinnerDiv>
            <Loader style={{ animation: "spin 5000ms infinite linear" }} />
          </SpinnerDiv>
        );
    }    
    if (error) {
        return <div>Unexpected error occured</div>
    }

    const products = data?.items?.data.map((item:any,index) => {
        return <ProductContainer key={index}>
           {item.price?.product.images[0] ?
          <ImageContainer>
            {/*@ts-ignore */}
           
              <Image src={item.price?.product.images[0]} fill style={{position:'absolute'}} alt={item?.price?.product.name} />
        </ImageContainer>
             :null }
          <ProductInfo>
            {/*@ts-ignore */}
            <h4>{item?.price?.product.name!}</h4>
          <p>Quantity:{item.quantity}</p>
          </ProductInfo>
          <p className='font-semibold'>Total:{formatCurrency(item.amount_subtotal/100)}</p>
      </ProductContainer>
      })


  return (
      <Container>
          <div>
          <Header> Order has been placed! </Header>
              <SubHeader size='15px'>You`ll receive email confirmation soon!</SubHeader>
              </div>
          
          <SubHeader size='25px'>You purchased:</SubHeader>
          <FlexContainer>
              {products}
          </FlexContainer>
          <TotalPrice >Subtotal: {formatCurrency( data?.session?.amount_subtotal!/100) }</TotalPrice>

      </Container>
  )
}

export default ResultPage