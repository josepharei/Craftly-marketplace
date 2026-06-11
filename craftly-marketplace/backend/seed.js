const { query } = require('./db');
const { v4: uuidv4 } = require('uuid');

const products = [
  {
    title: 'Minimalist Portfolio Template',
    description: 'A clean and modern portfolio template for designers and developers.',
    price: 29.99,
    category: 'Templates',
    thumbnail_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
    file_url: 'https://example.com/files/portfolio-template.zip'
  },
  {
    title: 'Abstract Vector Shapes',
    description: 'A collection of 50+ unique abstract vector shapes for your creative projects.',
    price: 15.00,
    category: 'Graphics',
    thumbnail_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400',
    file_url: 'https://example.com/files/abstract-shapes.zip'
  },
  {
    title: 'Modern Sans Serif Font',
    description: 'A versatile sans serif font family with 8 weights and italics.',
    price: 49.00,
    category: 'Fonts',
    thumbnail_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400',
    file_url: 'https://example.com/files/modern-font.zip'
  },
  {
    title: 'Instagram Post Templates',
    description: '30 customizable Instagram post templates for content creators.',
    price: 19.99,
    category: 'Templates',
    thumbnail_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400',
    file_url: 'https://example.com/files/ig-templates.zip'
  }
];

async function seed() {
  const sellerId = 'seed-seller-1';
  console.log('Seeding database...');
  // Create a seed seller if doesn't exist
  try {
    await query('INSERT INTO users (id, email, password, role, name) VALUES (?, ?, ?, ?, ?)', [sellerId, 'seller@craftly.com', 'password', 'seller', 'Craftly Official']);
  } catch (e) {
    // Ignore if exists
  }

  for (const product of products) {
    const id = uuidv4();
    try {
      await query('INSERT INTO products (id, seller_id, title, description, price, category, thumbnail_url, file_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [id, sellerId, product.title, product.description, product.price, product.category, product.thumbnail_url, product.file_url]);
    } catch (e) {
      console.error('Error seeding product:', product.title, e.message);
    }
  }
  console.log('Seeded products successfully.');
}

seed();
