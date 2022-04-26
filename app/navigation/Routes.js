import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import navigationConstants from '../constants/Navigations';
import { Detail, Home } from '../modules';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={navigationConstants.DETAILS}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={navigationConstants.HOME} component={Home} />
        <Stack.Screen name={navigationConstants.DETAILS} component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
