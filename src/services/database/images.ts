import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {DBTables, IDBTable, IDryCleaner, LocalImage} from '../../models/types';
import BaseDatabaseClass from './base';

export default class ImagesTable extends IDBTable {
  static createTable = async (db: SQLiteDatabase) => {
    const fields = `
        image_id INTEGER PRIMARY KEY AUTOINCREMENT,
        dry_cleaner_id INTEGER,
        base64 TEXT NOT NULL,
        uri TEXT NOT NULL,
        FOREIGN KEY (dry_cleaner_id) REFERENCES ${DBTables.dryCleaners} (rowid)`;

    await BaseDatabaseClass.createTable(db, DBTables.images, fields);
  };

  static addItemsToTable = async (
    db: SQLiteDatabase,
    {id, images}: Pick<IDryCleaner, 'id' | 'images'>,
  ) => {
    const saveIntoFields = '(dry_cleaner_id, base64, uri)';
    const values = images
      .map(({base64, uri}) => `("${id}", "${base64}", "${uri}")`)
      .join(',');

    await BaseDatabaseClass.saveItemsToTable(
      db,
      DBTables.images,
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
      DBTables.images,
      id,
      deleteBy,
    );
  };

  static deleteItemsFromTable = async (
    db: SQLiteDatabase,
    images: LocalImage[],
    deleteBy?: string,
  ) => {
    const deleteItemsIDs = images.map(({id}) => id! as number);

    await BaseDatabaseClass.deleteItemsFromTable(
      db,
      DBTables.images,
      deleteItemsIDs,
      deleteBy,
    );
  };
}
