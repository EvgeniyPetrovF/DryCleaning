import {UserRoles} from '../../../models/navigation';
import {wait} from '../../../utils';

export interface AuthInfo {
  nickName: string;
  role?: UserRoles;
}

class AuthAPI {
  static login = async ({nickName}: AuthInfo) => {
    const res = await wait(2000, nickName);
    return res;
  };
}

export default AuthAPI;
