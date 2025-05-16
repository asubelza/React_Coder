import React from 'react'
import { useContext } from 'react'
import { CartContext } from'../context/ShoppingCartContext'


const ComponenteA = () => {

  const { cart, setCart, comision } = useContext(CartContext)

  console.log(comision)

  return (
    <div>
        ComponenteA
    </div>
  )
}

export default ComponenteA