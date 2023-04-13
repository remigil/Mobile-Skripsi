import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {BottomHomeNavigation} from './bottomNavigation';
import {
  CallCenter,
  // HalamanFAQ,
  ProfileAccountScreen,
  PusatBantuan,
  ScanKTP,
  Sosial_Media,
} from '../home';
const Stack = createStackNavigator();
export default ProfileNavigation = () => {
  return (
    <Stack.Navigator
      key="nav.homes"
      screenOptions={{
        headerMode: 'none',
      }}
      initialRouteName={'sidebar.index'}>
      <Stack.Screen name="sidebar.index" component={ProfileAccountScreen} />
      {/* <Stack.Screen name="sidebar.callCenter" component={CallCenter} /> */}
      {/* <Stack.Screen name="sidebar.faq" component={HalamanFAQ} /> */}
      {/* <Stack.Screen name="sidebar.sosial_media" component={Sosial_Media} /> */}
    </Stack.Navigator>
  );
};
