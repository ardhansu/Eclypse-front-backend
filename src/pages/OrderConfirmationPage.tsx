import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order data from location state
  const { orderId, address } = location.state || {};
  
  if (!orderId) {
    // Redirect to home if no order data
    setTimeout(() => {
      navigate('/');
    }, 3000);
    
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No order information found.</p>
            <p className="text-gray-600">Redirecting to home page...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-medium mb-2">Order Confirmed</h1>
            <p className="text-gray-600">
              Thank you for your order! We've received your purchase and are preparing it for shipment.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium mb-4">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Order Number</p>
                <p className="font-medium">{orderId}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-600">Date</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping Address</p>
                <div className="text-right">
                  <p>{address.firstName} {address.lastName}</p>
                  <p>{address.streetAddress}</p>
                  {address.aptNumber && <p>Apt {address.aptNumber}</p>}
                  <p>{address.state}, {address.zip}</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-600">Status</p>
                <p className="text-green-600">Processing</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-center mb-6">
            A confirmation email has been sent to your email address.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1">
              <Button variant="outline" fullWidth>
                Return to Home
              </Button>
            </Link>
            <Link to="/products" className="flex-1">
              <Button variant="primary" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;