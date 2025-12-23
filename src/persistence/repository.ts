import { getDBConnection } from './db';
import { initDB } from './initdb';

type RowLike<T> = { length: number; item: (index: number) => T } | T[];

const toArray = <T>(rows: RowLike<T> | undefined): T[] => {
  if (!rows) return [];
  if (Array.isArray(rows)) return rows;
  const items: T[] = [];
  for (let i = 0; i < rows.length; i++) {
    items.push(rows.item(i));
  }
  return items;
};

export type ProductRow = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  image_url?: string | null;
  description?: string | null;
  category_id?: string | null;
};

export type CategoryRow = {
  id: string;
  name: string;
  icon?: string | null;
};

export type CartItem = {
  product: ProductRow;
  quantity: number;
};

export type UserRow = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export async function ensureDBReady() {
  await initDB();
}

export async function isProductFavorite(productId: string): Promise<boolean> {
  await ensureDBReady();
  const db = await getDBConnection();
  const res = await db.executeAsync(
    'SELECT 1 FROM favorites WHERE product_id = ? LIMIT 1;',
    [productId],
  );
  return toArray(res.rows).length > 0;
}

export async function getUserById(id: string): Promise<UserRow | null> {
  const db = await getDBConnection();
  const res = await db.executeAsync(
    'SELECT * FROM users WHERE id = ? LIMIT 1;',
    [id],
  );
  const rows = toArray<UserRow>(res.rows);
  return rows[0] ?? null;
}

export async function findUserByCredentials(
  email: string,
  password: string,
): Promise<UserRow | null> {
  const db = await getDBConnection();
  const res = await db.executeAsync(
    'SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1;',
    [email.toLowerCase(), password],
  );
  const rows = toArray<UserRow>(res.rows);
  return rows[0] ?? null;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<UserRow> {
  const db = await getDBConnection();
  const id = `user-${Date.now()}`;
  await db.executeAsync(
    'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?);',
    [id, name, email.toLowerCase(), password],
  );
  return { id, name, email: email.toLowerCase(), password };
}

export async function getCategories(): Promise<CategoryRow[]> {
  await ensureDBReady();
  const db = await getDBConnection();
  const res = await db.executeAsync('SELECT * FROM categories ORDER BY name;');
  return toArray<CategoryRow>(res.rows);
}

export async function getProducts(): Promise<ProductRow[]> {
  await ensureDBReady();
  const db = await getDBConnection();
  const res = await db.executeAsync('SELECT * FROM products;');
  return toArray<ProductRow>(res.rows);
}

export async function getProductsFiltered(options?: {
  search?: string;
  categoryId?: string;
}): Promise<ProductRow[]> {
  await ensureDBReady();
  const db = await getDBConnection();
  const where: string[] = [];
  const params: any[] = [];

  if (options?.search?.trim()) {
    const term = `%${options.search.trim().toLowerCase()}%`;
    where.push(
      '(LOWER(title) LIKE ? OR LOWER(subtitle) LIKE ? OR LOWER(description) LIKE ?)',
    );
    params.push(term, term, term);
  }

  if (options?.categoryId && options.categoryId !== 'all') {
    where.push('category_id = ?');
    params.push(options.categoryId);
  }

  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const res = await db.executeAsync(
    `SELECT * FROM products ${clause} ORDER BY title;`,
    params,
  );
  return toArray<ProductRow>(res.rows);
}

export async function getTopRated(
  limit = 4,
  categoryId?: string,
): Promise<ProductRow[]> {
  await ensureDBReady();
  const db = await getDBConnection();
  const where: string[] = [];
  const params: any[] = [];

  if (categoryId && categoryId !== 'all') {
    where.push('category_id = ?');
    params.push(categoryId);
  }

  params.push(limit);

  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const res = await db.executeAsync(
    `SELECT * FROM products ${clause} ORDER BY title ASC LIMIT ?;`,
    params,
  );
  return toArray<ProductRow>(res.rows);
}

export async function toggleFavorite(productId: string): Promise<void> {
  await ensureDBReady();
  const db = await getDBConnection();
  const existing = await db.executeAsync(
    'SELECT id FROM favorites WHERE product_id = ? LIMIT 1;',
    [productId],
  );
  const has = toArray(existing.rows).length > 0;
  if (has) {
    await db.executeAsync('DELETE FROM favorites WHERE product_id = ?;', [
      productId,
    ]);
  } else {
    await db.executeAsync('INSERT INTO favorites (product_id) VALUES (?);', [
      productId,
    ]);
  }
}

export async function getFavorites(): Promise<ProductRow[]> {
  await ensureDBReady();
  const db = await getDBConnection();
  const res = await db.executeAsync(
    `SELECT p.* FROM favorites f
     JOIN products p ON p.id = f.product_id;`,
  );
  return toArray<ProductRow>(res.rows);
}

export async function setCartQuantity(
  productId: string,
  quantity: number,
): Promise<void> {
  await ensureDBReady();
  const db = await getDBConnection();
  if (quantity <= 0) {
    await db.executeAsync('DELETE FROM cart_items WHERE product_id = ?;', [
      productId,
    ]);
    return;
  }
  const res = await db.executeAsync(
    'SELECT id, quantity FROM cart_items WHERE product_id = ? LIMIT 1;',
    [productId],
  );
  if (toArray(res.rows).length > 0) {
    await db.executeAsync(
      'UPDATE cart_items SET quantity = ? WHERE product_id = ?;',
      [quantity, productId],
    );
  } else {
    await db.executeAsync(
      'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?);',
      [productId, quantity],
    );
  }
}

export async function incrementCartQuantity(
  productId: string,
  delta = 1,
): Promise<number> {
  await ensureDBReady();
  const db = await getDBConnection();
  const currentRes = await db.executeAsync(
    'SELECT quantity FROM cart_items WHERE product_id = ? LIMIT 1;',
    [productId],
  );
  const current =
    toArray<{ quantity: number }>(currentRes.rows)[0]?.quantity ?? 0;
  const next = Math.max(1, current + delta);

  if (current > 0) {
    await db.executeAsync(
      'UPDATE cart_items SET quantity = ? WHERE product_id = ?;',
      [next, productId],
    );
  } else {
    await db.executeAsync(
      'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?);',
      [productId, next],
    );
  }

  return next;
}

export async function getCart(): Promise<CartItem[]> {
  await ensureDBReady();
  const db = await getDBConnection();
  const res = await db.executeAsync(
    `SELECT c.quantity, p.*
     FROM cart_items c
     JOIN products p ON p.id = c.product_id;`,
  );
  const rows = toArray<{ quantity: number } & ProductRow>(res.rows);
  return rows.map(row => {
    const { quantity, ...product } = row;
    return { quantity, product };
  });
}

export async function clearCart() {
  await ensureDBReady();
  const db = await getDBConnection();
  await db.executeAsync('DELETE FROM cart_items;');
}
