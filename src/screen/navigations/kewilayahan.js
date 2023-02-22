import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {KewilayahanPolda, KewilayahanPolres} from '../kewilayahan';
const Stack = createStackNavigator();
export default KewilayahanNavigation = () => {
  //   const HomeKewilayahan = () => {
  //     return (
  //       <Stack.Navigator
  //         key="nav.homekewilayahan"
  //         screenOptions={{
  //           headerMode: 'none',
  //         }}>
  //         <Stack.Screen name="kewilayahan.home" component={KewilayahanPolda} />
  //         <Stack.Screen name="kewilayahan.map" component={KewilayahanPolres} />
  //       </Stack.Navigator>
  //     );
  //   };

  return (
    <Stack.Navigator
      key="nav.kewilayahan"
      screenOptions={{
        headerMode: 'none',
      }}
      initialRouteName={'kewilayahan.index'}>
      <Stack.Screen name="kewilayahan.index" component={KewilayahanPolda} />
      <Stack.Screen name="kewilayahan.map" component={KewilayahanPolres} />
    </Stack.Navigator>
  );
};
