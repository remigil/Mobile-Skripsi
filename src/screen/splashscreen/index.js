import {StyleSheet, Text, View, ImageBackground} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SplashScreen} from '../../assets/Assets';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Constanta from '../../lib/Constanta';

export default (props = {...props}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('../../assets/splash/tampilan.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}></ImageBackground>
      <Text
        style={{
          color: 'white',
          position: 'absolute',
          bottom: heightPercentageToDP('10%'),
          left: 0,
          right: 0,
          textAlign: 'center',
          lineHeight: responsiveHeight(2.6),
          ...Constanta({
            font: 'regular',
          }),
          marginBottom: 5,
        }}>
       Aplikasi Bogor Ngawas{`\n`}Aplikasi Tracking Untuk Warga Bogor {'\n'} Yang Ingin Keluar Bogor
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    flex: 1,
    justifyContent: 'center',
  },
});
