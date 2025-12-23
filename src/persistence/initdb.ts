import { getDBConnection } from './db';
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from './defaultData';

export const initDB = async () => {
  const database = await getDBConnection();

  await database.executeAsync(
    `CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT
    );`,
  );

  await database.executeAsync(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );`,
  );

  await database.executeAsync(
    `CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      item_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      total_price REAL NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );`,
  );

  await database.executeAsync(
    `CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      price REAL NOT NULL,
      image_url TEXT,
      description TEXT,
      category_id TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );`,
  );

  // Ensure category_id exists for existing installs
  try {
    await database.executeAsync(
      'ALTER TABLE products ADD COLUMN category_id TEXT;',
    );
  } catch (error) {
    // Ignore if the column already exists
  }

  await database.executeAsync(
    'CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);',
  );

  await database.executeAsync(
    `CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT UNIQUE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );`,
  );

  await database.executeAsync(
    `CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );`,
  );

  await database.executeBatchAsync(
    DEFAULT_CATEGORIES.map(category => ({
      query: 'INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?);',
      params: [category.id, category.name],
    })),
  );

  // Seed a default demo user if none exists
  const userCountRes = await database.executeAsync(
    'SELECT COUNT(*) as count FROM users;',
  );
  const userCountRow =
    // Nitro rows can be array-like with item()
    // @ts-ignore
    userCountRes.rows?.item?.(0) ?? userCountRes.rows?.[0] ?? { count: 0 };
  const userCount = Number(userCountRow.count ?? 0);

  if (userCount === 0) {
    await database.executeAsync(
      `INSERT INTO users (id, name, email, password)
       VALUES ('user-demo', 'Youssef Mrabet', 'youssef@example.com', 'password');`,
    );
  }

  await database.executeAsync(
    `UPDATE users
       SET name = 'Youssef Mrabet', email = 'youssef@example.com'
     WHERE id = 'user-demo';`,
  );

  await database.executeBatchAsync(
    DEFAULT_PRODUCTS.map(product => ({
      query:
        'INSERT OR IGNORE INTO products (id, title, subtitle, price, image_url, description, category_id) VALUES (?, ?, ?, ?, ?, ?, ?);',
      params: [
        product.id,
        product.title,
        product.subtitle ?? null,
        product.price,
        product.image_url ?? null,
        product.description ?? null,
        product.category_id ?? null,
      ],
    })),
  );

  console.log('Database initialized');
};
