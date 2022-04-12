import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail } from '../modules';
import navigationConstants from '../constants/Navigations';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navigationConstants.HOME}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={navigationConstants.HOME} component={Home} />
        <Stack.Screen name={navigationConstants.DETAILS} component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
