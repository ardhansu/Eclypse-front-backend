import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const products = [
  {
    id: '1',
    name: 'Silhouette No. 1 - Vermilion',
    price: 799900,
    description: 'A statement piece in vibrant vermilion red, designed with our signature draping technique.',
    color: 'red',
    images: ['https://images.pexels.com/photos/9558598/pexels-photo-9558598.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    category: 'outerwear',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Silhouette No. 2 - Noir',
    price: 659900,
    description: 'The essential black piece for your wardrobe, crafted with meticulous attention to detail.',
    color: 'black',
    images: ['https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    category: 'dresses',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Silhouette No. 3 - Ivory',
    price: 599900,
    description: 'Elegant simplicity in ivory, featuring our minimalist approach to luxury.',
    color: 'white',
    images: ['https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    category: 'tops',
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Silhouette No. 4 - Azure',
    price: 629900,
    description: 'A bold statement in azure blue, showcasing our contemporary approach to luxury design.',
    color: 'blue',
    images: ['https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    category: 'outerwear',
    inStock: true,
    featured: false
  },
  {
    id: '5',
    name: 'Silhouette No. 5 - Sage',
    price: 549900,
    description: 'Subtle elegance in sage green, perfect for any sophisticated wardrobe.',
    color: 'green',
    images: ['https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    category: 'tops',
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'Silhouette No. 6 - Charcoal',
    price: 729900,
    description: 'Refined simplicity in charcoal gray, embodying our commitment to timeless design.',
    color: 'gray',
    images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    category: 'pants',
    inStock: true,
    featured: false
  }
];

const orders = [];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/featured', (req, res) => {
  const featuredProducts = products.filter(product => product.featured);
  res.json(featuredProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/api/orders', (req, res) => {
  const { items, shippingAddress } = req.body;
  
  if (!items || !shippingAddress) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Calculate order total
  let total = 0;
  const orderItems = [];
  
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    
    if (!product) {
      return res.status(400).json({ error: `Product not found: ${item.productId}` });
    }
    
    total += product.price * item.quantity;
    orderItems.push({
      product,
      quantity: item.quantity
    });
  }
  
  // Add shipping and GST
  const shipping = 15000; // ₹150 shipping
  const tax = Math.round(total * 0.18); // 18% GST
  total += shipping + tax;
  
  // Create order
  const order = {
    id: `ECL${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
    items: orderItems,
    shippingAddress,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(order);
  
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});