import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/9558598/pexels-photo-9558598.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Eclypse Hero"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      </div>
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            Eclypse
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl font-light mb-8"
          >
            A silhouette worth remembering
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-lg">
              Rooted in a philosophy of quiet luxury, our garments are designed to speak
              softly in cut, in movement, in presence.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/products">
              <Button variant="primary" size="lg">
                Shop Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn more about Eclypse
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-6 right-6 text-sm text-gray-400">
        © 2025
      </div>
    </section>
  );
};

export default Hero;