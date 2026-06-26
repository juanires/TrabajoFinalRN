import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ManageDeviceScreen from '@/src/screens/ManageDeviceScreen';
import FavoriteDeviceScreen from '../screens/FavoriteDeviceScreen';

const Stack = createNativeStackNavigator();

export default function FavoriteStackNavigator () {
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
    </Stack.Navigator>
  );
}