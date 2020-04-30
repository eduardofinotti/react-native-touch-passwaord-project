import React  from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Onboarding from './src/screens/Onboarding'

const Stack = createStackNavigator()

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} 
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
        <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false,
            animationEnabled: false
          }}
        />
        <Stack.Screen name="Home" component={Home} 
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}