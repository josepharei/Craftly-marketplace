require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query } = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, role } = req.body;
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await query('INSERT INTO users (id, email, password, role, name) VALUES (?, ?, ?, ?, ?)', [id, email, hashedPassword, role || 'buyer', name]);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'User already exists or error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ message: 'Invalid credentials' });
    
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (products.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(products[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/products', authenticate, async (req, res) => {
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'Only sellers can add products' });
  
  const { title, description, price, category, thumbnail_url, file_url } = req.body;
  const id = uuidv4();
  try {
    await query('INSERT INTO products (id, seller_id, title, description, price, category, thumbnail_url, file_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, req.user.id, title, description, price, category, thumbnail_url, file_url]);
    res.status(201).json({ id, title });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Order Routes
app.post('/api/orders', authenticate, async (req, res) => {
  const { product_id, amount } = req.body;
  const id = uuidv4();
  try {
    await query('INSERT INTO orders (id, buyer_id, product_id, amount, status) VALUES (?, ?, ?, ?, ?)', [id, req.user.id, product_id, amount, 'completed']);
    res.status(201).json({ message: 'Order placed', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await query('SELECT o.*, p.title as product_title FROM orders o JOIN products p ON o.product_id = p.id WHERE o.buyer_id = ?', [req.user.id]);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders/seller-sales', authenticate, async (req, res) => {
  if (req.user.role !== 'seller') return res.status(403).json({ message: 'Access denied' });
  try {
    const orders = await query('SELECT o.*, p.title as product_title FROM orders o JOIN products p ON o.product_id = p.id WHERE p.seller_id = ?', [req.user.id]);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
