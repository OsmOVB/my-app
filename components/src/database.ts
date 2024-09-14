import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('app.db');

export async function createTable() {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY NOT NULL, 
      name TEXT, 
      value REAL
    );
  `);
}

export async function insertItem(name: string, value: number) {
  const db = await dbPromise;
  await db.runAsync('INSERT INTO items (name, value) VALUES (?, ?)', [name, value]);
}

export async function getItems(): Promise<{ id: number, name: string, value: number }[]> {
  const db = await dbPromise;
  const result = await db.getAllAsync('SELECT * FROM items') as { id: number, name: string, value: number }[];
  return result;
}

export async function deleteItem(id: number) {
  const db = await dbPromise;
  await db.runAsync('DELETE FROM items WHERE id = ?', [id]);
}

export async function updateItem(id: number, name: string, value: number) {
  const db = await dbPromise;
  await db.runAsync('UPDATE items SET name = ?, value = ? WHERE id = ?', [name, value, id]);
}
