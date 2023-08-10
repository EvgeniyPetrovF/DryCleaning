import * as React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import SettingsScreen from '../../features/Settings/screens/SettingsScreen';
import HomeStackNavigator from '../HomeStackNavigator';

const Tab = createBottomTabNavigator();

const options: Record<string, BottomTabNavigationOptions> = {
  homeStackNavigator: {
    tabBarLabel: 'Home',
    headerShown: false,
  },
};

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={options.homeStackNavigator}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
