import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  
  const handleBack = () => {
    navigate('/cart');
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-light mb-8">Checkout</h1>
          
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
            <ShoppingBag size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onBack={handleBack} />
          </div>
          
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;