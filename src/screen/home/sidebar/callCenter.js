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
import {Bg_CC, CC_Telepon, CC_Wa, LogoCC} from '../../../assets/Assets';
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
        title: 'Call Centre',
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
        source={Bg_CC}
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
                color: '#7E7E7E',
                fontSize: responsiveFontSize(2.5),

                ...Constanta({
                  font: 'bold',
                }),
              }}>
              K31 KORLANTAS POLRI
            </Text>
            <View
              style={{
                marginTop: responsiveHeight(1),
              }}>
              <Text
                style={{
                  color: '#7E7E7E',
                  textAlign: 'center',
                  ...Constanta({
                    font: 'semibold',
                  }),
                  fontSize: responsiveFontSize(2),
                }}>
                INFO KONTAK
              </Text>
              <Text
                style={{
                  color: '#7E7E7E',
                  textAlign: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                  fontSize: responsiveFontSize(2),
                  lineHeight: 20,
                  marginTop: responsiveHeight(2),
                }}>
                Pusat Kendali, Koordinasi,{`\n`} Komunikasi dan Informasi{`\n`}
                Korlantas Polri
              </Text>
              <Text
                style={{
                  marginTop: responsiveHeight(2),
                  color: '#7E7E7E',
                  textAlign: 'center',
                  ...Constanta({
                    font: 'semibold',
                  }),
                  fontSize: responsiveFontSize(2),
                  lineHeight: 20,
                }}>
                Jl. MT Haryono Kab. 37 - 38,{`\n`} Jakarta 12770
              </Text>
            </View>
            {/* <View></View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: heightPercentageToDP('4%'),
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${number}`);
              }}>
              <View
                style={{
                  width: widthPercentageToDP('40%'),
                  backgroundColor: '#F5D8D8',
                  borderRadius: 28,
                  marginHorizontal: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 18,
                }}>
                <View>
                  <CC_Telepon />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#B81F1F',
                    ...Constanta({
                      font: 'regular',
                    }),
                    marginTop: 10,
                    fontSize: 10,
                  }}>
                  Hubungi{' '}
                  {
                    <Text
                      style={{
                        color: '#B81F1F',
                        ...Constanta({
                          font: 'bold',
                        }),
                        opacity: 10,
                        textAlign: 'center',
                      }}>
                      Hotline
                    </Text>
                  }
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                // Linking.openURL(
                //   `whatsapp://send?phone=${contact}$text=${message}`,
                // );
                Linking.openURL('https://wa.me/6285171552928')
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
                    color: '#234FA2',
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
              Powered by POLRI
            </Text>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Versi 1.0
            </Text>
          </View>
        </View>
      </ImageBackground>
    </BaseContainer>
  );
};
