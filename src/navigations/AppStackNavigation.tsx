import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomTabNavigaton from './BottomTabNavigation';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

function AppStackNavigation(): React.ReactElement {
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTabNavigation"
        component={BottomTabNavigaton}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

export default AppStackNavigation;
