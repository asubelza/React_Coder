import { createContext, useState } from 'react'

export const CartContext = createContext(null)

export const ShoppingCartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const getTotalQuantity = () => {
       
        return cart.reduce((total, item) => total + item.quantity, 0)
            
    }

    const addToCart = (product) => {

        const currentTotal = getTotalQuantity()
        const wouldExceedLimit = currentTotal + product.quantity > product.stock

        if (wouldExceedLimit) {
            return false
        } 

        setCart((currentCart) => {
            const existingItem = currentCart.find(item => item.id === product.id)

            if (existingItem) {
                return currentCart.map(item => 
                    item.id === product.id
                        ? {...item, quantity: item.quantity + product.quantity}
                        : item
                     
                )

            }

            return [...currentCart, {...product }]
            
        })

        return true

    }

    const removeFromCart = (productId) => {
        setCart((currentCart) => currentCart.filter(item => item.id !== productId))
    }

    // aqui me quede
    const updateQuantity = (productId, quantity) => {
        setCart((currentCart) => 
            currentCart.map((item => 
            item.id === productId
                ? {...item, quantity: Math.max(0, quantity)}
                : item
        )))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{
            cart, 
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalQuantity
        }}>
            {children}
        </CartContext.Provider>
    )


}

export default ShoppingCartProvider