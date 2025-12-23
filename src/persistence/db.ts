import { open, type SQLiteDatabase } from 'react-native-nitro-sqlite';

const databaseName = 'CoffeeShop.db';

let db: SQLiteDatabase | null = null;

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  if (!db) {
    db = open({ name: databaseName });
    console.log('Database opened');
  }
  return db;
};

export const closeDBConnection = async () => {
  if (db) {
    db.close();
    db = null;
    console.log('Database closed');
  } else {
    console.log('No database connection to close');
  }
};
