import {useEffect, useRef} from 'react';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {IDryCleaner} from '../../../models/types';
import Database, {
  BaseDatabaseClass,
  ImagesTable,
  ServicesTable,
} from '../../../services/database';

const useDatabase = () => {
  const db = useRef<SQLiteDatabase | null>(null);

  const addDryCleanerToDB = async (dryCleaner: IDryCleaner) => {
    if (db.current) {
      await Database.addDryCleaner(db.current, dryCleaner);
    }
  };

  const deleteDryCleanerFromDB = async (id: number) => {
    if (db.current) {
      await Database.deleteDryCleaner(db.current, id);
    }
  };

  const editDryCleanerFromDB = async (updatedDryCleaner: IDryCleaner) => {
    if (db.current) {
      const deletedImages = updatedDryCleaner.images.filter(
        item => item.currentStatus === 'deleted',
      );
      if (deletedImages.length) {
        await ImagesTable.deleteItemsFromTable(db.current, deletedImages);
      }

      const deletedServices = updatedDryCleaner.services.filter(
        item => item.currentStatus === 'deleted',
      );
      if (deletedServices.length) {
        await ServicesTable.deleteItemsFromTable(db.current, deletedServices);
      }

      updatedDryCleaner.images = updatedDryCleaner.images.filter(
        ({currentStatus}) => currentStatus === 'new',
      );
      updatedDryCleaner.services = updatedDryCleaner.services.filter(
        ({currentStatus}) => currentStatus === 'new',
      );
      await Database.saveDryCleaner(db.current, updatedDryCleaner);
    }
  };

  const fetchDryCleaners = async () => {
    try {
      if (!db.current) {
        db.current = await BaseDatabaseClass.getDBConnection();
      }
      await Database.createDryCleaners(db.current);
      const storedItems = await Database.getDryCleaners(db.current);

      return storedItems;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      if (db.current) {
        db.current.close();
        db.current = null;
      }
    };
  }, []);

  return {
    addDryCleanerToDB,
    deleteDryCleanerFromDB,
    editDryCleanerFromDB,
    fetchDryCleaners,
  };
};

export default useDatabase;
