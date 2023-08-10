import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../features/Home/screens/HomeScreen';
import {HomeStackParamList} from '../../models/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DryCleaners" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
