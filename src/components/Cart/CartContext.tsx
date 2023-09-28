import React from "react"
import { CartProvider } from "use-shopping-cart"

const CartContext = ({ children }: { children: any }) => {
  return (
      <CartProvider
          shouldPersist={true}
          cartMode="checkout-session"

      stripe={
        "pk_test_51MddQwGCNBtLRjcZJ3HQUJJ7a6G17sS1GuOHkDYJYpUZSDqe3sPx4EALiddoWjsQzc7pbYyy8OuywMzGfcZ0olYk007S9EZOok"
      }
      currency="USD"
    >
      {children}
    </CartProvider>
  )
}

export default CartContext
