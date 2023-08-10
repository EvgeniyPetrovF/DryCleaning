import {Asset} from 'react-native-image-picker';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import useDatabase from '../../features/Home/hooks/useDatabase';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type LocalImage = Asset & {
  id?: number;
  currentStatus: 'existed' | 'new' | 'deleted';
};

export interface IService {
  id: number;
  title: string;
  price: string;
  currentStatus: 'existed' | 'new' | 'deleted';
}

export interface IDryCleaner {
  id: number;
  name: string;
  description: string;
  services: IService[];
  images: LocalImage[];
}

export enum DBTables {
  dryCleaners = 'dryCleaners',
  images = 'images',
  services = 'services',
}

export abstract class IDBTable {
  static createTable: (db: SQLiteDatabase) => Promise<void>;

  static addItemsToTable?: (db: SQLiteDatabase, items: any) => Promise<void>;

  static saveItemsToTable?: (db: SQLiteDatabase, items: any) => Promise<void>;

  static deleteItemFromTable: (
    db: SQLiteDatabase,
    id: number,
    deleteBy?: string,
  ) => Promise<void>;

  static deleteItemsFromTable: (
    db: SQLiteDatabase,
    items: any,
    deleteBy?: string,
  ) => Promise<void>;
}

export type UseDatabaseType = ReturnType<typeof useDatabase>;
