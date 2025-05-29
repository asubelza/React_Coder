import React, { useContext } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import ContactForm from './ContactForm'
import { toast } from 'react-toastify'
import './Cart.css'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext)

  const handleQuantityChange = (productId, quantity) => {
    const result = updateQuantity(productId, quantity)
    if (!result.success) {
      toast.error(result.message)
    }
  }

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
                {item.title} — 
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  style={{ width: '50px', margin: '0 10px' }}
                />
                = ${item.price * item.quantity}
                <button onClick={() => removeFromCart(item.id)}>🗑️</button>
              </li>
            ))}
          </ul>
          <p className="total">
            <strong>Total:</strong> $
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </p>
          <h2>Datos del comprador</h2>
          <ContactForm />
        </>
      )}
    </div>
  )
}

export default Cart
