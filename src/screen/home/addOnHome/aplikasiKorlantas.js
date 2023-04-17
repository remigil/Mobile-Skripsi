import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import WebView from 'react-native-webview';
import {CloseModalize} from '../../../assets/Assets';
import {LINK_ICON_EXTERNAL} from '../../../constant/URL_EMBED';
import Constanta from '../../../lib/Constanta';
import {GetLinkWebview} from '../../../repositories/home';

const {width, height} = Dimensions.get('window');

export default (props = {...props}) => {
  const navigation = useNavigation();

  let ukuranHuruf,
    lebarIcon = {};
  height >= 784
    ? (ukuranHuruf = responsiveFontSize(1))
    : (ukuranHuruf = responsiveFontSize(1));
  width > 411 && height > 865
    ? (lebarIcon = responsiveWidth(19))
    : (lebarIcon = responsiveWidth(18.2));
  const [link, setLink] = useState([]);
  const [linkModal, setLinkModal] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    GetLinkWebview()
      .then(succ => {
        // console.log(succ.data);
        setLink(succ.data);
        setLinkModal(succ.data[0].list[0].list);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        // props.isLoaded(true);
      });
  }, []);

  const modalizeAplikasi = useRef(null);
  return (
    <View
      style={{
        marginBottom: responsiveHeight(4),
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {link?.length ? (
            link?.map(item => (
              <>
                <View
                  key={item.title + new Date().getMilliseconds()}
                  style={{
                    marginLeft: responsiveWidth(6),
                    marginTop: responsiveHeight(2),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      ...Constanta({
                        font: 'bold',
                      }),
                      // textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: responsiveWidth(6),
                    marginTop: responsiveHeight(2.5),
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                  }}>
                  {item.list.map(icon => (
                    <View
                      style={{
                        // backgroundColor: 'red',
                        width: responsiveWidth(23),
                      }}
                      key={
                        LINK_ICON_EXTERNAL +
                        icon.icon +
                        new Date().getMilliseconds()
                      }>
                      <Pressable
                        style={{
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          {
                            {
                              if (icon.is_modal) {
                                modalizeAplikasi.current.open();
                              } else {
                                if (icon.url === '1 500 669') {
                                  Linking.openURL(`tel:${icon.url}`);
                                } else {
                                  navigation.navigate('webkorlantas', icon);
                                }
                              }
                              // ?
                              // :
                            }
                          }
                        }}>
                        <View
                          style={{
                            borderColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {/* {console.log({
                            url: LINK_ICON_EXTERNAL + icon.icon,
                            iconUrl: icon.url,
                          })} */}
                          <Image
                            source={{
                              uri: LINK_ICON_EXTERNAL + icon.icon,
                            }}
                            resizeMode="contain"
                            style={{
                              width: responsiveHeight(9),
                              height: responsiveHeight(5.5),
                            }}
                            resizeMethod="scale"
                          />
                        </View>
                        <View
                          style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                          }}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: 'black',
                              marginTop: responsiveWidth(3),
                              ...Constanta({
                                font: 'regular',
                              }),
                              fontSize: responsiveFontSize(1.4),
                              flex: 4,
                              textAlign: 'center',
                            }}>
                            {icon.title}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </>
            ))
          ) : (
            <></>
          )}
        </View>
      )}
      <View style={{flex: 1}}>
        <Portal>
          <Modalize
            ref={modalizeAplikasi}
            withHandle={true}
            modalHeight={responsiveHeight(65)}
            handlePosition="inside"
            handleStyle={{
              backgroundColor: '#D9D9D9',
              width: responsiveWidth(30),
            }}
            HeaderComponent={
              <View
                style={{
                  flex: 1,
                  marginTop: responsiveHeight(8),
                  // marginHorizontal: 30,
                }}>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    // marginTop: 7,
                    marginRight: responsiveWidth(2),
                    bottom: responsiveHeight(6),
                  }}>
                  <Pressable onPress={() => modalizeAplikasi.current.close()}>
                    <CloseModalize />
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: responsiveWidth(5),
                    flexWrap: 'wrap',
                  }}>
                  {linkModal.map(itemmodal => (
                    <TouchableOpacity
                      key={itemmodal.id}
                      style={{
                        alignItems: 'center',
                        marginHorizontal: responsiveWidth(2),
                        marginBottom: 5,
                      }}
                      onPress={() => {
                        <WebView
                          source={{
                            uri: navigation.navigate('webkorlantas', itemmodal),
                          }}
                        />;
                      }}>
                      <View
                        style={{
                          borderColor: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{
                            uri:
                              'http://34.128.65.46:3001/uploads/icon/' +
                              itemmodal.icon,
                          }}
                          // size icon di modalize
                          style={{
                            width: responsiveWidth(18.5),
                            height: responsiveHeight(9),
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexGrow: 1,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#4E4E4E',
                            marginVertical: responsiveHeight(1),
                            ...Constanta({
                              font: 'regular',
                            }),
                            fontSize: responsiveFontSize(1.6),
                            flex: 1,
                            width: 1,
                            textAlign: 'center',
                          }}>
                          {itemmodal.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            }
            modalStyle={{}}></Modalize>
        </Portal>
      </View>
    </View>
  );
};
