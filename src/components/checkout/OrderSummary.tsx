import React from 'react';
import { useCartStore } from '../../store/cartStore';

const OrderSummary: React.FC = () => {
  const { items, getTotalPrice } = useCartStore();
  
  // Calculate order details (prices in paise, display in rupees)
  const subtotal = getTotalPrice();
  const shipping = 15000; // ₹150 shipping
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-gray-100 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-medium mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-start">
            <div>
              <p className="text-gray-800">
                {item.product.name} x {item.quantity}
              </p>
            </div>
            <p className="text-gray-800 font-medium">
              ₹{((item.product.price * item.quantity) / 100).toLocaleString('en-IN')}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-300 pt-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping and handling:</p>
          <p className="text-gray-800">₹{(shipping / 100).toLocaleString('en-IN')}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-gray-600">Before tax:</p>
          <p className="text-gray-800">₹{(subtotal / 100).toLocaleString('en-IN')}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-gray-600">GST (18%):</p>
          <p className="text-gray-800">₹{(tax / 100).toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-300 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-medium">Order Total:</p>
          <p className="text-xl font-medium">₹{(total / 100).toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      <button className="mt-8 w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;