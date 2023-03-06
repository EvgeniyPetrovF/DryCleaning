import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainNavigator from '../MainNavigator';
import LoginScreen from '../../features/Login/screens/LoginScreen';
import {useMMKVString} from 'react-native-mmkv';
import {StorageKeys} from '../../models/storage';

const Stack = createNativeStackNavigator();

const options = {
  login: {headerShown: false},
};

const AppStack = () => {
  const [username] = useMMKVString(StorageKeys.userName);

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={options.login}>
      {username ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
