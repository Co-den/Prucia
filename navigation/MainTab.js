import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import AssistantChatScreen from '../screens/AssistantChatScreen'; 


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff6f61',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'AI':
              iconName = 'chatbubbles-outline';
              break;
            case 'Cart':
              iconName = 'cart';
              break;
            case 'Account':
              iconName = 'person';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'apps';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
       <Tab.Screen name="AI" component={AssistantChatScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
     
    </Tab.Navigator>
  );
}
