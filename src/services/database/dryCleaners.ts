import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {DBTables, IDBTable, IDryCleaner} from '../../models/types';
import BaseDatabaseClass from './base';

export default class DryCleanersTable extends IDBTable {
  static createTable = async (db: SQLiteDatabase) => {
    const fields = `
        name TEXT NOT NULL,
        description TEXT NOT NULL
    `;

    await BaseDatabaseClass.createTable(db, DBTables.dryCleaners, fields);
  };

  static saveItemsToTable = async (
    db: SQLiteDatabase,
    {id, name, description}: Pick<IDryCleaner, 'id' | 'name' | 'description'>,
  ) => {
    const saveIntoFields = '(rowid, name, description)';
    const saveValues = `(${id}, "${name}", "${description}")`;

    await BaseDatabaseClass.saveItemsToTable(
      db,
      DBTables.dryCleaners,
      saveIntoFields,
      saveValues,
    );
  };

  static deleteItemFromTable = async (
    db: SQLiteDatabase,
    id: number,
    deleteBy?: string,
  ) => {
    await BaseDatabaseClass.deleteOneItemFromTable(
      db,
      DBTables.dryCleaners,
      id,
      deleteBy,
    );
  };

  static deleteItemsFromTable = async (
    db: SQLiteDatabase,
    dryCleaners: IDryCleaner[],
    deleteBy?: string,
  ) => {
    const deleteItems = dryCleaners.map(({id}) => id);

    await BaseDatabaseClass.deleteItemsFromTable(
      db,
      DBTables.dryCleaners,
      deleteItems,
      deleteBy,
    );
  };
}
