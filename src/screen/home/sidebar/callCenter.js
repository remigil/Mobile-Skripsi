import React, {Component} from 'react';
import {useState} from 'react';
import {
  ImageBackground,
  Linking,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Bg_CC, CC_Telepon, CC_Wa, LogoCC, tentang, Logo} from '../../../assets/Assets';
import {BaseContainer} from '../../../component';
import Constanta from '../../../lib/Constanta';

export default props => {
  const number = '1 500 669';

  // const [contact, setContactt] = useState('6285171552928');
  // const [message, setMessage] = useState('');

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Informasi Bogor Ngawas',
        backIconStyle: true,
        titleStyle: {
          color: '#FFF',
          ...Constanta({
            font: 'bold',
          }),
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.goBack('Home');
        },
      }}>
      <ImageBackground
        source={tentang}
        style={{
          flex: 1,
        }}
        resizeMode="cover">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
          <LogoCC />
          <View
            style={{
              marginTop: responsiveHeight(-20),
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#01796F',
                fontSize: responsiveFontSize(2.5),

                ...Constanta({
                  font: 'bold',
                }),
              }}>
             BOGOR NGAWAS
            </Text>
            <View
              style={{
                marginTop: responsiveHeight(1),
              }}>
              <Text
                style={{
                  color: '#01796F',
                  textAlign: 'center',
                  ...Constanta({
                    font: 'semibold',
                  }),
                  fontSize: responsiveFontSize(2),
                }}>
                DEAR MASYARAKAT KOTA BOGOR
              </Text>
              <Text
                style={{
                  color: '#01796F',
                  textAlign: 'justify',
                  alignItems: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                  fontSize: responsiveFontSize(2),
                  lineHeight: 25,
                  marginTop: responsiveHeight(2),
                }}>
                Aplikasi Bogor Ngawas hadir untuk mempermudah Masyarakat Kota Bogor dalam mencari rute perjalanan.
                Bogor Ngawas ini terkoneksi pada web Bogor ngawas yang Memberikan Informasi Kepada pihak Berwenang 
                berdasarkan data yang terdaftar serta memberikan keamanan Kepada Masyarakat yang sedang melakukan 
                perjalanan.
              </Text>
              
             
            </View>
            {/* <View></View> */}
          </View>
          <Text
              style={{
                textAlign: 'center',
                color: '#01796F',
                fontSize: responsiveFontSize(2),
                marginTop: heightPercentageToDP('20%'),

                ...Constanta({
                  font: 'bold',
                }),
              }}>
             Menghubungi Hotline Admin
            </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: heightPercentageToDP('1%'),
            }}>
              
                <TouchableOpacity
              onPress={() =>
                // Linking.openURL(
                //   `whatsapp://send?phone=${contact}$text=${message}`,
                // );
                Linking.openURL('https://wa.me/6285881691629')
              }>
              <View
                style={{
                  width: widthPercentageToDP('40%'),
                  backgroundColor: '#A2C7FD',
                  borderRadius: 28,
                  marginHorizontal: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 18,
                }}>
                <CC_Wa />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    textAlign: 'center',
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: 10,
                  }}>
                  Hubungi{' '}
                  {
                    <Text
                      style={{
                        ...Constanta({
                          font: 'bold',
                        }),
                      }}>
                      WHATSAPP
                    </Text>
                  }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </BaseContainer>
  );
};
