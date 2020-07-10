import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NewEstimateScreen from './src/screens/NewEstimateScreen';
import ViewEditEstimateScreen from './src/screens/ViewEditEstimateScreen';

const Stack = createStackNavigator();
  
export default function App() {
  return  <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ title: "Mesquita Hnos - Presupuestador", gestureEnabled: false }}
            >
              <Stack.Screen
                name="Home"
                component={ HomeScreen }
              />
              <Stack.Screen
                name="NewEstimate"
                component={ NewEstimateScreen }
              />
              <Stack.Screen
                name="ViewEditEstimate"
                component={ ViewEditEstimateScreen }
              />
            </Stack.Navigator>
          </NavigationContainer>;
}