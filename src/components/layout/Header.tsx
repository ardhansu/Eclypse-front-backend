import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useCartStore(state => state.getTotalItems());
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Moon className="w-8 h-8" />
          {location.pathname !== '/' && (
            <span className="ml-2 text-xl font-bold">Eclypse</span>
          )}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/about"
            className="text-sm hover:text-gray-600 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/waitlist"
            className="text-sm hover:text-gray-600 transition-colors"
          >
            Waitlist
          </Link>
          <Link
            to="/cart"
            className="text-sm hover:text-gray-600 transition-colors relative"
          >
            Cart
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Link>
          <Link
            to="/products"
            className="text-sm bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Buy
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/about"
                  className="text-sm py-2 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/waitlist"
                  className="text-sm py-2 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Waitlist
                </Link>
                <Link
                  to="/cart"
                  className="text-sm py-2 border-b border-gray-100 flex justify-between items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart
                  {cartItems > 0 && (
                    <span className="bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Link>
                <Link
                  to="/products"
                  className="text-sm bg-primary text-white px-4 py-2 rounded text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Buy
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;