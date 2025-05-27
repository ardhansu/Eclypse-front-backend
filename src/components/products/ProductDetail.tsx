import React, { useState } from 'react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import Button from '../ui/Button';
import { Heart, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  
  const addToCart = useCartStore(state => state.addItem);
  const addToWishlist = useWishlistStore(state => state.addItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft size={16} className="mr-2" /> Back to products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="relative mb-4 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
          <p className="text-2xl mb-6">${(product.price / 100).toFixed(2)}</p>
          
          <div className="mb-8">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md"
              >
                -
              </button>
              <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button
              variant={isInWishlist(product.id) ? 'primary' : 'outline'}
              size="lg"
              onClick={handleAddToWishlist}
              className="flex items-center justify-center"
            >
              <Heart size={16} className="mr-2" />
              {isInWishlist(product.id) ? 'Saved' : 'Save'}
            </Button>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Details</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Made with premium materials</li>
                <li>Designed for comfort and style</li>
                <li>Sustainably manufactured</li>
                <li>Free shipping and returns</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Shipping & Returns</h3>
              <p className="text-gray-700">
                Free shipping on all orders. Returns accepted within 30 days of purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg"
          >
            <p className="flex items-center">
              <span className="mr-2">✓</span> Added to cart successfully!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;