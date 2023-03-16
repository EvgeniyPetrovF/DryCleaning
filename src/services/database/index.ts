import {
  deleteDatabase,
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {IDryCleaner} from '../../models/types';

export enum DatabaseTables {
  dryCleaners = 'dryCleaners',
  images = 'images',
  services = 'services',
}

const dbName = 'dry-cleaners.db';

enablePromise(true);

export class Database {
  static getDBConnection = async () => {
    return openDatabase({name: dbName, location: 'default'});
  };

  static deleteDB = async () => {
    return deleteDatabase({name: dbName, location: 'default'});
  };

  static createServicesTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${DatabaseTables.services}(
        service_id INTEGER PRIMARY KEY AUTOINCREMENT,
        dry_cleaner_id INTEGER,
        title TEXT NOT NULL,
        price TEXT NOT NULL,
        FOREIGN KEY (dry_cleaner_id) REFERENCES ${DatabaseTables.dryCleaners} (rowid)
    );`;

    await db.executeSql(query);
  };

  static createDryCleanersTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${DatabaseTables.dryCleaners}(
        name TEXT NOT NULL,
        description TEXT NOT NULL
    );`;

    await db.executeSql(query);

    await this.createServicesTable(db);
    await this.createImagesTable(db);
  };

  static createImagesTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${DatabaseTables.images}(
        image_id INTEGER PRIMARY KEY AUTOINCREMENT,
        dry_cleaner_id INTEGER,
        base64 TEXT NOT NULL,
        uri TEXT NOT NULL,
        FOREIGN KEY (dry_cleaner_id) REFERENCES ${DatabaseTables.dryCleaners} (rowid)
    );`;

    await db.executeSql(query);
  };

  static getDryCleaners = async (
    db: SQLiteDatabase,
  ): Promise<IDryCleaner[]> => {
    try {
      const tableItems: IDryCleaner[] = [];
      const resultsOverAll = await db.executeSql(
        `SELECT ${DatabaseTables.dryCleaners}.rowid as id, * 
        FROM ${DatabaseTables.dryCleaners} LEFT JOIN ${DatabaseTables.services} ON ${DatabaseTables.dryCleaners}.rowid= ${DatabaseTables.services}.dry_cleaner_id
        LEFT JOIN ${DatabaseTables.images} ON ${DatabaseTables.dryCleaners}.rowid= ${DatabaseTables.images}.dry_cleaner_id`,
      );

      resultsOverAll.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          const row = result.rows.item(index);
          const repeatedItem = tableItems.find(item => item.id === row.id);
          if (repeatedItem) {
            if (
              row.service_id &&
              !repeatedItem.services.find(item => item.id === row.service_id)
            ) {
              repeatedItem.services.push({
                id: row.service_id,
                title: row.title,
                price: row.price,
                currentStatus: 'existed',
              });
            }

            if (
              row.base64 &&
              !repeatedItem.images.find(item => item.id === row.image_id)
            ) {
              repeatedItem.images.push({
                base64: row.base64,
                id: row.image_id,
                uri: row.uri,
                currentStatus: 'existed',
              });
            }
          } else {
            tableItems.push({
              description: row.description,
              id: row.id,
              name: row.name,
              services: row.service_id
                ? [
                    {
                      id: row.service_id,
                      title: row.title,
                      price: row.price,
                      currentStatus: 'existed',
                    },
                  ]
                : [],
              images: row.base64
                ? [
                    {
                      base64: row.base64,
                      id: row.image_id,
                      uri: row.uri,
                      currentStatus: 'existed',
                    },
                  ]
                : [],
            });
          }
        }
      });

      return tableItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get items');
    }
  };

  static saveDryCleanerToTable = async (
    db: SQLiteDatabase,
    {id, name, description, services, images}: IDryCleaner,
  ) => {
    const insertQuery = `INSERT OR REPLACE INTO ${DatabaseTables.dryCleaners}(rowid, name, description) values (${id}, "${name}", "${description}")`;

    try {
      await db.executeSql(insertQuery);
    } catch (error) {
      console.log(
        'Error in Insert to dryCleaners query',
        (error as Error).message,
      );
    }

    if (images?.length) {
      const newImages = images.reduce(
        (acc: string[], {base64, uri, currentStatus}) => {
          if (currentStatus !== 'new') {
            return acc;
          }
          acc.push(`("${id}", "${base64}", "${uri}")`);
          return acc;
        },
        [],
      );

      if (newImages.length) {
        const imagesQuery = `INSERT OR REPLACE INTO ${
          DatabaseTables.images
        }(dry_cleaner_id, base64, uri) values ${newImages.join(',')}`;

        try {
          await db.executeSql(imagesQuery);
        } catch (error) {
          console.log(
            'Error in Insert to ImagesTable query: ',
            (error as Error).message,
          );
        }
      }
    }

    if (services?.length) {
      const servicesQuery = `INSERT OR REPLACE INTO ${
        DatabaseTables.services
      }(rowid, dry_cleaner_id, title, price) values ${services
        .map(
          ({id: serviceId, title, price}) =>
            `(${serviceId}, "${id}", "${title}", "${price}")`,
        )
        .join(',')}`;

      try {
        await db.executeSql(servicesQuery);
      } catch (error) {
        console.log(
          'Error in Insert to servicesTable query: ',
          (error as Error).message,
        );
      }
    }
  };

  static addDryCleanerToTable = async (
    db: SQLiteDatabase,
    {id, name, description, services, images}: IDryCleaner,
  ) => {
    const insertQuery = `INSERT OR REPLACE INTO ${DatabaseTables.dryCleaners}(name, description) values ("${name}", "${description}")`;

    await db.executeSql(insertQuery);

    if (images?.length) {
      const imagesQuery = `INSERT OR REPLACE INTO ${
        DatabaseTables.images
      }(dry_cleaner_id, base64, uri) values ${images
        .map(({base64, uri}) => `("${id}", "${base64}", "${uri}")`)
        .join(',')}`;

      await db.executeSql(imagesQuery);
    }

    if (services?.length) {
      const servicesQuery = `INSERT OR REPLACE INTO ${
        DatabaseTables.services
      }(dry_cleaner_id, title, price) values ${services
        .map(({title, price}) => `("${id}", "${title}", "${price}")`)
        .join(',')}`;

      await db.executeSql(servicesQuery);
    }
  };

  static deleteItemFromTable = async (
    db: SQLiteDatabase,
    tableName: DatabaseTables,
    id: number | string,
  ) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
  };

  static deleteDryCleanerFromTable = async (
    db: SQLiteDatabase,
    id: string | number,
  ) => {
    await this.deleteItemFromTable(db, DatabaseTables.dryCleaners, id);
    const deleteImagesQuery = `DELETE from ${DatabaseTables.images} where dry_cleaner_id = ${id}`;
    const deleteServicesQuery = `DELETE from ${DatabaseTables.services} where dry_cleaner_id = ${id}`;

    await db.executeSql(deleteImagesQuery);
    await db.executeSql(deleteServicesQuery);
  };

  static deleteImageFromTable = async (
    db: SQLiteDatabase,
    id: string | number,
  ) => {
    await this.deleteItemFromTable(db, DatabaseTables.images, id);
  };

  static deleteServiceFromTable = async (
    db: SQLiteDatabase,
    id: string | number,
  ) => {
    await this.deleteItemFromTable(db, DatabaseTables.services, id);
  };
}
