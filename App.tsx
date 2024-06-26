import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppStackNavigation from './src/navigations/AppStackNavigation';

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <AppStackNavigation />
    </NavigationContainer>
  );
}
