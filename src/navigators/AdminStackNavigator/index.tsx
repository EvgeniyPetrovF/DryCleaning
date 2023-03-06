import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../features/Home/screens/HomeScreen';
import {AdminStackParamList} from '../../models/navigation';

const Stack = createNativeStackNavigator<AdminStackParamList>();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clients" component={HomeScreen} />
      <Stack.Screen name="EditDryCleaners" component={HomeScreen} />
      <Stack.Screen name="EditServices" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
