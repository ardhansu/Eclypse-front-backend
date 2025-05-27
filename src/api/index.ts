import axios from 'axios';
import { Product, Order, Address } from '../types';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products/featured');
  return response.data;
};

export const placeOrder = async (
  items: { productId: string; quantity: number }[],
  shippingAddress: Address
): Promise<Order> => {
  const response = await api.post('/orders', { items, shippingAddress });
  return response.data;
};

export const getOrderStatus = async (orderId: string): Promise<Order> => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};