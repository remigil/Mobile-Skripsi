import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import tripon from '../home/tripOn/tripon';
import {
  CardScreen,
  PetaTripOn,
  PointingMaps,
  PratinjauScreen,
  ProfilKendaraan,
  TambahPenumpangComp,
  TanggalKeberangkatan,
  //   TanggalKeberangkatan,
} from '../home';

const Stack = createStackNavigator();
const TripOnNavigation = () => {
  return (
    <Stack.Navigator
      key="nav.homes"
      screenOptions={{
        headerMode: 'none',
      }}
      initialRouteName={'tripon.index'}>
      <Stack.Screen name="tripon.index" component={tripon} />
      <Stack.Screen
        name="tripon.tambahpenumpang"
        component={TambahPenumpangComp}
      />
      <Stack.Screen name="tripon.profilKendaraan" component={ProfilKendaraan} />
      <Stack.Screen
        name="tripon.tanggalKeberangkatan"
        component={TanggalKeberangkatan}
      />
      <Stack.Screen name="tripon.pratinjau" component={PratinjauScreen} />
      <Stack.Screen
        name="tripon.peta"
        component={PetaTripOn}
        options={{
          tabBarVisible: false,
        }}
      />
      <Stack.Screen
        name="tripon.card"
        component={CardScreen}
        options={{
          tabBarVisible: false,
        }}
      />

      <Stack.Screen
        name="tripon.pointingMaps"
        component={PointingMaps}
        options={{
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default TripOnNavigation;
