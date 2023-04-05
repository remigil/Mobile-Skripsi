import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {AvatarIco, IconSpeaker} from '../../assets/Assets';
import {BaseContainer, FilterHome} from '../../component';

// import Berita from './addOnHome/berita';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import {useDispatch, useSelector} from 'react-redux';

import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {GetPolda} from '../../repositories/kewilayahan';
import {BlurView} from '@react-native-community/blur';
import {LINK_ICON_POLDA} from '../../constant/URL_EMBED';
// import AplikasiKorlantas from './addOnHome/aplikasiKorlantas';

export default props => {
  const {auth} = useSelector(state => state);
  const [openPanicButton, setOpenPanicButton] = useState(false);
  const slideToRight = useRef(new Animated.Value(0)).current;

  const [basicAlertProps, setBasicAlertProps] = useState(BasicAlertProps);
  const [isLoading, setIsLoading] = useState(true);
  const [listPolda, setListPolda] = useState([]);
  const getPoldaData = () => {
    GetPolda()
      .then(datapolda => {
        if (datapolda.success) {
          //   console.log(datapolda.data.data);
          setListPolda(datapolda.data.data);
        } else {
          setListPolda([]);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getPoldaData();
  }, []);
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
        title: 'INFORMASI KEWILAYAHAN',
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
          marginBottom: responsiveHeight(12),
          // paddingBottom: responsiveHeight(20),
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginVertical: responsiveWidth(5),
          }}>
          {listPolda?.length ? (
            listPolda?.map(polda => (
              <TouchableOpacity
                onPress={() => {
                  //   alert('aaa');
                  //   console.log(props.navigation);
                  props.navigation.navigate('kewilayahan.map', {
                    ...polda,
                    picture: LINK_ICON_POLDA + polda.logo_polda,
                  });
                  //   props.navigation.navigate('kewilayahan.map');
                }}
                style={{
                  width: responsiveWidth(25),
                  height: responsiveHeight(13),
                  margin: responsiveWidth(2),
                  marginVertical: responsiveWidth(3),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    margin: responsiveWidth(2),
                    padding: responsiveWidth(2),
                    borderRadius: responsiveWidth(2),
                    // elevation: 10,
                  }}>
                  <Image
                    source={{
                      uri: LINK_ICON_POLDA + polda.logo_polda,
                    }}
                    style={{
                      width: responsiveWidth(19),
                      height: responsiveWidth(19),
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={
                    {
                      // position: 'absolute',
                      // bottom: polda.name_polda.length <= 15 ? -10 : -25,
                    }
                  }>
                  <Text
                    style={{
                      textAlign: 'center',
                      zIndex: 999,
                      // backgroundColor: 'red',
                      color: 'black',
                      ...Constanta({
                        font: 'regular',
                      }),
                      fontSize: responsiveFontSize(1.2),
                    }}>
                    {polda.name_polda}
                    {/* {polda.name_polda.length} */}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Data Kosong</Text>
          )}
          {/* <View
            style={{
              backgroundColor: '#0F6CFA',
              width: responsiveWidth(100),
              height: responsiveHeight(15),
              borderBottomLeftRadius: responsiveWidth(10),
              borderBottomRightRadius: responsiveWidth(10),
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignSelf: 'center',
                width: responsiveWidth(50),
              }}>
              <View>
                <AvatarIco
                  height={heightPercentageToDP('18%')}
                  width={widthPercentageToDP('18%')}
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
                  }}>
                  Hi, {auth?.userData?.getProfile?.person_name}
                </Text>
              </View>
            </View>
          </View> */}
          {}
          {/* <View
            style={{
              flex: 1,
              // height: responsiveHeight(90),
              backgroundColor: '#F4F4F4',
            }}> */}
          {/* <View
              style={{
                marginLeft: responsiveWidth(6),
                marginTop: responsiveHeight(4),
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
            </View> */}
          {/* <Berita /> */}
          {/* </View> */}
        </View>
      </ScrollView>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: heightPercentageToDP('100%'),
            width: widthPercentageToDP('100%'),
            backgroundColor: '#2727278F',
            opacity: 10,
            justifyContent: 'center',
            zIndex: 999999,
          }}>
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor={'#ededed'}
          />
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#01796F" />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 9,
              }}>
              Harap Tunggu Sebentar
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}
    </BaseContainer>
  );
};
