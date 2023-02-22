import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeDrawerNav} from './drawerHomeNavigation';

const Stack = createStackNavigator();
const StackAppNavigation = () => {
  return (
    <Stack.Navigator
      key="nav.app"
      screenOptions={{
        headerMode: 'none',
      }}
      initialRouteName={'app.index'}>
      <Stack.Screen name="app.index" component={HomeDrawerNav} />
    </Stack.Navigator>
  );
};
export default StackAppNavigation;
