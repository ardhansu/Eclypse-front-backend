import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-light mb-6">Our Philosophy</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Rooted in a philosophy of quiet luxury, our garments are designed to speak
              softly in cut, in movement, in presence.
            </p>
            <p className="text-gray-700 mb-8">
              At Eclypse, we believe that true luxury isn't about shouting for attention,
              but about a whispered confidence that comes from impeccable craftsmanship,
              thoughtful design, and a deep commitment to quality.
            </p>
            <p className="text-gray-700">
              Each piece is created with intention, designed to last beyond seasons and trends,
              becoming a treasured part of your evolving personal style story.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/9558763/pexels-photo-9558763.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Eclypse Philosophy"
              className="w-full h-auto rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded shadow-lg max-w-xs">
              <p className="italic text-gray-600">
                "Style is knowing who you are, what you want to say, and not giving a damn."
              </p>
              <p className="mt-2 text-gray-800 font-medium">— Gore Vidal</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;