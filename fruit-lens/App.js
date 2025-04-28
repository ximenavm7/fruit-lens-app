import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import FruitResultsScreen from './screens/FruitResultsScreen';
import ErrorResultsScreen from './screens/ErrorResultsScreen';
import ProcessingScreen from './screens/ProcessingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FruitResults" component={FruitResultsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ErrorResults" component={ErrorResultsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Processing" component={ProcessingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}