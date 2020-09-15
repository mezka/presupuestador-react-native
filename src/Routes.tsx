import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from './components/AuthenticationScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import NewEstimateSetupScreen from './components/NewEstimateSetupScreen';
import ViewEditEstimateScreen from './components/ViewEditEstimateScreen';
import NewEstimateScreen from './components/NewEstimateScreen';
import NewClientScreen from './components/NewClientScreen';
import ContactImporter from './components/ContactImporter';
import { navigationRef } from './components/RootNavigation';

const Stack = createStackNavigator();

export default function Routes() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{ title: "Mesquita Hnos - Presupuestador", gestureEnabled: false }}
      >
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
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
        <Stack.Screen
          name="ContactImporter"
          component={ContactImporter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}