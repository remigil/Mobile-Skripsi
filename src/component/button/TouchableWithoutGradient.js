import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Constanta from '../../lib/Constanta';

export default ({redirect, icon = null, title, ...props}) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate(redirect)}
      style={{
        width: widthPercentageToDP('42%'),
        height: heightPercentageToDP('5%'),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#003A91',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {icon ? icon : <></>}
        <Text
          style={{
            color: '#003A91',
            textAlign: 'center',
            marginLeft: 10,
            ...Constanta({
              font: 'regular',
            }),
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
