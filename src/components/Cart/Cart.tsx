import React, { ReactNode,useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import styled from 'styled-components'
import Link from 'next/link'


const CartContainer = styled.div`
    display: flex;
    gap:10px;
    font-family: Bruno;
    align-items: center;
`

const Cart = () => {
  


  return (
    <Link href='/cart'>
    <CartContainer><ShoppingCart />
      0
      </CartContainer>
      </Link>
  )
}

export default Cart