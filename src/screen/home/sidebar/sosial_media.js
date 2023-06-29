import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Linking,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  Bg_CC,
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconYoutube,
  LogoCC,
} from '../../../assets/Assets';
import {BaseContainer} from '../../../component';
import Constanta from '../../../lib/Constanta';
import {GetSosmed} from '../../../repositories/home';

const urlyt = 'https://twitter.com/K3IKorlantas';

export default props => {
  const openURL = async url => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't Know how to open this url :${url}`);
    }
  };

  const [sosmed, setSosmed] = useState({});

  console.log('Sosial Media', sosmed);

  useEffect(() => {
    GetSosmed()
      .then(succ => {
        setSosmed(succ.data.rows);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {});
  }, []);

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Sosial Media',
        backIconStyle: true,
        titleStyle: {
          color: '#FFF',

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
              marginTop: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#7E7E7E',
                fontSize: 16,
                ...Constanta({
                  font: 'bold',
                }),
              }}>
              Bogor Ngawas
            </Text>
          </View>
          <View
            style={{
              marginBottom: heightPercentageToDP('3%'),
              paddingVertical: heightPercentageToDP('4%'),
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  ...Constanta({
                    font: 'semibold',
                  }),
                }}>
                Sosial Media K3I
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: responsiveHeight(3),
                marginHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://www.youtube.com/channel/UCXr0rFTNDPLYkU0-PONdjLg`,
                    sosmed[1].link_sosmed,
                  );
                }}
                // onPress={() => {
                //   {
                //     props.navigation.navigate('webkorlantas');
                //   }
                // }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <IconYoutube />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Youtube
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    // `https://twitter.com/K3IKorlantas`
                    sosmed[3].link_sosmed,
                  );
                }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <IconTwitter />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Twitter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    // `https://www.instagram.com/k3ikorlantaspolri/`
                    sosmed[2].link_sosmed,
                  );
                }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <IconInstagram />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Instagram
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://www.facebook.com/K3I-Korlantas-105187678596891`,
                  );
                }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="center"
                    source={IconFacebook}
                    style={{
                      width: responsiveWidth(12),
                      height: responsiveHeight(4.3),
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  ...Constanta({
                    font: 'semibold',
                  }),
                }}>
                Sosial Media NTMC
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: responsiveHeight(3),
                marginHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`https://www.youtube.com/c/NTMCChannel`);
                }}
                // onPress={() => {
                //   {
                //     props.navigation.navigate('webkorlantas');
                //   }
                // }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <IconYoutube />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Youtube
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`https://twitter.com/NTMC_Info`);
                }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <IconTwitter />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Twitter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://www.instagram.com/ntmc_polri/?hl=id`,
                  );
                }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <IconInstagram />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Instagram
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`https://id-id.facebook.com/NTMCPOLRI/`);
                }}
                style={{
                  paddingHorizontal: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="center"
                    source={IconFacebook}
                    style={{
                      width: responsiveWidth(12),
                      height: responsiveHeight(4.3),
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#01796F',
                    marginTop: 10,
                    fontSize: 14,
                  }}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: heightPercentageToDP('10%'),
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                lineHeight: 15,
              }}>
              Powered by POLRI
            </Text>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 10,
                lineHeight: 15,
              }}>
              Versi 1.0
            </Text>
          </View>
        </View>
      </ImageBackground>
    </BaseContainer>
  );
};
