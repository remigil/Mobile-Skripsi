import React, {createRef, forwardRef, useRef, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import {CloseModalize} from '../../../assets/Assets';
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

export default forwardRef(({troublespotDetail, direction, ...props}, ref) => {
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
          modalHeight={heightPercentageToDP('72%')}
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
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={{
              height: heightPercentageToDP('75%'),
              flex: 1,
            }}>
            <View
              style={{
                marginTop: 6,
                backgroundColor: '#FFE5E5',
                paddingVertical: 12,
              }}>
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginHorizontal: widthPercentageToDP('3%'),
                }}>
                {/* POLDA METRO JAYA */}
                {troublespotDetail.troublespotDetail?.reporter_name}
              </Text>
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: 14,
                  marginHorizontal: widthPercentageToDP('3%'),
                }}>
                Jakarta Selatan
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginHorizontal: widthPercentageToDP('3%'),
                position: 'relative',
              }}>
              <View
                style={{
                  paddingTop: heightPercentageToDP('2%'),
                }}>
                <Text style={{color: '#01796F', fontSize: 14}}>
                  Lokasi TroubleSpot
                </Text>
                <View
                  style={{
                    backgroundColor: '#FCFDFF',
                    borderColor: '#CDD1E0',
                    borderWidth: 1,
                    paddingVertical: 20,
                    borderRadius: 6,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      color: '#787878',
                      marginHorizontal: 8,
                      lineHeight: 20,
                    }}>
                    {/* Jalan Gandaria No.25-27, RT.1/RW.9, Kramat Pela, Kec. Kby.
                  Baru, Kota Jakarta Selatan */}
                    {troublespotDetail.troublespotDetail?.location}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingTop: heightPercentageToDP('2%'),
                }}>
                <Text style={{color: '#01796F', fontSize: 14}}>Masalah</Text>
                <View
                  style={{
                    backgroundColor: '#FCFDFF',
                    borderColor: '#CDD1E0',
                    borderWidth: 1,
                    paddingVertical: 20,
                    borderRadius: 6,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      color: '#787878',
                      marginHorizontal: 8,
                      lineHeight: 20,
                    }}>
                    {'\u2022'} {troublespotDetail.troublespotDetail?.problem}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingTop: heightPercentageToDP('2%'),
                }}>
                <Text style={{color: '#01796F', fontSize: 14}}>Penyebab</Text>
                <View
                  style={{
                    backgroundColor: '#FCFDFF',
                    borderColor: '#CDD1E0',
                    borderWidth: 1,
                    paddingVertical: 20,
                    borderRadius: 6,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      color: '#787878',
                      marginHorizontal: 8,
                      lineHeight: 20,
                    }}>
                    {'\u2022'} {troublespotDetail.troublespotDetail?.problem}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modalize>
      </Portal>
    </>
  );
});
