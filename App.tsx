import { NavigationContainer, useNavigation , NavigationProp} from '@react-navigation/native';
import React from 'react';
import Home from './app/screens/Home';
import {createStackNavigator} from  '@react-navigation/stack';
import Login from './app/screens/Login';
import ProductDetails,{
  Params as ProductDetailsParams,
} from './app/screens/ProductDetails';
import ProductAdd from './app/screens/ProductAdd';
import { Button } from 'react-native';
import MovimientosScreen ,{Params as MovimientosScreenParams}from './app/screens/MovimientosScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: ProductDetailsParams;
  ProductAdd: undefined;
  Login: undefined;
  EntradaScreen: MovimientosScreenParams;
}

function HomeHeader(): React.JSX.Element{
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return  (
  <Button title=" Agregar" onPress={() => navigation.navigate('ProductAdd')}/>
  );
}

function App(): React.JSX.Element {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
      name="Login" 
      component={Login}
      options={{
        headerShown: false,
        headerStyle:{backgroundColor:'#ff0040'}
      }}
      />
      <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{
        headerRight:HomeHeader,
      }}
      />
      <Stack.Screen name='ProductDetails' component={ProductDetails}/>
      <Stack.Screen name="ProductAdd" component={ProductAdd}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App;
