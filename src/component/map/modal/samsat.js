import React, {createRef, forwardRef, useRef, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BagikanPeta, CloseModalize, SimpanPeta} from '../../../assets/Assets';
import {Portal} from 'react-native-portalize';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import Modalshare from './modalshare';
import {ActivityIndicator} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Constanta from '../../../lib/Constanta';
// import { SafeAreaView } from 'react-native-safe-area-context';

const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default forwardRef(({samsatDetail, direction, ...props}, ref) => {
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
          modalHeight={heightPercentageToDP('60%')}
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
                    {samsatDetail.samsatDetail?.name_samsat}
                  </Text>
                  {/* <Text style={{color: '#4E4E4E', fontSize: 14}}>
                {cctvDetail.cctvDetail?.address_cctv}
              </Text> */}
                </View>
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: widthPercentageToDP('45%'),
                    marginHorizontal: widthPercentageToDP('2%'),
                    justifyContent: 'center',
                    marginVertical: widthPercentageToDP('3%'),
                  }}>
                  <View
                    style={{
                      borderColor: '#FFFFFF',
                      borderWidth: 3.8,
                      borderStyle: 'dashed',
                      height: widthPercentageToDP('40%'),
                      marginHorizontal: widthPercentageToDP('2%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(5),
                        color: 'white',
                        textAlign: 'center',
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}>
                      {/* Image {'\n'} Not Found */}
                      Samsat
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 9}}>
                  <View style={{flex: 3, marginRight: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        combinedRef.current.close();
                        direction &&
                          direction({
                            latitude: parseFloat(
                              samsatDetail.samsatDetail?.samsat_lat,
                            ),
                            longitude: parseFloat(
                              samsatDetail.samsatDetail?.samsat_lng,
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
                        {samsatDetail.samsatDetail?.address}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 6,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 1, marginRight: 5}}>
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
                          {samsatDetail.samsatDetail?.samsat_lat}
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
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
                          {samsatDetail.samsatDetail?.samsat_lng}
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
