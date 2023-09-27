import React from 'react';
import {useMMKVString} from 'react-native-mmkv';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {StorageKeys} from '../../models/storage';
import MainNavigator from '../MainNavigator';
import LoginStackNavigator from '../SignInStackNavigator';

const Stack = createNativeStackNavigator();

const options: Record<string, NativeStackNavigationOptions> = {
  login: {headerShown: false},
};

const AppStack = () => {
  const [username] = useMMKVString(StorageKeys.userName);

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={options.login}>
      {username ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen
          name="LoginStackNavigator"
          component={LoginStackNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
