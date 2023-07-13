import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {View, Text, Dimensions, Platform, Image} from 'react-native';
import Home from '../home/home';
import {
  HomeActive,
  HomeInActive,
  KewilayahanOff,
  KewilayahanOn,
  PetaActive,
  PetaInActive,
  TripOnActive,
  TripOnInActive,
} from '../../assets/Assets';
import NgawasNavigation from './NgawasNavigation';
import KewilayahanNavigation from './kewilayahan';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {LokasiTersimpan, MapScreen} from '../map';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Constanta from '../../lib/Constanta';
import {
  CallCenter,
  // HalamanFAQ,
  ProfileAccountScreen,
  PusatBantuan,
  ScanKTP,
  Sosial_Media,
} from '../home';
// import {Stakeholder} from '../stakeholder';
// import StakeholderNavigator from './stakeholderNav';

export function BottomHomeNavigation() {
  const BottomTab = createBottomTabNavigator();
  const windowHeight = Dimensions.get('window').height;

  let heightPosition,
    borderPosition,
    bottomBarHeight,
    fontLabelSize = {};
  if (windowHeight >= 750) {
    heightPosition = {height: responsiveHeight(9)};
    bottomBarHeight = {height: heightPercentageToDP('10%')};
    fontLabelSize = {fontSize: responsiveFontSize(0.9)};
    // borderPosition = {top: -responsiveHeight(1.5)};
  } else {
    heightPosition = {height: responsiveHeight(11)};
    bottomBarHeight = {height: heightPercentageToDP('10%')};
    fontLabelSize = {fontSize: responsiveFontSize(1.1)};
    // borderPosition = {top: -responsiveHeight(1.9)};
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName, indicatorColor;
          let sizeData = false;
          let labelName = '';
          if (route.name === 'Home') {
            indicatorColor = focused
              ? (color = '#01796F')
              : (color = 'transparent');
            } else if (route.name === 'Perjalanan') {
              indicatorColor = focused
                ? (color = '#01796F')
                : (color = 'transparent');
              sizeData = true;
          } else if (route.name === 'Akun') {
            indicatorColor = focused
              ? (color = '#01796F')
              : (color = 'transparent');
            sizeData = true;
          }
          if (route.name === 'Home') {
            iconName = focused ? (
              <Image source={require('../../assets/icon_bottom/Home_On.png')} />
              ) : (
                <Image
                  source={require('../../assets/icon_bottom/Home_Off.png')}
              />
            );
            } else if (route.name === 'Perjalanan') {
              iconName = focused ? (
                <Image
                source={require('../../assets/icon_bottom/Ngawas_On.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/icon_bottom/Ngawas_Off.png')}
                />
              );
          }  else if (route.name === 'Akun') {
            iconName = focused ? (
              <Image
                source={require('../../assets/icon_bottom/Akun_On.png')}
              />
            ) : (
              <Image
                source={require('../../assets/icon_bottom/Akun_Off.png')}
              />
            );
            sizeData = true;
          }

          return (
            <View
              style={{
                width: widthPercentageToDP('15%'),
                alignItems: 'center',
                // marginTop: Platform.OS == 'ios' ? responsiveHeight(2) : 0,
              }}>
              {focused && (
                <View
                  style={{
                    width: widthPercentageToDP('13%'),
                    // borderColor: '#386BF6',
                    borderColor: indicatorColor,
                    borderWidth: widthPercentageToDP('0.7%'),
                    // backgroundColor: '#386BF6',
                    backgroundColor: indicatorColor,
                    position: 'absolute',
                    bottom: -responsiveHeight(1.65),
                    borderRadius: 3,
                  }}
                />
              )}

              <View
                style={{
                  justifyContent: 'center',
                  marginVertical: 4,
                }}>
                {iconName}
              </View>
              <View>
                <Text
                  style={{
                    color: '#333',
                    ...fontLabelSize,
                    ...Constanta({font: 'semibold'}),
                    textAlign: 'center',
                  }}>
                  {route.name}
                </Text>
              </View>
              {/* )} */}
            </View>
          );
        },

        tabBarLabel: ({focused, color, size}) => {
          return (
            <View
              style={{
                // width: widthPercentageToDP('20%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{justifyContent: 'center'}}>
                {focused && (
                  <Text
                    style={{
                      color: '#386BF6',
                      // ...labelSize,
                      fontWeight: '600',
                    }}>
                    {route.name}
                  </Text>
                )}
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: '#158C79',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          ...bottomBarHeight,
          backgroundColor: '#fff',
          // backgroundColor: '#0D67F0',
          borderTopRightRadius: responsiveWidth(5),
          borderTopLeftRadius: responsiveWidth(5),
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
        unmountOnBlur: true,
      })}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({navigation}) => {
          return {
            tabBarShowLabel: false,
          };
        }}
      />
      <BottomTab.Screen
        name="Perjalanan"
        options={({navigation, route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          if (
            // routeName != 'tripon.index'
            routeName === 'ngawas.card' ||
            routeName === 'ngawas.pointingMaps' ||
            routeName === 'ngawas.tambahpenumpang' ||
            routeName === 'ngawas.profilKendaraan' ||
            routeName === 'ngawas.pratinjau' ||
            routeName === 'ngawas.tanggalKeberangkatan' ||
            routeName === 'ngawas.peta'
          ) {
            return {
              tabBarStyle: {display: 'none', tabBarShowLabel: false},
            };
          } else {
            return {
              tabBarShowLabel: false,
            };
          }
        }}
        component={NgawasNavigation}
      />
          <BottomTab.Screen
        name="Akun"
        component={ProfileAccountScreen}
        options={({navigation}) => {
          return {
            tabBarShowLabel: false,
          };
        }}
      />
    </BottomTab.Navigator>
  );
}
