import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductDetail from '../components/products/ProductDetail';
import { Product } from '../types';
import { getProduct } from '../api';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        // For demo purposes, use mock data
        const mockProducts: Record<string, Product> = {
          '1': {
            id: '1',
            name: 'Silhouette No. 1 - Vermilion',
            price: 7999,
            description: 'A statement piece in vibrant vermilion red, designed with our signature draping technique. This iconic piece features carefully constructed proportions that create a striking silhouette while maintaining comfort and ease of movement. The Vermilion colorway adds a bold statement to any wardrobe, perfect for those who appreciate subtle luxury with a contemporary edge.',
            color: 'red',
            images: [
              'https://images.pexels.com/photos/9558598/pexels-photo-9558598.jpeg?auto=compress&cs=tinysrgb&w=1600',
              'https://images.pexels.com/photos/9558763/pexels-photo-9558763.jpeg?auto=compress&cs=tinysrgb&w=1600'
            ],
            category: 'outerwear',
            inStock: true,
            featured: true
          },
          '2': {
            id: '2',
            name: 'Silhouette No. 2 - Noir',
            price: 6599,
            description: 'The essential black piece for your wardrobe, crafted with meticulous attention to detail. This timeless design embodies our philosophy of quiet luxury through its refined lines and premium fabrication. The Noir colorway offers versatile styling options while maintaining the distinctive Eclypse aesthetic.',
            color: 'black',
            images: ['https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'dresses',
            inStock: true,
            featured: true
          },
          '3': {
            id: '3',
            name: 'Silhouette No. 3 - Ivory',
            price: 5999,
            description: 'Elegant simplicity in ivory, featuring our minimalist approach to luxury. This piece showcases clean lines and thoughtful proportions that create a sense of refined ease. The Ivory colorway brings a fresh lightness to the collection while maintaining the distinctive Eclypse design philosophy.',
            color: 'white',
            images: ['https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'tops',
            inStock: true,
            featured: true
          },
          '4': {
            id: '4',
            name: 'Silhouette No. 4 - Azure',
            price: 6299,
            description: 'A bold statement in azure blue, showcasing our contemporary approach to luxury design. This piece combines sculptural elements with fluid draping to create a distinctive silhouette that captures attention without overwhelming. The Azure colorway adds a refreshing dimension to the Eclypse collection.',
            color: 'blue',
            images: ['https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'outerwear',
            inStock: true,
            featured: false
          },
          '5': {
            id: '5',
            name: 'Silhouette No. 5 - Sage',
            price: 5499,
            description: 'Subtle elegance in sage green, perfect for any sophisticated wardrobe. This versatile piece embodies our commitment to creating garments that speak softly yet make a lasting impression. The Sage colorway offers a calm, natural tone that complements the clean lines of the design.',
            color: 'green',
            images: ['https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'tops',
            inStock: true,
            featured: false
          },
          '6': {
            id: '6',
            name: 'Silhouette No. 6 - Charcoal',
            price: 7299,
            description: 'Refined simplicity in charcoal gray, embodying our commitment to timeless design. This piece features carefully considered proportions and subtle details that create a distinctive presence. The Charcoal colorway offers sophisticated versatility while maintaining the quiet luxury that defines Eclypse.',
            color: 'gray',
            images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600'],
            category: 'pants',
            inStock: true,
            featured: false
          }
        };
        
        if (mockProducts[id]) {
          setProduct(mockProducts[id]);
          setLoading(false);
        } else {
          setError('Product not found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        setError('Failed to load product');
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);
  
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
  
  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 mb-4">{error || 'Product not found'}</p>
            <a href="/products" className="text-primary hover:underline">
              Back to products
            </a>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
};

export default ProductDetailPage;