import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {AvatarIco, IconSpeaker} from '../../assets/Assets';
import {BaseContainer, Menu} from '../../component';


import {BasicAlertProps} from '../../component/container/dialogContainer';
import {useSelector} from 'react-redux';
import { ImageBanner } from '../../assets/Assets';

import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';



export default props => {
  const {auth} = useSelector(state => state);
  const [openPanicButton, setOpenPanicButton] = useState(false);
  const slideToRight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (openPanicButton) {
      Animated.timing(slideToRight, {
        toValue: -79,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideToRight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [openPanicButton]);

  const [basicAlertProps, setBasicAlertProps] = useState(BasicAlertProps);

  let firstName = auth?.userData?.getProfile?.person_name.split(' ');

  return (
    <BaseContainer
      {...props}
      withActionBar={true}
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      actionBarProps={{
        containerStyle: {
          paddingVertical: heightPercentageToDP('1%'),
        },
        title: 'BOGOR NGAWAS',
        titleStyle: {
          color: '#fff',
          backgrounColor: '#00000040',
          textAlign: 'center',
          ...Constanta({
            font: 'bold',
          }),
        },
        onBackPressed: () => {
          props.navigation.openDrawer();
        },
      }}>
      <ScrollView
        style={{
          marginBottom: responsiveHeight(9),
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#01796F',
              width: responsiveWidth(100),
              height: responsiveHeight(9),
              borderBottomLeftRadius: responsiveWidth(10),
              borderBottomRightRadius: responsiveWidth(10),
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // alignSelf: 'center',
                width: responsiveWidth(115),
              }}>
              <View>
                <AvatarIco
                  height={heightPercentageToDP('10%')}
                  width={widthPercentageToDP('10%')}
                />
              </View>
              <View>
                <Text
                  style={{
                    ...Constanta({
                      font: 'regular',
                    }),
                    color: 'white',
                    width: responsiveWidth(30),
                    marginLeft: 5,
                  }}>
                  Hi, {firstName[0]}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFFF',
            }}>
            <View
              style={{
                marginLeft: responsiveWidth(5),
                marginTop: responsiveHeight(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Image source={ImageBanner} />
        </View>

         </View>

              <View
              style={{
                marginLeft: responsiveWidth(5),
                marginTop: responsiveHeight(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

              <Text
                style={{
                  fontSize: responsiveFontSize(2.1),
                  color: '#01796F',
                  ...Constanta({
                    font: 'bold',
                    marginLeft: responsiveWidth(5),
                    marginTop: responsiveHeight(2),
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }),
                }}>
             Menu
              </Text>
         </View>
         
         <View
              style={{
                marginLeft: responsiveWidth(5),
                marginTop: responsiveHeight(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

              <Text
                style={{
                  fontSize: responsiveFontSize(2.1),
                  color: '#01796F',
                  ...Constanta({
                    font: 'bold',
                    marginLeft: responsiveWidth(5),
                    marginTop: responsiveHeight(2),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }),
                }}>
             Ngawas                Akun                  Informasi
              </Text>
         </View>
         <View
             style={styles.Menu}>
              {/* <Menu title="Ngawas"/>
              <Menu title="Akun"/>
              <Menu title="Informasi"/> */}
             

         </View>
          </View>
      </ScrollView>
    </BaseContainer>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: widthPercentageToDP('80%'),
    height: heightPercentageToDP('38%'),
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
  Menu: {
    flexDirection: 'row',
  }
});
