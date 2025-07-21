import React, { useState, useEffect, useRef } from "react";
import { 
  FiShoppingCart, 
  FiUser, 
  FiLogOut, 
  FiSearch, 
  FiMenu, 
  FiX,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiHome,
  FiHeart
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Cart";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  
  // Refs for click outside functionality
  const cartDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.Price * item.quantity), 0);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!email);
    setUserEmail(email || "");
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/");
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/billing", { state: { cart } });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="text-white font-bold text-xl cursor-pointer hover:text-blue-200 transition-colors duration-200 flex items-center"
              onClick={() => navigate("/")}
            >
              <FiHome className="mr-2" />
              <span className="hidden sm:inline">ShopEase</span>
              <span className="sm:hidden">SE</span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-full bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Wishlist (placeholder) */}
            <button
              className="text-white hover:text-blue-200 transition-colors duration-200 relative"
              aria-label="Wishlist"
            >
              <FiHeart className="w-6 h-6" />
            </button>

            {/* Cart */}
            <div className="relative" ref={cartDropdownRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-white hover:text-blue-200 transition-colors duration-200 relative p-2"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <FiShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold animate-pulse">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 top-12 w-96 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 transform transition-all duration-200 ease-out">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 flex items-center justify-between">
                      Shopping Cart
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </h3>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="p-6 text-center">
                        <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">Your cart is empty</p>
                        <p className="text-gray-400 text-xs mt-1">Add some products to get started</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {cart.map((item) => (
                          <div
                            key={item.ID}
                            className="flex items-center justify-between p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-800 truncate text-sm">
                                {item.Name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                ${item.Price.toFixed(2)} each
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-3">
                              <button
                                onClick={() => updateQuantity(item.ID, item.quantity - 1)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className="w-3 h-3 text-gray-600" />
                              </button>
                              
                              <span className="w-8 text-center text-sm font-medium text-gray-700">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => updateQuantity(item.ID, item.quantity + 1)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
                              >
                                <FiPlus className="w-3 h-3 text-gray-600" />
                              </button>
                              
                              <button
                                onClick={() => removeFromCart(item.ID)}
                                className="p-1 text-red-500 hover:text-red-700 transition-colors duration-150 ml-2"
                                aria-label="Remove item"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-800">Total:</span>
                        <span className="font-bold text-lg text-blue-600">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Authentication */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm hidden lg:inline truncate max-w-32">
                  {userEmail}
                </span>
                <button
                  className="text-white hover:text-blue-200 flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={handleLogout}
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                className="text-white hover:text-blue-200 flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-lg transition-all duration-200"
                onClick={() => navigate("/signup")}
              >
                <FiUser className="w-4 h-4" />
                <span className="text-sm">Sign Up</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-200 p-2 rounded-lg transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-600" ref={mobileMenuRef}>
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Cart */}
            <button
              onClick={() => {
                setIsCartOpen(true);
                closeMobileMenu();
              }}
              className="flex items-center justify-between w-full text-white hover:text-blue-200 py-2 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <FiShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </div>
              {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-semibold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Wishlist */}
            <button
              className="flex items-center space-x-3 w-full text-white hover:text-blue-200 py-2 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              <FiHeart className="w-5 h-5" />
              <span>Wishlist</span>
            </button>

            {/* Mobile Auth */}
            <div className="border-t border-blue-600 pt-3">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="text-white text-sm py-1">
                    Logged in as: <span className="font-medium">{userEmail}</span>
                  </div>
                  <button
                    className="flex items-center space-x-3 w-full text-white hover:text-blue-200 py-2 transition-colors duration-200"
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center space-x-3 w-full text-white hover:text-blue-200 py-2 transition-colors duration-200"
                  onClick={() => {
                    navigate("/signup");
                    closeMobileMenu();
                  }}
                >
                  <FiUser className="w-5 h-5" />
                  <span>Sign Up</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
