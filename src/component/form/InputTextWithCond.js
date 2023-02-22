import React from 'react';
import {View, TextInput, Text, Platform} from 'react-native';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Constanta from '../../lib/Constanta';
// import {AppStyles} from '../../assets/css';

export default ({
  inputProps = {},
  containerProps = {},
  labelProps = {
    title: '',
    status: false,
    style: {},
    is_false: false,
  },
  condition = {
    title: '+62',
    status: true,
    style: {},
  },
}) => {
  return (
    <View {...containerProps}>
      {labelProps.status && (
        <Text
          style={[
            labelProps.style,
            {
              ...Constanta({
                font: 'regular',
              }),
            },
          ]}>
          {labelProps.title}
        </Text>
      )}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
          condition.style,
        ]}>
        <View
          style={{
            borderRightWidth: 0.5,
            borderRightColor: '#CDD1E0',
            height: heightPercentageToDP('4.5%'),
            justifyContent: 'center',
            width: widthPercentageToDP('10%'),
          }}>
          <Text
            style={{
              paddingHorizontal: widthPercentageToDP('1.5%'),
              textAlign: 'center',
              color: '#000',
              ...Constanta({
                font: 'regular',
              }),
              // fontSize: 12,
            }}>
            {condition.title}
          </Text>
        </View>
        <TextInput
          {...inputProps}
          style={{
            ...Constanta({font: 'regular'}),
          }}
        />
      </View>
      {!labelProps.is_false && (
        <Text
          style={{
            color: '#CE2121',
            fontWeight: '300',
            fontSize: widthPercentageToDP('3%'),

            ...Constanta({
              font: 'regular',
            }),
          }}>
          {labelProps.title} Tidak Boleh Kosong
        </Text>
      )}
    </View>
  );
};
