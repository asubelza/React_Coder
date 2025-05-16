import {useContext} from 'react'
import {CartContext} from'../context/ShoppingCartContext'

const ComponenteB = () => {

    const {cart, setCart, comision} = useContext(CartContext)

    console.log(comision)

    return(
        <div>
            ComponenteB
        </div>
    )
}