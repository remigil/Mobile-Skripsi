import React, {createRef, forwardRef, useRef, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BagikanPeta, CloseModalize, SimpanPeta} from '../../../assets/Assets';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import Modalshare from './modalshare';
import {ActivityIndicator} from 'react-native-paper';
import {API_BASE_URL_TRACK} from '@env';
import {Portal} from 'react-native-portalize';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Constanta from '../../../lib/Constanta';

const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default forwardRef(({polresDetail, direction, ...props}, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const modalizeRef = createRef(Modalize);
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const modalizeShare = useRef(null);

  return (
    <>
      <Portal>
        <Modalize
          ref={combinedRef}
          withHandle={true}
          modalHeight={heightPercentageToDP('62%')}
          handlePosition="inside"
          handleStyle={{
            backgroundColor: '#135AAC',
          }}
          HeaderComponent={
            <View
              style={{
                alignSelf: 'flex-end',
                marginTop: 7,
                marginRight: 7,
              }}>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <CloseModalize />
              </TouchableOpacity>
            </View>
          }
          modalStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          {isLoading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              style={{
                height: heightPercentageToDP('65%'),
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: widthPercentageToDP('3%'),
                  position: 'relative',
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#4E4E4E',
                      fontSize: 20,
                      ...Constanta({
                        font: 'bold',
                      }),
                    }}>
                    {polresDetail.polresDetail?.name_polres}
                  </Text>
                  {/* <Text style={{color: '#4E4E4E', fontSize: 14}}>
                {cctvDetail.cctvDetail?.address_cctv}
              </Text> */}
                </View>
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: widthPercentageToDP('50%'),
                    marginHorizontal: widthPercentageToDP('2%'),
                    justifyContent: 'center',
                    marginVertical: widthPercentageToDP('3%'),
                  }}>
                  <Image
                    style={{
                      height: widthPercentageToDP('50%'),
                      // width: widthPercentageToDP('95%'),
                    }}
                    resizeMode="cover"
                    source={{
                      uri:
                        `${API_BASE_URL_TRACK}uploads/polres/image/` +
                        polresDetail.polresDetail?.image,
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', marginTop: 9}}>
                  <View style={{flex: 3, marginRight: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        combinedRef.current.close();
                        direction &&
                          direction({
                            latitude: parseFloat(
                              polresDetail.polresDetail?.latitude,
                            ),
                            longitude: parseFloat(
                              polresDetail.polresDetail?.longitude,
                            ),
                          });
                      }}
                      style={{
                        backgroundColor: '#386BF6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          paddingVertical: 16,
                          color: 'white',
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        Petunjuk Arah
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: '#1E3B84',
                          fontSize: widthPercentageToDP('5%'),
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        Detail Lokasi
                      </Text>
                      <Text
                        style={{
                          fontSize: widthPercentageToDP('4%'),
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        {/* {poldaDetail.poldaDetail?.address} */}
                        {polresDetail.polresDetail?.address}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 6,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            lineHeight: 20,
                            color: '#1E3B84',
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          Lintang
                        </Text>
                        <Text
                          style={{
                            lineHeight: 20,
                            color: '#787878',
                            ...Constanta({
                              font: 'regular',
                            }),
                            fontSize: responsiveFontSize(1.8),
                          }}>
                          {polresDetail.polresDetail?.latitude}
                        </Text>
                      </View>
                      <View style={{flex: 1, marginRight: 5}}>
                        <Text
                          style={{
                            lineHeight: 20,
                            color: '#1E3B84',
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          Bujur
                        </Text>
                        <Text
                          style={{
                            lineHeight: 20,
                            color: '#787878',
                            ...Constanta({
                              font: 'regular',
                            }),
                            fontSize: responsiveFontSize(1.8),
                          }}>
                          {polresDetail.polresDetail?.longitude}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#386BF6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        height: heightPercentageToDP('8.5%'),
                      }}>
                      <SimpanPeta />
                      <Text
                        style={{
                          color: 'white',
                          lineHeight: 20,
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        Simpan
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#386BF6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        height: heightPercentageToDP('8.5%'),
                        marginTop: responsiveHeight(1.5),
                      }}
                      onPress={() => modalizeShare.current.open()}>
                      <BagikanPeta />
                      <Text
                        style={{
                          color: 'white',
                          lineHeight: 20,
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        Bagikan
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </Modalize>
      </Portal>
      <Modalshare ref={modalizeShare} />
    </>
  );
});
