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

export async function createTablePet() {
  const db = await dbPromise;
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS pets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                image TEXT NOT NULL,
                hunger INTEGER DEFAULT 50,
                sleep INTEGER DEFAULT 50,
                fun INTEGER DEFAULT 50,
                status TEXT DEFAULT 'Normal'
            );`
    );
}

export const insertPet = async (name: string, image: string) => {
  const db = await dbPromise;
  await db.runAsync('INSERT INTO pets (name, image) VALUES (?, ?)', [name, image]);
};

export const fetchPets = async () => {
  const db = await dbPromise;
  const result = await db.getAllAsync('SELECT * FROM pets') as { name: string, image: string, hunger: number, sleep: number, fun: number, status: string }[];
  return result;
};

export const createTableUser = async () => {
  const db = await dbPromise;
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            );`
    );
}

export const insertUser = async (username: string, email: string, password: string) => {
  const db = await dbPromise;
  await db.runAsync('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
};

export const fetchUser = async (email: string, password: string) => {
  const db = await dbPromise;
  const result = await db.getFirstAsync('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]) as { id: number, username: string, email: string, password: string };
  return result;
};

export const updateUser = async (id: number, username: string, email: string, password: string) => {
  const db = await dbPromise;
  await db.runAsync('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, id]);
};

export const retrieveUser = async (id: number) => {
  const db = await dbPromise;
  const result = await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [id]) as { id: number, username: string, email: string, password: string };
  return result;
};

export const updatePassword = async (id: number, password: string) => {
  const db = await dbPromise;
  await db.runAsync('UPDATE users SET password = ? WHERE id = ?', [password, id]);
}