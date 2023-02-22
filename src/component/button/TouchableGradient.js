import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Constanta from '../../lib/Constanta';

export default ({redirect, icon = null, title, onPressData, ...props}) => {
  return (
    <TouchableOpacity
      // onPress={() => props.navigation.navigate(redirect)}
      onPress={() => onPressData()}
      style={[
        {
          width: widthPercentageToDP('42%'),
          height: heightPercentageToDP('5%'),
          borderRadius: 5,
        },
        props.styles,
      ]}>
      <LinearGradient
        start={{x: 1.0, y: 1.0}}
        end={{x: 0.0, y: 0.4}}
        locations={[0, 0.7]}
        colors={['#275DAD', '#003A91']}
        style={{
          flex: 1,
          borderRadius: 5,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {icon ? icon : <></>}
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            marginLeft: 10,
            ...Constanta({
              font: 'regular',
            }),
          }}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
