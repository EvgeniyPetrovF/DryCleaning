import {useState} from 'react';
import {useMMKVString} from 'react-native-mmkv';
import {StorageKeys} from '../../../models/storage';
import AuthAPI from '../../../services/API/Auth';

const useLoginForm = () => {
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [_, setUsername] = useMMKVString(StorageKeys.userName);

  const onChangeText = (text: string) => {
    setError('');
    setNickName(text);
  };

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      await AuthAPI.login({nickName});

      setUsername(nickName);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nickName,
    error,
    isLoading,
    onChangeText,
    loginHandler,
  };
};

export default useLoginForm;
