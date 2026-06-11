const { query } = require('./db');

async function init() {
  console.log('Initializing database tables...');
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT,
        name TEXT
      )
    `);
    
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        seller_id TEXT,
        title TEXT,
        description TEXT,
        price REAL,
        category TEXT,
        thumbnail_url TEXT,
        file_url TEXT
      )
    `);
    
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        buyer_id TEXT,
        product_id TEXT,
        amount REAL,
        status TEXT
      )
    `);
    
    console.log('Tables initialized successfully.');
  } catch (err) {
    console.error('Initialization error:', err.message);
  }
}

init();
