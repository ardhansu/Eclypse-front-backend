import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Philosophy from '../components/home/Philosophy';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <Philosophy />
    </Layout>
  );
};

export default HomePage;