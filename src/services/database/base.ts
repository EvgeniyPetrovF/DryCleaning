import {
  deleteDatabase,
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {DBTables} from '../../models/types';

export const dbName = 'dry-cleaners.db';

enablePromise(true);

export default class BaseDatabaseClass {
  static getDBConnection = async () => {
    return openDatabase({name: dbName, location: 'default'});
  };

  static deleteDB = async () => {
    return deleteDatabase({name: dbName, location: 'default'});
  };

  static createTable = async (
    db: SQLiteDatabase,
    tableName: DBTables,
    fields: string,
  ) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${fields});`;

    await db.executeSql(query);
  };

  static getItems = async <T>(
    db: SQLiteDatabase,
    tableName: DBTables,
    fields = '*',
  ): Promise<T[]> => {
    try {
      const results = await db.executeSql(`SELECT ${fields} FROM ${tableName}`);

      return results[0].rows.raw();
    } catch (error) {
      console.error(error);
      throw Error('Failed to get items');
    }
  };

  static saveItemsToTable = async (
    db: SQLiteDatabase,
    tableName: DBTables,
    saveIntoValues: string,
    itemsToSave: string,
  ) => {
    const insertQuery = `INSERT OR REPLACE INTO ${tableName}${saveIntoValues} values${itemsToSave}`;

    await db.executeSql(insertQuery);
  };

  static deleteOneItemFromTable = async (
    db: SQLiteDatabase,
    tableName: DBTables,
    id: number,
    deleteBy = 'rowid',
  ) => {
    const deleteQuery = `DELETE FROM ${tableName} WHERE ${deleteBy} = ${id}`;
    await db.executeSql(deleteQuery);
  };

  static deleteItemsFromTable = async (
    db: SQLiteDatabase,
    tableName: DBTables,
    fieldValues: number[] | string[],
    deleteBy = 'rowid',
  ) => {
    const deleteQuery = `DELETE FROM ${tableName} WHERE ${deleteBy} IN (${fieldValues.join(
      ', ',
    )})`;

    await db.executeSql(deleteQuery);
  };

  static dropTable = async (db: SQLiteDatabase, tableName: DBTables) => {
    const deleteQuery = `DROP TABLE ${tableName}`;
    await db.executeSql(deleteQuery);
  };
}
