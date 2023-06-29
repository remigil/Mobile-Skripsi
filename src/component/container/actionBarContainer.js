import React from 'react';
import {Pressable, TouchableOpacity, Text, View, Image} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import {widthPercentageToDP} from 'react-native-responsive-screen';
import {BurgerIcon, IconKembali, Lonceng} from '../../assets/Assets';
// import {AppColor, AppStyles} from '../../assets/css';
export const ActionBarProps = {
  containerStyle: null,
  title: null,
  titleContainerStyle: null,
  titleStyle: null,
  backIconStyle: null,
  onBackPressed: null,
  leftActionComponent: null,
  onNotification: null,
  rightIconStyle: false,
  isHome: false,
};
export default (props = {...ActionBarProps}) => {
  return (
    <View
      style={[
        {
          backgroundColor: !props?.isHome ? '#01796F' : 'white',
          flexDirection: 'row',
          paddingHorizontal: widthPercentageToDP('5%'),
          paddingVertical: widthPercentageToDP('4%'),
          elevation: 2,
          ...props.containerStyle,
        },
      ]}>
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity
          android_ripple={{
            color: '#aaa',
            borderless: true,
          }}
          style={{
            width: widthPercentageToDP('8%'),
            height: widthPercentageToDP('5%'),
          }}
          onPress={() => props.onBackPressed && props.onBackPressed()}>
          {/* <BurgerIcon /> */}
          {props.backIconStyle ? (
            // <IconKembali />
            <Image source={require('../../assets/icon_back_putih.png')} />
          ) : (
            <Image source={require('../../assets/Settings.png')} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={[
          {
            justifyContent: 'center',

            flex: 1,
            ...props.titleStyle,
          },
        ]}>
        <Text
          style={[
            {
              fontSize: widthPercentageToDP('5%'),
              fontWeight: '600',
              ...props.titleStyle,
            },
          ]}>
          {props.title ? props.title : 'Header Title'}
        </Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => props.onNotification()}>
          {props.rightIconStyle ? (
            <Image
              source={require('../../assets/icon_notif.png')}
              style={{
                width: responsiveWidth(5),
                height: responsiveWidth(5),
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};
