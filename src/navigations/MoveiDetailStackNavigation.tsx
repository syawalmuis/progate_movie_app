import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

function MovieDetailStackNavigation(): React.ReactElement {
  return (
    <Stack.Navigator initialRouteName="MovieDetail">
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

export default MovieDetailStackNavigation;
