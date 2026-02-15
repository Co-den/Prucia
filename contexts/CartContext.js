import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === product.id);
      if (itemExists) {
        return prevItems.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + product.quantity }
            : i
        );
      }
      return [...prevItems, product];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== productId));
  };

  const saveForLater = (product) => {
    setCartItems((prev) => prev.filter((i) => i.id !== product.id));
    setSavedItems((prev) => [...prev, product]);
  };

  const moveToCart = (product) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== product.id));
    setCartItems((prev) => [...prev, product]);
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, savedItems, saveForLater, moveToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
