import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/src/screens/HomeScreen';
import ManageDeviceScreen from '@/src/screens/ManageDeviceScreen';
import AddDeviceScreen from '@/src/screens/AddDeviceScreen';
import AddSpecificDeviceScreen from '../screens/AddSpecificDeviceScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />

      <Stack.Screen
        name="ManageDevice"
        component={ManageDeviceScreen}
      />

      <Stack.Screen
        name="AddDevice"
        component={AddDeviceScreen}
      />

       <Stack.Screen
        name="AddSpecificDevice"
        component={AddSpecificDeviceScreen}
      />
    </Stack.Navigator>
  );
}