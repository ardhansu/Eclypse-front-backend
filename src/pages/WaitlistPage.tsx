import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const WaitlistPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-light mb-4 text-center">Join the Waitlist</h1>
            
            {!submitted ? (
              <>
                <p className="text-gray-700 mb-8 text-center">
                  Be the first to know about our limited releases and exclusive collections.
                </p>
                
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  {error && (
                    <div className="bg-red-50 text-red-800 p-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <Input
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                    />
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Join Waitlist'}
                      </Button>
                    </div>
                  </form>
                  
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    We respect your privacy and will never share your information.
                  </p>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-2xl font-medium mb-4">Thank You!</h2>
                <p className="text-gray-700 mb-6">
                  You've been added to our waitlist. We'll notify you about our upcoming collections and exclusive releases.
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                    setName('');
                  }}
                >
                  Return to Form
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default WaitlistPage;