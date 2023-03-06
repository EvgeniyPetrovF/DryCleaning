import {IDryCleaner} from '../../features/Home/components/DryCleaner';

export enum UserRoles {
  admin = 'admin',
  client = 'client',
}

export type HomeStackParamList = {
  Home: undefined;
  Orders: {item: IDryCleaner; userName: string};
};

export type AdminStackParamList = {
  Clients: undefined;
  EditDryCleaners: undefined;
  EditServices: undefined;
};
