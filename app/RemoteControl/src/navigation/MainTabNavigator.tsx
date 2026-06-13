import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FavoriteDeviceScreen from '../screens/FavoriteDeviceScreen';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          popToTopOnBlur: true,
        //   tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
                name={focused ? "home" : "home-outline"}
                size={size} 
                color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="FavoriteDevice"
        component={FavoriteDeviceScreen}
        options={{
          tabBarLabel: 'Favorite',
        //   tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
                name={focused ? "star" : "star-outline"}
                size={size} 
                color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}