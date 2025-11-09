import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Initialize TensorFlow.js for React Native early
import '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';

// Initialize TensorFlow backend
(async () => {
  try {
    await tf.ready();
    console.log('TensorFlow backend initialized in App.js');
  } catch (error) {
    console.error('Error initializing TensorFlow backend:', error);
  }
})();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




