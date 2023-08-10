import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {DBTables, IDryCleaner, IService, LocalImage} from '../../models/types';
import DryCleanersTable from './dryCleaners';
import ImagesTable from './images';
import ServicesTable from './services';

export default class Database {
  static createDryCleaners = async (db: SQLiteDatabase) => {
    await DryCleanersTable.createTable(db);
    await ServicesTable.createTable(db);
    await ImagesTable.createTable(db);
  };

  static addDryCleaner = async (
    db: SQLiteDatabase,
    {id, name, description, services, images}: IDryCleaner,
  ) => {
    await DryCleanersTable.saveItemsToTable(db, {id, name, description});

    if (images?.length) {
      await ImagesTable.addItemsToTable(db, {id, images});
    }

    if (services?.length) {
      await ServicesTable.addItemsToTable(db, {id, services});
    }
  };

  static saveDryCleaner = async (
    db: SQLiteDatabase,
    {id, name, description, services, images}: IDryCleaner,
  ) => {
    await DryCleanersTable.saveItemsToTable(db, {id, name, description});

    if (images?.length) {
      await ImagesTable.addItemsToTable(db, {id, images});
    }

    if (services?.length) {
      await ServicesTable.saveItemsToTable(db, {id, services});
    }
  };

  static getDryCleaners = async (
    db: SQLiteDatabase,
  ): Promise<IDryCleaner[]> => {
    try {
      const tableItems: IDryCleaner[] = [];
      const resultsOverAll = await db.executeSql(
        `SELECT ${DBTables.dryCleaners}.rowid as id, * 
        FROM ${DBTables.dryCleaners} LEFT JOIN ${DBTables.services} ON ${DBTables.dryCleaners}.rowid= ${DBTables.services}.dry_cleaner_id
        LEFT JOIN ${DBTables.images} ON ${DBTables.dryCleaners}.rowid= ${DBTables.images}.dry_cleaner_id`,
      );

      resultsOverAll[0].rows
        .raw()
        .forEach(
          ({
            description,
            id,
            name,
            service_id,
            title,
            price,
            base64,
            image_id,
            uri,
          }) => {
            const repeatedItem = tableItems.find(item => item.id === id);

            const service: IService = {
              id: service_id,
              title,
              price,
              currentStatus: 'existed',
            };
            const image: LocalImage = {
              base64,
              id: image_id,
              uri,
              currentStatus: 'existed',
            };

            if (repeatedItem) {
              if (
                service_id &&
                !repeatedItem.services.find(item => item.id === service_id)
              ) {
                repeatedItem.services.push(service);
              }

              if (
                base64 &&
                !repeatedItem.images.find(item => item.id === image_id)
              ) {
                repeatedItem.images.push({
                  base64,
                  id: image_id,
                  uri,
                  currentStatus: 'existed',
                });
              }
            } else {
              const newServices: IService[] = service_id ? [service] : [];
              const newImages: LocalImage[] = base64 ? [image] : [];

              tableItems.push({
                description,
                id,
                name,
                services: newServices,
                images: newImages,
              });
            }
          },
        );

      return tableItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get items');
    }
  };

  static deleteDryCleaner = async (db: SQLiteDatabase, id: number) => {
    await DryCleanersTable.deleteItemFromTable(db, id);
    await ImagesTable.deleteItemFromTable(db, id, 'dry_cleaner_id');
    await ServicesTable.deleteItemFromTable(db, id, 'dry_cleaner_id');
  };
}
