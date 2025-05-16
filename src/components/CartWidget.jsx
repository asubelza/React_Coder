import React, { useContext } from 'react'
import { Badge } from 'primereact/badge'
import { CartContext } from'../context/ShoppingCartContext'
import 'primeicons/primeicons.css'
import './CartWidget.css'
import { Link } from 'react-router-dom'

const CartWidget = () => {

    const { cart } = useContext(CartContext)

    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    const totalItems = getTotalQuantity()
    const isCartEmpty = totalItems === 0

    return (
        <Link
            to={isCartEmpty ? "#" : "/cart"}
            className={`cart-widget ${isCartEmpty ? 'disabled' : ''}`}
            onClick={(e) => isCartEmpty && e.preventDefault()}
        >
            <i className ="pi pi-shopping-cart p-overlay-badge" style = {{ fontSize: '1.5rem'}}>
                {totalItems > 0 && (
                    <Badge value = {totalItems.toString()} severity = "danger" > </Badge>                 //Agregue aqui el () despues del toString por que no me funcionaba

                )}

            </i>

        </Link>

    )
}

export default CartWidget
