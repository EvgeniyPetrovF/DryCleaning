import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMMKVString} from 'react-native-mmkv';
import TextWrapper from '../../../../components/TextWrapper';
import {styles} from './styles';
import CustomButton from '../../../../components/CustomButton';
import {StorageKeys} from '../../../../models/storage';

const SettingsScreen: FC = () => {
  const [username, setUsername] = useMMKVString(StorageKeys.userName);

  const handleLogout = () => {
    setUsername('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextWrapper style={styles.username}>@{username}</TextWrapper>
      <CustomButton label={'Logout'} onPress={handleLogout} />
    </SafeAreaView>
  );
};
export default SettingsScreen;
