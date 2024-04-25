  

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './app/screens/Home';
import {createStackNavigator} from  '@react-navigation/stack';
import Login from './app/screens/Login';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
      name="Home" 
      component={Login}
      options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Home}/>
    </Stack.Navigator>
  </NavigationContainer>
}

export default App;
