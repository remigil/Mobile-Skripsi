import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Constanta from '../../lib/Constanta';
import {GetTripOn} from '../../repositories/tripon';

export default props => {
  const useImage = useRef();
  const [widthImage, setWidthImage] = useState({
    width: 0,
    height: 0,
  });

  const {auth} = useSelector(state => state);
  return (
    <View
      style={{
        // width: widthPercentageToDP('100%'),
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 359,
          height: 216,

          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image
          ref={useImage}
          onLoad={data => {
            // console.log({
            //   width: data.nativeEvent.source.width,
            //   height: data.nativeEvent.source.height,
            // });
            setWidthImage({
              width: data.nativeEvent.source.width,
              height: data.nativeEvent.source.height,
            });
          }}
          //   resizeMode="stretch"
          style={{
            width: 359,
            height: 220,
          }}
          source={require('../../assets/tripon/tripon_card2.png')}
        />
        <Text
          style={{
            color: '#F2DA03',
            ...Constanta({
              font: 'bold',
            }),
            fontSize: 30,
            position: 'absolute',
            bottom: 10,
            left: 25,
          }}>
          {props.nopol}
          {/* F 2306 AAC */}
        </Text>
        <Text
          style={{
            color: 'white',
            ...Constanta({
              font: 'regular',
            }),
            fontSize: 13,
            position: 'absolute',
            top: 48,
            left: 25,
          }}>
          {/* TRP/xxx/xxx/xxx/xxx/xxx */}
          {props.code}
        </Text>
        <Text
          style={{
            color: 'white',
            ...Constanta({
              font: 'bold',
            }),
            fontSize: 20,
            position: 'absolute',
            top: 60,
            left: 25,
          }}>
          {auth.userData.getProfile.person_name}
        </Text>
      </View>
    </View>
  );
};
