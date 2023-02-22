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
import TripOnNavigation from './tripOnNavigation';
import KewilayahanNavigation from './kewilayahan';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {LokasiTersimpan, MapScreen} from '../map';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Constanta from '../../lib/Constanta';
import {Stakeholder} from '../stakeholder';
import StakeholderNavigator from './stakeholderNav';

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
              ? (color = '#386BF6')
              : (color = 'transparent');
          } else if (route.name === 'Kewilayahan') {
            indicatorColor = focused
              ? (color = 'darkred')
              : (color = 'transparent');
          } else if (route.name === 'Peta') {
            indicatorColor = focused
              ? (color = 'darkkhaki')
              : (color = 'transparent');
          } else if (route.name === 'Stakeholder') {
            indicatorColor = focused
              ? (color = 'deeppink')
              : (color = 'transparent');
          } else if (route.name === 'Trip On') {
            indicatorColor = focused
              ? (color = 'lightgreen')
              : (color = 'transparent');
            sizeData = true;
          }
          if (route.name === 'Home') {
            iconName = focused ? (
              <Image source={require('../../assets/icon_bottom/Home_on.png')} />
            ) : (
              <Image
                source={require('../../assets/icon_bottom/home_off.png')}
              />
            );
          } else if (route.name === 'Kewilayahan') {
            iconName = focused ? (
              <Image
                source={require('../../assets/icon_bottom/Kewilayahan_ON.png')}
              />
            ) : (
              <Image
                source={require('../../assets/icon_bottom/Kewilayahan_off.png')}
              />
            );
          } else if (route.name === 'Peta') {
            iconName = focused ? (
              <Image source={require('../../assets/icon_bottom/Peta_On.png')} />
            ) : (
              <Image
                source={require('../../assets/icon_bottom/Peta_Off.png')}
              />
            );
          } else if (route.name === 'Stakeholder') {
            iconName = focused ? (
              <Image
                source={require('../../assets/icon_bottom/Stakeholder_ON.png')}
              />
            ) : (
              <Image
                source={require('../../assets/icon_bottom/Stakeholder_off.png')}
              />
            );
          } else if (route.name === 'Trip On') {
            iconName = focused ? (
              <Image
                source={require('../../assets/icon_bottom/TripOn_ON.png')}
              />
            ) : (
              <Image
                source={require('../../assets/icon_bottom/Tripon_off.png')}
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
        name="Kewilayahan"
        options={({navigation}) => {
          return {
            tabBarShowLabel: false,
          };
        }}
        component={KewilayahanNavigation}
      />
      <BottomTab.Screen
        name="Peta"
        component={MapScreen}
        options={{
          // tabBarItemStyle: {display: 'none'},
          // tabBarStyle: {display: 'none'},
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name="Stakeholder"
        component={StakeholderNavigator}
        options={({navigation, route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          if (
            routeName === 'stakeholder.webview'
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
        // options={{
        //   // tabBarItemStyle: {display: 'none'},
        //   // tabBarStyle: {display: 'none'},
        //   tabBarShowLabel: false,
        // }}
      />
      <BottomTab.Screen
        name="lokasitersimpan"
        component={LokasiTersimpan}
        options={{
          tabBarItemStyle: {display: 'none'},
          tabBarStyle: {display: 'none'},
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name="Trip On"
        options={({navigation, route}) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          if (
            // routeName != 'tripon.index'
            routeName === 'tripon.card' ||
            routeName === 'tripon.pointingMaps' ||
            routeName === 'tripon.tambahpenumpang' ||
            routeName === 'tripon.profilKendaraan' ||
            routeName === 'tripon.pratinjau' ||
            routeName === 'tripon.tanggalKeberangkatan' ||
            routeName === 'tripon.peta'
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
        component={TripOnNavigation}
      />
    </BottomTab.Navigator>
  );
}
