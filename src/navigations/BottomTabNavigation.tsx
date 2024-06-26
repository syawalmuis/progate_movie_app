import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Search from '../screens/Search';
import Favorite from '../screens/Favorite';
import HomeStackNavigation from './HomeStackNavigation';
const Tab = createBottomTabNavigator();

const BottomTabNavigaton = (): JSX.Element => (
  <>
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={28} color={color} />
          ),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name={'search'} size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  </>
);

export default BottomTabNavigaton;
