import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        const existingitems = localStorage.getItem("cart");
        if (existingitems) setCart(JSON.parse(existingitems))
    }, [])

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

// CUSTOM HOOK

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }