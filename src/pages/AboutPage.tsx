import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-light mb-8 text-center"
          >
            About Eclypse
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <img
              src="https://images.pexels.com/photos/9558763/pexels-photo-9558763.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Eclypse Brand"
              className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
            />
            
            <h2 className="text-2xl font-light mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2022, Eclypse was born from a desire to create clothing that embodies the 
              philosophy of quiet luxury. In a world of loud logos and fleeting trends, we sought 
              to create garments that speak through their cut, their movement, and their presence.
            </p>
            <p className="text-gray-700 mb-6">
              Our founder, after years in the fashion industry, became disillusioned with the emphasis 
              on conspicuous consumption and disposable fashion. Eclypse was conceived as an antidote: 
              a brand focused on thoughtful design, impeccable craftsmanship, and timeless aesthetics.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-light mb-4">Our Philosophy</h2>
            <p className="text-gray-700 mb-6">
              At Eclypse, we believe that true luxury isn't about shouting for attention, but about 
              a whispered confidence that comes from wearing something created with intention and care.
            </p>
            <p className="text-gray-700 mb-6">
              Each Eclypse piece is designed to transcend seasons and trends, becoming a treasured part 
              of your evolving personal style story. We focus on silhouette, proportion, and quality—elements 
              that speak softly but carry significant impact.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Intentional Design</h3>
                <p className="text-gray-700">
                  Every element of an Eclypse garment is considered and purposeful, from the placement 
                  of a seam to the choice of a button.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Sustainable Approach</h3>
                <p className="text-gray-700">
                  We create pieces meant to last, both in construction and design, as an antidote to 
                  disposable fashion culture.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Ethical Production</h3>
                <p className="text-gray-700">
                  We partner with skilled artisans and ethical manufacturers who share our values and 
                  commitment to excellence.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-light mb-4">Our Process</h2>
            <p className="text-gray-700 mb-6">
              Each Eclypse collection begins with a concept—an exploration of form, movement, and silhouette. 
              Our design team develops prototypes through an iterative process, refining until the garment 
              achieves our standard of quiet perfection.
            </p>
            <p className="text-gray-700">
              We source fabrics from mills known for their quality and ethical practices, prioritizing natural 
              fibers and innovative sustainable materials. Our production partners are selected for their 
              expertise and commitment to fair labor practices.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;