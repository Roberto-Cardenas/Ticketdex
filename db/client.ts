import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

export const expoDb = openDatabaseSync("db.db");
export const db = drizzle(expoDb);

export function initDB() {
  return useMigrations(db, migrations);
}
