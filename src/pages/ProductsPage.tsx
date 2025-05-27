import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Product } from '../types';
import { getProducts } from '../api';
import ProductCard from '../components/products/ProductCard';
import { Search, Filter } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // For demo purposes, use mock data
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
          },
          {
            id: '4',
            name: 'Silhouette No. 4 - Azure',
            price: 6299,
            description: 'A bold statement in azure blue, showcasing our contemporary approach to luxury design.',
            color: 'blue',
            images: ['https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'outerwear',
            inStock: true,
            featured: false
          },
          {
            id: '5',
            name: 'Silhouette No. 5 - Sage',
            price: 5499,
            description: 'Subtle elegance in sage green, perfect for any sophisticated wardrobe.',
            color: 'green',
            images: ['https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'tops',
            inStock: true,
            featured: false
          },
          {
            id: '6',
            name: 'Silhouette No. 6 - Charcoal',
            price: 7299,
            description: 'Refined simplicity in charcoal gray, embodying our commitment to timeless design.',
            color: 'gray',
            images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'pants',
            inStock: true,
            featured: false
          }
        ];
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load products:', error);
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops' },
    { id: 'pants', name: 'Pants' }
  ];
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-8">Shop Collection</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="flex overflow-x-auto pb-4 md:pb-0 space-x-4 mb-4 md:mb-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 mb-4">No products found</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;