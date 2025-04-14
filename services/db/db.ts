import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";

export const openDatabase = async (db: string): Promise<SQLiteDatabase> => {
  const database = await openDatabaseAsync(db, {
    useNewConnection: true,
  });
  return database;
};

export const verifyTable = async (db: SQLiteDatabase, table: string) => {
  const result = await db.getAllAsync(`SELECT * FROM ? LIMIT 1`, [table]);
  if (result.length === 0) return false;
  return true;
};

export const deleteTable = async (db: SQLiteDatabase, table: string) => {
  await db.execAsync(`DROP TABLE IF EXISTS ${table}`);
};
