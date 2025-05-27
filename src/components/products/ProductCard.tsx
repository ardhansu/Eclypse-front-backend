import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const addToCart = useCartStore(state => state.addItem);
  const addToWishlist = useWishlistStore(state => state.addItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full ${
                isInWishlist(product.id) ? 'bg-accent text-white' : 'bg-white text-gray-800'
              } shadow-md transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100`}
            >
              <Heart size={16} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-white text-gray-800 shadow-md transition-all duration-200 hover:scale-105 opacity-0 group-hover:opacity-100"
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-1">{product.name}</h3>
        <p className="text-gray-700">${(product.price / 100).toFixed(2)}</p>
      </Link>
    </motion.div>
  );
};

export default ProductCard;