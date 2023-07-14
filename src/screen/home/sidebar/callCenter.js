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
              marginTop: responsiveHeight(2.5),
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
                  textAlign: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                  fontSize: responsiveFontSize(2),
                  lineHeight: 20,
                  marginTop: responsiveHeight(2),
                }}>
                Aplikasi Bogor Ngawas hadir untuk{`\n`} mempermudah Masyarakat Kota Bogor dalam mencari rute perjalanan 
                {`\n`}
                Dan Bogor Ngawas ini terkoneksi pada web Bogor ngawas yang Memberikan Informasi Kepada pihak {`\n`}Berwenang berdasarkan data yang terdaftar {`\n`}serta memberikan keamanan Kepada Masyarakat yang sedang melakukan perjalanan.
              </Text>
              <Text
                style={{
                  marginTop: responsiveHeight(2),
                  color: '#01796F',
                  textAlign: 'center',
                  ...Constanta({
                    font: 'semibold',
                  }),
                  fontSize: responsiveFontSize(2),
                  lineHeight: 20,
                }}>
                Sekian Dan{`\n`} Terima Kasih
              </Text>
            </View>
            {/* <View></View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: heightPercentageToDP('4%'),
            }}>
            {/*  */}
              <View
                style={{
                  width: widthPercentageToDP('40%'),
                  backgroundColor: '#01796FD',
                  borderRadius: 20,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 18,
                }}>
                <Logo />
              </View>
          </View>
          <View
            style={{
              marginTop: responsiveHeight(8),
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Bogor Ngawas
            </Text>
          </View>
        </View>
      </ImageBackground>
    </BaseContainer>
  );
};
