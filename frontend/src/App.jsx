import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CartProvider, CartContext } from "./components/Cart";
import Navbar from "./components/Navbar";
import ProductCatalog from "./components/ProductCatalog";
import SignupPage from "./components/signup";
import BillingPage from "./components/Billing";

const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart, setCart } = useContext(CartContext); // Use the cart context

  // Function to handle successful billing
  const handleBillingSuccess = () => {
    alert("Payment Successful! Redirecting to Home...");
    clearCart(); // Clear the cart after successful payment
    navigate("/"); // Redirect to the home page
  };

  // Fetch products from the real API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Assuming data.products contains the product list
        setProducts(data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* Render the Navbar unless on the signup page */}
      {location.pathname !== "/signup" && (
        <Navbar
          onSearch={setSearchQuery}
          cart={cart} // Pass the cart to Navbar
          setCart={setCart} // Pass setCart for cart updates
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <ProductCatalog
              searchQuery={searchQuery}
              cart={cart}
              setCart={setCart} // Allow adding/removing items to/from cart
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/billing"
          element={
            <BillingPage
              cart={cart} // Pass cart to BillingPage
              clearCart={clearCart} // Pass clearCart to clear the cart after payment
              onBillingSuccess={handleBillingSuccess} // Handle successful payment
            />
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
};

export default App;
