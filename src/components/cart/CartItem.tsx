import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  return (
    <div className="flex items-start border-b border-gray-200 py-4">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <button
            onClick={() => removeItem(product.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-gray-500 text-xs mb-2">{product.color}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-2 py-1 text-gray-500 hover:text-gray-700"
            >
              -
            </button>
            <span className="px-2 py-1">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-2 py-1 text-gray-500 hover:text-gray-700"
            >
              +
            </button>
          </div>
          
          <p className="font-medium">
            ${((product.price * quantity) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;