export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  images: string[];
  category: string;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptNumber?: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: Address;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}