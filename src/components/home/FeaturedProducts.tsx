import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { getFeaturedProducts } from '../../api';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { ShoppingBag, Heart } from 'lucide-react';
import { useWishlistStore } from '../../store/wishlistStore';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore(state => state.addItem);
  const addToWishlist = useWishlistStore(state => state.addItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // For demo purposes, we'll use mock data instead of API call
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Silhouette No. 1 - Vermilion',
            price: 7999,
            description: 'A statement piece in vibrant vermilion red, designed with our signature draping technique.',
            color: 'red',
            images: ['https://images.pexels.com/photos/9558598/pexels-photo-9558598.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'outerwear',
            inStock: true,
            featured: true
          },
          {
            id: '2',
            name: 'Silhouette No. 2 - Noir',
            price: 6599,
            description: 'The essential black piece for your wardrobe, crafted with meticulous attention to detail.',
            color: 'black',
            images: ['https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'dresses',
            inStock: true,
            featured: true
          },
          {
            id: '3',
            name: 'Silhouette No. 3 - Ivory',
            price: 5999,
            description: 'Elegant simplicity in ivory, featuring our minimalist approach to luxury.',
            color: 'white',
            images: ['https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'tops',
            inStock: true,
            featured: true
          }
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load featured products:', error);
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };
  
  const handleAddToWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-light mb-4">Featured Collection</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our most coveted pieces, each one an expression of Eclypse's commitment to quiet luxury.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link to={`/products/${product.id}`} className="group block">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => handleAddToWishlist(product, e)}
                    className={`p-2 rounded-full ${
                      isInWishlist(product.id) ? 'bg-accent text-white' : 'bg-white text-gray-800'
                    } shadow-md transition-all duration-200 hover:scale-105`}
                  >
                    <Heart size={16} />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="p-2 rounded-full bg-white text-gray-800 shadow-md transition-all duration-200 hover:scale-105"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-1">{product.name}</h3>
              <p className="text-gray-700">${(product.price / 100).toFixed(2)}</p>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-block border-b border-primary pb-1 text-primary hover:border-gray-600 hover:text-gray-600 transition-colors"
        >
          View All Collection
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;