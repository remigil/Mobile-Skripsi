import React, {createRef, forwardRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import {
  IconDigitalKorlantas,
  IconDIS,
  IconEri,
  IconEtilang,
  IconIRMS,
  IconRasirosa,
  IconSBST,
} from '../../../assets/Assets';
import {Portal} from 'react-native-portalize';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
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

export default forwardRef(({...props}, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const modalizeRef = createRef(Modalize);
  const combinedRef = useCombinedRefs(ref, modalizeRef);

  return (
    <Portal>
      <Modalize
        ref={combinedRef}
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
                flexDirection: 'row',
                marginHorizontal: responsiveWidth(5),
                flexWrap: 'wrap',
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(1),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(10),
                    backgroundColor: '#F5F6FA',
                    borderRadius: responsiveWidth(20),
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IconRasirosa}
                    style={{
                      width: responsiveWidth(18),
                      height: responsiveHeight(5),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    marginVertical: responsiveHeight(1),
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  RASIROSA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(1),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(10),
                    backgroundColor: '#F5F6FA',
                    borderRadius: responsiveWidth(20),
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IconIRMS}
                    style={{
                      width: responsiveWidth(18),
                      height: responsiveHeight(5),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    marginVertical: responsiveHeight(1),
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  IRMS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(1),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(10),
                    backgroundColor: '#F5F6FA',
                    borderRadius: responsiveWidth(20),
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IconEtilang}
                    style={{
                      width: responsiveWidth(18),
                      height: responsiveHeight(5),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    marginVertical: responsiveHeight(1),
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  E-TILANG
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(1),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(10),
                    backgroundColor: '#F5F6FA',
                    borderRadius: responsiveWidth(20),
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IconEri}
                    style={{
                      width: responsiveWidth(18),
                      height: responsiveHeight(5),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    marginVertical: responsiveHeight(1),
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  ERI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(1),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(10),
                    backgroundColor: '#F5F6FA',
                    borderRadius: responsiveWidth(20),
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IconSBST}
                    style={{
                      width: responsiveWidth(18),
                      height: responsiveHeight(5),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    marginVertical: responsiveHeight(1),
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  SBST ONLINE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(1),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(10),
                    backgroundColor: '#F5F6FA',
                    borderRadius: responsiveWidth(20),
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IconDigitalKorlantas}
                    style={{
                      width: responsiveWidth(18),
                      height: responsiveHeight(5),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    marginVertical: responsiveHeight(1),
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: responsiveFontSize(1.6),
                    textAlign: 'center',
                  }}>
                  DIGITAL {`\n`}KORLANTAS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  marginHorizontal: responsiveWidth(1),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: responsiveWidth(20),
                    height: responsiveHeight(10),
                    backgroundColor: '#F5F6FA',
                    borderRadius: responsiveWidth(20),
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IconDIS}
                    style={{
                      width: responsiveWidth(18),
                      height: responsiveHeight(5),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#4E4E4E',
                    marginVertical: responsiveHeight(1),
                    ...Constanta({
                      font: 'regular',
                    }),
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  DIS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        modalStyle={{}}></Modalize>
    </Portal>
  );
});
