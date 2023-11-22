import {createContext, useState } from "react"


export const cartContext = createContext()

function CartContext(props) {
    const [cartItems, setCartItems] = useState([]);
  return (
    <cartContext.Provider   value={{ cartItems, setCartItems }}>
    {props.children}
    </cartContext.Provider>
  )
}

export default CartContext