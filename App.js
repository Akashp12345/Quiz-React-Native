import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Start from './Start';
import Main from './Main';
import { Provider } from 'react-redux';
import Store from './data/Store';

const Stack = createNativeStackNavigator();

export default function App(){
  return(

    <NavigationContainer>
      <Provider store={Store}>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}> 
        <Stack.Screen  name="Home" component={Home}/>
        <Stack.Screen  name="Start" component={Start}/>
        <Stack.Screen  name="Main" component={Main}/>
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}