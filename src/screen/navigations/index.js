import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeNavigation from './home';
import AuthNavigator from './auth';
import {useSelector} from 'react-redux';
import {Host} from 'react-native-portalize';

import Home from '../home/home';
import splashscreen from '../splashscreen';
import Splashscreen from '../splashscreen';
import StackAppNavigation from './stackAppNav';
const AppNavigation = () => {
  const userData = useSelector(state => state.auth);
  const splashData = useSelector(state => state.splash);
  const [splashStatus, setSplashStatus] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplashStatus(false);
    }, 3000);
  }, [splashStatus]);
  const getHome = () => {
    return userData?.userData ? <StackAppNavigation /> : <AuthNavigator />;
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Host>{splashStatus ? <Splashscreen /> : getHome()}</Host>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export {AppNavigation};
