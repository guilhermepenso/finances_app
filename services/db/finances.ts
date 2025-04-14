import { SQLiteDatabase } from "expo-sqlite";

// Criação da tabela finances
export const createFinancesTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS finances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item TEXT NOT NULL,
      type TEXT NOT NULL,
      origin TEXT NOT NULL,
      payment TEXT NOT NULL,
      parcels INTEGER NOT NULL,
      value REAL NOT NULL,
      date TEXT NOT NULL
    );
  `);
};

export const insertFinance = async (
  db: SQLiteDatabase,
  finance: {
    item: string;
    type: string;
    origin: string;
    payment: string;
    parcels: number;
    value: number;
    date: string;
  }
) => {
  await db.runAsync(
    `
    INSERT INTO finances (
        item, 
        type, 
        origin, 
        payment, 
        parcels,
        value, 
        date)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `,
    [
      finance.item,
      finance.type,
      finance.origin,
      finance.payment,
      finance.parcels,
      finance.value,
      finance.date,
    ]
  );
};

export const deleteFinance = async (db: SQLiteDatabase, id: number) => {
  await db.runAsync(`DELETE FROM finances WHERE id = ?;`, [id]);
};

export const getFinancesByMonth = async (
  db: SQLiteDatabase,
  month: number,
  year: number
) => {
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = `${year}-${String(month).padStart(2, "0")}-31`;

  const results = await db.getAllAsync(
    `
    SELECT * FROM finances
    WHERE date BETWEEN ? AND ?;
  `,
    [startDate, endDate]
  );

  return results;
};

export const getFinancesByType = async (db: SQLiteDatabase, type: string) => {
  const results = await db.getAllAsync(
    `
    SELECT * FROM finances
    WHERE type = ?;
  `,
    [type]
  );

  return results;
};
