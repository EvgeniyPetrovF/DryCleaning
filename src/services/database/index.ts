import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enum DatabaseTableNames {
  users = 'users',
  orders = 'orders',
}

const dbName = 'dry-cleaners.db';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: dbName, location: 'default'});
};

export const createTable = async (
  db: SQLiteDatabase,
  tableName: DatabaseTableNames,
) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getItems = async <T>(
  db: SQLiteDatabase,
  tableName: DatabaseTableNames,
): Promise<T[]> => {
  try {
    const tableItems: T[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        tableItems.push(result.rows.item(index));
      }
    });
    return tableItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items');
  }
};

export const saveItemsToTable = async (
  db: SQLiteDatabase,
  tableName: DatabaseTableNames,
  items: {id: string; value: string}[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    items.map(({id, value}) => `(${id}, '${value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteItemFromTable = async (
  db: SQLiteDatabase,
  tableName: DatabaseTableNames,
  id: number,
) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (
  db: SQLiteDatabase,
  tableName: DatabaseTableNames,
) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
