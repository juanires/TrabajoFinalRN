import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/src/screens/HomeScreen';
import ManageDeviceScreen from '@/src/screens/ManageDeviceScreen';
import AddDeviceScreen from '@/src/screens/AddDeviceScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">

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

    </Stack.Navigator>
  );
}