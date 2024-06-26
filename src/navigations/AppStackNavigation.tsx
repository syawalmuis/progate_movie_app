import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomTabNavigaton from './BottomTabNavigation';
import MovieDetail from '../screens/MovieDetail';
import { Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function AppStackNavigation(): React.ReactElement {
  const navigtaion = useNavigation();
  const popToTop = StackActions.popToTop();
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTabNavigation"
        component={BottomTabNavigaton}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          headerTitle: 'Movie Detail',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable onPress={() => navigtaion.dispatch(popToTop)}>
              <Feather name="arrow-left" size={23} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default AppStackNavigation;
