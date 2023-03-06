import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../../features/Settings/screens/SettingsScreen';
import AdminStackNavigator from '../AdminStackNavigator';
import OrdersScreen from '../../features/Home/screens/OrdersScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStackNavigator" component={AdminStackNavigator} />

      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
