import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/src/screens/HomeScreen';
import ManageDeviceScreen from '@/src/screens/ManageDeviceScreen';
import AddDeviceScreen from '@/src/screens/AddDeviceScreen';
import FavoriteDeviceScreen from '../screens/FavoriteDeviceScreen';

const Stack = createNativeStackNavigator();

export default function FavoriteStackNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="FavoriteDevice"
        component={FavoriteDeviceScreen}
      />

      <Stack.Screen
        name="ManageDevice"
        component={ManageDeviceScreen}
      />

      <Stack.Screen
        name="AddDevice"
        component={AddDeviceScreen}
      />

    </Stack.Navigator>
  );
}