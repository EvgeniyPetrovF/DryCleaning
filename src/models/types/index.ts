import {Asset} from 'react-native-image-picker';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type LocalImage = Asset & {currentStatus: 'existed' | 'new' | 'deleted'};

export interface IService {
  id: number;
  title: string;
  price: string;
  currentStatus: 'existed' | 'new' | 'deleted';
}

export interface IDryCleaner {
  id: string;
  name: string;
  description?: string;
  services: IService[];
  images: LocalImage[];
}
