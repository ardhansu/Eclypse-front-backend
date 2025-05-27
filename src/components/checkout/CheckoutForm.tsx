import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Address } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { placeOrder } from '../../api';
import { ArrowLeft } from 'lucide-react';

interface CheckoutFormProps {
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [address, setAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    aptNumber: '',
    state: '',
    zip: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for PIN code
    if (name === 'zip') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setAddress(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setAddress(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!address.firstName) newErrors.firstName = 'First name is required';
    if (!address.lastName) newErrors.lastName = 'Last name is required';
    if (!address.streetAddress) newErrors.streetAddress = 'Street address is required';
    if (!address.state) newErrors.state = 'State is required';
    
    if (!address.zip) {
      newErrors.zip = 'PIN code is required';
    } else if (!/^\d{6}$/.test(address.zip)) {
      newErrors.zip = 'Please enter a valid 6-digit PIN code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // For demo purposes, we'll just simulate a successful order
      setTimeout(() => {
        clearCart();
        navigate('/order-confirmation', { 
          state: { 
            orderId: 'ECL' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
            address
          } 
        });
      }, 1500);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>
      
      <h2 className="text-2xl font-medium mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              label="First Name"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
              fullWidth
            />
          </div>
          <div className="flex-1">
            <Input
              label="Last Name"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
              fullWidth
            />
          </div>
        </div>
        
        <Input
          label="Street Address"
          name="streetAddress"
          value={address.streetAddress}
          onChange={handleChange}
          error={errors.streetAddress}
          required
          fullWidth
        />
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              label="Apt Number"
              name="aptNumber"
              value={address.aptNumber}
              onChange={handleChange}
              error={errors.aptNumber}
              fullWidth
            />
          </div>
          <div className="flex-1">
            <Input
              label="State"
              name="state"
              value={address.state}
              onChange={handleChange}
              error={errors.state}
              required
              fullWidth
            />
          </div>
          <div className="flex-1">
            <Input
              label="PIN Code"
              name="zip"
              value={address.zip}
              onChange={handleChange}
              error={errors.zip}
              required
              fullWidth
              type="text"
              maxLength={6}
              pattern="\d{6}"
            />
          </div>
        </div>
        
        <div className="mt-8">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Save This Address'}
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          By placing your order, you agree to our{' '}
          <a href="#" className="underline">Privacy policy</a> and{' '}
          <a href="#" className="underline">Conditions of use</a>.
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;