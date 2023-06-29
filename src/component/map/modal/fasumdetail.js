import React, {createRef, forwardRef, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Buffer} from 'buffer';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import {BagikanPeta, CloseModalize, SimpanPeta} from '../../../assets/Assets';
import {ActivityIndicator} from 'react-native-paper';
import {Portal} from 'react-native-portalize';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Constanta from '../../../lib/Constanta';

export default forwardRef(
  ({fasumDetail, direction, isLoadImage, photoData, ...props}, ref) => {
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
              backgroundColor: '#01796F',
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
              <SafeAreaView>
                {fasumDetail?.fasumDetail ? (
                  <>
                    <ScrollView
                      nestedScrollEnabled
                      showsVerticalScrollIndicator={false}
                      style={{
                        height: heightPercentageToDP('72%'),
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
                            {fasumDetail.fasumDetail?.fasum_name}
                          </Text>
                          {/* <Text
                            style={{
                              color: '#4E4E4E',
                              fontSize: 14,
                              ...Constanta({
                                font: 'regular',
                              }),
                            }}>
                            {fasumDetail.fasumDetail?.vicinity}
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
                          {photoData.length ? (
                            <Image
                              style={{
                                height: widthPercentageToDP('50%'),
                                // width: widthPercentageToDP('90%'),
                                resizeMode: 'cover',
                              }}
                              source={{
                                uri:
                                  'data:image/jpeg;base64,' +
                                  Buffer.from(photoData).toString('base64'),
                                //data.data in your case
                              }}
                            />
                          ) : (
                            <>
                              {isLoadImage ? (
                                <ActivityIndicator />
                              ) : (
                                <View
                                  style={{
                                    borderColor: '#FFFFFF',
                                    borderWidth: 3.8,
                                    borderStyle: 'dashed',
                                    height: widthPercentageToDP('37%'),
                                    marginHorizontal: widthPercentageToDP('2%'),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: widthPercentageToDP('10%'),
                                      color: 'white',
                                      textAlign: 'center',
                                      ...Constanta({
                                        font: 'regular',
                                      }),
                                      // ...Constanta({font: 'regular'}),
                                    }}>
                                    Image {'\n'} Not Found
                                  </Text>
                                </View>
                              )}
                            </>
                          )}
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 9}}>
                          <View style={{flex: 3, marginRight: 20}}>
                            <TouchableOpacity
                              onPress={() => {
                                combinedRef.current.close();
                                direction &&
                                  direction({
                                    latitude: parseFloat(
                                      fasumDetail.fasumDetail?.fasum_lat,
                                    ),
                                    longitude: parseFloat(
                                      fasumDetail.fasumDetail?.fasum_lng,
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
                            <View style={{marginTop: 10}}>
                              <Text
                                style={{
                                  lineHeight: 20,
                                  color: '#1E3B84',
                                  ...Constanta({
                                    font: 'regular',
                                  }),
                                }}>
                                Detail Lokasi Fasum
                              </Text>
                              <Text
                                style={{
                                  lineHeight: 20,
                                  color: '#787878',
                                  ...Constanta({
                                    font: 'regular',
                                  }),
                                }}>
                                {/* {cctvDetail.cctvDetail?.address_cctv} */}
                                {fasumDetail.fasumDetail?.fasum_address}
                                address fasum
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
                                  {fasumDetail.fasumDetail?.fasum_lat}
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
                                  {fasumDetail.fasumDetail?.fasum_lng}
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
                  </>
                ) : (
                  <></>
                )}
              </SafeAreaView>
            )}
          </Modalize>
        </Portal>
      </>
    );
  },
);
