import React, {createRef, forwardRef, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BagikanPeta, CloseModalize, SimpanPeta} from '../../../assets/Assets';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import {ActivityIndicator} from 'react-native-paper';
import Modalshare from './modalshare';
import {GetGooglePlace} from '../../../repositories/map';
import {Portal} from 'react-native-portalize';

const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default forwardRef(({placeId, direction, ...props}, ref) => {
  const [placeData, setPlaceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const modalizeRef = createRef(Modalize);
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const modalizeShare = useRef(null);
  useEffect(() => {
    setIsLoading(true);
    GetGooglePlace({
      place_id: placeId,
    })
      .then(data => {
        setPlaceData(data.data);
      })
      .catch(error => {
        console.log({error});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [placeId]);
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
                      fontWeight: 'bold',
                    }}>
                    {placeData?.name_place}
                  </Text>
                  {/* <Text style={{color: '#4E4E4E', fontSize: 14}}>
                {cctvDetail.cctvDetail?.address_cctv}
              </Text> */}
                </View>
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: widthPercentageToDP('35%'),
                    marginHorizontal: widthPercentageToDP('4%'),
                    justifyContent: 'center',
                    marginVertical: widthPercentageToDP('3%'),
                  }}>
                  <View
                    style={{
                      borderColor: '#FFFFFF',
                      borderWidth: 3.8,
                      borderStyle: 'dashed',
                      height: widthPercentageToDP('30%'),
                      marginHorizontal: widthPercentageToDP('2%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: widthPercentageToDP('10%'),
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      Image {'\n'} Not Found
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 9}}>
                  <View style={{flex: 3, marginRight: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        combinedRef.current.close();
                        direction && direction(true);
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
                        }}>
                        Detail Lokasi
                      </Text>
                      <Text
                        style={{
                          fontSize: widthPercentageToDP('4%'),
                        }}>
                        {placeData?.detail_alamat}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 6,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 1}}>
                        <Text style={{lineHeight: 20, color: '#1E3B84'}}>
                          Lintang
                        </Text>
                        <Text style={{lineHeight: 20, color: '#787878'}}>
                          {placeData?.coordinate?.lat}
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={{lineHeight: 20, color: '#1E3B84'}}>
                          Bujur
                        </Text>
                        <Text style={{lineHeight: 20, color: '#787878'}}>
                          {placeData?.coordinate?.lng}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
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
                      <Text style={{color: 'white', lineHeight: 20}}>
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
                      }}
                      onPress={() => modalizeShare.current.open()}>
                      <BagikanPeta />
                      <Text style={{color: 'white', lineHeight: 20}}>
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
