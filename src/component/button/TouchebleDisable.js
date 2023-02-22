import React from 'react';
import {TouchableOpacity, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Constanta from '../../lib/Constanta';

export default ({icon = null, title, ...props}) => {
  return (
    <Pressable
      disabled={true}
      style={{
        width: widthPercentageToDP('42%'),
        height: heightPercentageToDP('5%'),
        borderRadius: 5,
        borderColor: '#C0CEE5',
        borderWidth: 1,
        backgroundColor: '#EBEBE4',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      {/* <IsiFormulir /> */}
      {icon ? icon : <></>}
      <Text
        style={{
          color: '#8F8F8F',
          fontWeight: '300',
          textAlign: 'center',
          marginLeft: 10,
          ...Constanta({
            font: 'regular',
          }),
        }}>
        {title}
      </Text>
    </Pressable>
  );
};
