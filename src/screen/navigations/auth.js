import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Auth,
  DaftarScreen,
  LoginScreen,
  VerifikasiScreen,
  LupaPasswordScreen,
  VerifikasiSandiScreen,
  KonfirmasiSandiScreen,
} from '../auth';

const Stack = createStackNavigator();
export default AuthNavigator = () => {
  const AuthNavigation = () => {
    return (
      <Stack.Navigator
        key="nav.auths"
        screenOptions={{
          headerMode: 'none',
        }}>
        <Stack.Screen name="auth.temIndex" component={Auth} />
        <Stack.Screen name="auth.login" component={LoginScreen} />
        <Stack.Screen name="auth.daftar" component={DaftarScreen} />
        <Stack.Screen name="auth.verifikasi" component={VerifikasiScreen} />
        <Stack.Screen name="auth.lupaPassword" component={LupaPasswordScreen} />
        <Stack.Screen
          name="auth.verifikasiSandi"
          component={VerifikasiSandiScreen}
        />
        <Stack.Screen
          name="auth.konfirmasiSandi"
          component={KonfirmasiSandiScreen}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Stack.Navigator
      key="nav.auth"
      screenOptions={{
        headerMode: 'none',
      }}
      initialRouteName={'auth.index'}>
      <Stack.Screen name="auth.index" component={AuthNavigation} />
    </Stack.Navigator>
  );
};
