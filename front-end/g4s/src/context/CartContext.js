import { createContext, useState, useEffect } from 'react';
import { getCart } from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error("Error al cargar el carrito:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, cartItemsCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
