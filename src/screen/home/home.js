import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {AvatarIco, IconSpeaker} from '../../assets/Assets';
import {BaseContainer} from '../../component';

import Berita from './addOnHome/berita';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import {useSelector} from 'react-redux';

import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AplikasiKorlantas from './addOnHome/aplikasiKorlantas';
import Beritastakeholder from './addOnHome/beritastakeholder';

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
        title: 'K3I KORLANTAS POLRI',
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
              backgroundColor: '#0F6CFA',
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
          <AplikasiKorlantas />
          <View
            style={{
              flex: 1,
              backgroundColor: '#F4F4F4',
            }}>
            <View
              style={{
                marginLeft: responsiveWidth(6),
                marginTop: responsiveHeight(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.1),
                  color: 'black',
                  ...Constanta({
                    font: 'bold',
                  }),
                }}>
                Berita Terkini
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('listberita')}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    marginRight: responsiveWidth(6),
                    paddingTop: responsiveHeight(0.8),
                    color: 'black',
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>
            <Berita />
            <View
              style={{
                marginLeft: responsiveWidth(6),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.1),
                  color: 'black',
                  ...Constanta({
                    font: 'bold',
                  }),
                }}>
                Berita Stakeholder
              </Text>
            </View>
            <Beritastakeholder />
          </View>
        </View>
        <Animated.View
          style={{
            position: 'absolute',
            right: -widthPercentageToDP('23%'),
            top: widthPercentageToDP('60'),
            backgroundColor: '#00000080',
            width: widthPercentageToDP('30'),
            height: 80,
            justifyContent: 'center',
            borderTopLeftRadius: 13,
            borderBottomLeftRadius: 13,
            transform: [
              {
                translateX: slideToRight,
              },
            ],
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View>
              <Pressable
                style={{
                  width: widthPercentageToDP('3'),
                  height: 58,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  if (openPanicButton) {
                    setOpenPanicButton(false);
                  } else {
                    setOpenPanicButton(true);
                  }
                }}>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: responsiveWidth(2.5),
                    height: responsiveHeight(8),
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}></View>
              </Pressable>
            </View>
            <View
              style={{
                width: widthPercentageToDP('20%'),
              }}>
              <Pressable
                style={{}}
                onPress={() => {
                  setBasicAlertProps({
                    basicAlertVisible: true,
                    basicAlertShowButton: true,
                    withTitle: true,
                    basicAlertTitle:
                      'Apakah Anda Yakin Membuat Laporan Panic Button',
                    basicAlertMessage: '',
                    basicAlertOnOk: () => {
                      setOpenPanicButton(false);
                      setBasicAlertProps({
                        ...basicAlertProps,
                        basicAlertVisible: false,
                        basicAlertTitle: null,
                        basicAlertMessage: null,
                        onClose: null,
                        iconClose: false,
                      });
                      props.navigation.navigate('PanicButton');
                    },
                    basicAlertOnClosed: () => {
                      setBasicAlertProps({
                        ...basicAlertProps,
                        basicAlertVisible: false,
                        basicAlertTitle: null,
                        basicAlertMessage: null,
                        onClose: null,
                        iconClose: false,
                      });
                    },
                    basicAlertOkBtnOnly: false,
                    basicAlertBtnOkText: 'Konfirmasi',
                    basicAlertBtnClosedText: 'Batalkan',
                  });
                }}>
                <IconSpeaker />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </BaseContainer>
  );
};

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
});
