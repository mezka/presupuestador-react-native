import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from './components/AuthenticationScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import NewEstimateSetupScreen from './components/NewEstimateSetupScreen';
import ViewEditEstimate from './components/ViewEditEstimate';
import NewEstimateScreen from './components/NewEstimateScreen';
import ContactImporter from './components/ContactImporter';
import EditClient from './components/EditClient';
import { navigationRef } from './components/RootNavigation';

const Stack = createStackNavigator();

export default function Routes() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="NewEstimateSetup"
          component={NewEstimateSetupScreen}
        />
        <Stack.Screen
          name="NewEstimate"
          component={NewEstimateScreen}
        />
        <Stack.Screen
          name="ContactImporter"
          component={ContactImporter}
        />
        <Stack.Screen
          name="EditClient"
          component={EditClient}
        />
        <Stack.Screen
          name="ViewEditEstimate"
          component={ViewEditEstimate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}