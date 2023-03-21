import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {DBTables, IDBTable, IDryCleaner, IService} from '../../models/types';
import BaseDatabaseClass from './base';

export default class ServicesTable extends IDBTable {
  static createTable = async (db: SQLiteDatabase) => {
    const fields = `
        service_id INTEGER PRIMARY KEY AUTOINCREMENT,
        dry_cleaner_id INTEGER,
        title TEXT NOT NULL,
        price TEXT NOT NULL,
        FOREIGN KEY (dry_cleaner_id) REFERENCES ${DBTables.dryCleaners} (rowid)
    `;

    await BaseDatabaseClass.createTable(db, DBTables.services, fields);
  };

  static addItemsToTable = async (
    db: SQLiteDatabase,
    {id, services}: Pick<IDryCleaner, 'id' | 'services'>,
  ) => {
    const saveIntoFields = '(dry_cleaner_id, title, price)';
    const values = services
      .map(({title, price}) => `("${id}", "${title}", "${price}")`)
      .join(',');

    await BaseDatabaseClass.saveItemsToTable(
      db,
      DBTables.services,
      saveIntoFields,
      values,
    );
  };

  static saveItemsToTable = async (
    db: SQLiteDatabase,
    {id, services}: Pick<IDryCleaner, 'id' | 'services'>,
  ) => {
    const saveIntoFields = '(rowid, dry_cleaner_id, title, price)';
    const values = services
      .map(
        ({id: serviceId, title, price}) =>
          `(${serviceId}, "${id}", "${title}", "${price}")`,
      )
      .join(',');

    await BaseDatabaseClass.saveItemsToTable(
      db,
      DBTables.services,
      saveIntoFields,
      values,
    );
  };

  static deleteItemFromTable = async (
    db: SQLiteDatabase,
    id: number,
    deleteBy?: string,
  ) => {
    await BaseDatabaseClass.deleteOneItemFromTable(
      db,
      DBTables.services,
      id,
      deleteBy,
    );
  };

  static deleteItemsFromTable = async (
    db: SQLiteDatabase,
    services: IService[],
    deleteBy?: string,
  ) => {
    const deleteItemsIDs = services.map(({id}) => id);

    await BaseDatabaseClass.deleteItemsFromTable(
      db,
      DBTables.services,
      deleteItemsIDs,
      deleteBy,
    );
  };
}
