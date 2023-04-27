import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ngawas from '../home/Ngawas/ngawas';
import {
  CardScreen,
  PetaNgawas,
  PointingMaps,
  PratinjauScreen,
  ProfilKendaraan,
  TambahPenumpangComp,
  TanggalKeberangkatan,
  //   TanggalKeberangkatan,
} from '../home';

const Stack = createStackNavigator();
const NgawasNavigation = () => {
  return (
    <Stack.Navigator
      key="nav.homes"
      screenOptions={{
        headerMode: 'none',
      }}
      initialRouteName={'ngawas.index'}>
      <Stack.Screen name="ngawas.index" component={ngawas} />
      <Stack.Screen
        name="ngawas.tambahpenumpang"
        component={TambahPenumpangComp}
      />
      <Stack.Screen name="ngawas.profilKendaraan" component={ProfilKendaraan} />
      <Stack.Screen
        name="ngawas.tanggalKeberangkatan"
        component={TanggalKeberangkatan}
      />
      <Stack.Screen name="ngawas.pratinjau" component={PratinjauScreen} />
      <Stack.Screen
        name="ngawas.peta"
        component={PetaNgawas}
        options={{
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="ngawas.card"
        component={CardScreen}
        options={{
          tabBarVisible: false,
        }}
      />

      <Stack.Screen
        name="ngawas.pointingMaps"
        component={PointingMaps}
        options={{
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default NgawasNavigation;
