import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a CartContext
export const CartContext = createContext();

// CartProvider component to manage cart state
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add to cart function
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.ID === product.ID);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.ID === product.ID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.ID !== productId));
  };
  
  // Clear cart function
  const clearCart = () => {
    setCart([]);
  };

  // Update quantity function
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.ID === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Checkout function
  const checkout = () => {
    console.log("Checking out:", cart);
    setCart([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        setCart,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        checkout,
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);