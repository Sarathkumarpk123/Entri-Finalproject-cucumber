import React, { createContext, useState, useEffect } from 'react';

// Example: if userId is stored in localStorage, retrieve it here, 
// or replace with appropriate code to retrieve the logged-in user's ID.
const getUserId = () => localStorage.getItem('userId'); 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Retrieve userId when the context initializes
  const userId = getUserId();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, userId }}>
      {children}
    </CartContext.Provider>
  );
};
