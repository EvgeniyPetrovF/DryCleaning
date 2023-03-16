import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import CustomButton from '../../../../components/CustomButton';
import TextWrapper from '../../../../components/TextWrapper';
import {StorageKeys} from '../../../../models/storage';
import {styles} from './styles';

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
