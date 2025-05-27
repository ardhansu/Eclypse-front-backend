import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  // Calculate order details
  const subtotal = getTotalPrice();
  const shipping = items.length > 0 ? 200 : 0; // $2.00 shipping if cart has items
  const tax = Math.round(subtotal * 0.2); // 20% tax rate
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-light mb-8">Your Cart</h1>
          
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
            <ShoppingBag size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/products">
              <Button variant="primary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-medium">Cart Items ({items.length})</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-800">${(subtotal / 100).toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-800">${(shipping / 100).toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p className="text-gray-800">${(tax / 100).toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Total</p>
                  <p className="text-xl font-medium">${(total / 100).toFixed(2)}</p>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
                className="flex items-center justify-center"
              >
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-sm text-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;