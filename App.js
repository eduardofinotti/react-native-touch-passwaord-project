import React  from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// import Auth from './Auth'
import Login from './src/screens/Login'
import Home from './src/screens/Home'

const Stack = createStackNavigator()

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false,
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