import React, { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import ContactForm from './ContactForm'
import './Cart.css'

const Cart = () => {
    const { cart } = useContext(CartContext)

    return (
        <div className="cart-container">
            <h1>Carrito</h1>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.title} x {item.quantity} = ${item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p className="total">
                        <strong>Total:</strong> ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                    </p>
                    <h2>Datos del comprador</h2>
                    <ContactForm />
                </>
            )}
        </div>
    )
}

export default Cart
