import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {BottomHomeNavigation} from './bottomNavigation';
// import panicButton from '../home/formulir/panicButton';
const Stack = createStackNavigator();
export default HomeNavigation = () => {
  const HomeNavigation = () => {
    return (
      <Stack.Navigator
        key="nav.home"
        screenOptions={{
          headerMode: 'none',
        }}>
        <Stack.Screen name="home.index" component={BottomHomeNavigation} />
        <Stack.Screen name="home.panic" component={panicButton} />
        
      </Stack.Navigator>
    );
  };

  return (
    <Stack.Navigator
      key="nav.homes"
      screenOptions={{
        headerMode: 'none',
      }}
      initialRouteName={'homes.index'}>
      <Stack.Screen name="homes.index" component={HomeNavigation} />
    </Stack.Navigator>
  );
};
