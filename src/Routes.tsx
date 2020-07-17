import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import NewEstimateSetupScreen from './components/NewEstimateSetupScreen';
import ViewEditEstimateScreen from './components/ViewEditEstimateScreen';
import NewEstimateScreen from './components/NewEstimateScreen';
import NewClientScreen from './components/NewClientScreen';

const Stack = createStackNavigator();

export default function Routes() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ title: "Mesquita Hnos - Presupuestador", gestureEnabled: false }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="NewEstimateSetup"
          component={NewEstimateSetupScreen}
        />
        <Stack.Screen
          name="ViewEditEstimate"
          component={ViewEditEstimateScreen}
        />
        <Stack.Screen
          name="NewEstimate"
          component={NewEstimateScreen}
        />
        <Stack.Screen
          name="NewClient"
          component={NewClientScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}