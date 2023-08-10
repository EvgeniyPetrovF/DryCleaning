import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import LoginScreen from '../../features/Login/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const options: Record<string, NativeStackNavigationOptions> = {
  login: {headerShown: false},
};

const SignInStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={options.login}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default SignInStackNavigator;
