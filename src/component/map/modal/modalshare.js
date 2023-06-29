import React, {createRef, forwardRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Portal} from 'react-native-portalize';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import {
  CircleChat,
  CircleShare,
  CircleTwitter,
  CircleWA,
  SalinLink,
} from '../../../assets/Assets';

const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default forwardRef(({cctvDetail, direction, ...props}, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const modalizeRef = createRef(Modalize);
  const combinedRef = useCombinedRefs(ref, modalizeRef);

  return (
    <>
      <Portal>
        <Modalize
          ref={combinedRef}
          withHandle={true}
          modalHeight={heightPercentageToDP('50%')}
          handlePosition="inside"
          handleStyle={{
            backgroundColor: '#01796F',
          }}
          HeaderComponent={
            <View
              style={{
                paddingHorizontal: widthPercentageToDP('4%'),
              }}></View>
          }
          modalStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: '#FEFEFE',
          }}>
          <View style={{flex: 1, marginTop: 26, marginHorizontal: 16}}>
            <Text style={{color: '#3D5A80'}}>Bagikan Dengan</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: heightPercentageToDP('4%'),
              }}>
              <View>
                <TouchableOpacity>
                  <CircleChat />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#3D5A80',
                    textAlign: 'center',
                    marginTop: 6,
                  }}>
                  Chat
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <CircleWA />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#3D5A80',
                    textAlign: 'center',
                    marginTop: 6,
                  }}>
                  WA
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <CircleTwitter />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#3D5A80',
                    textAlign: 'center',
                    marginTop: 6,
                  }}>
                  Twitter
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <CircleShare />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#3D5A80',
                    textAlign: 'center',
                    marginTop: 6,
                  }}>
                  Share
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                marginTop: heightPercentageToDP('5%'),
              }}>
              <Text
                style={{
                  color: '#3D5A8080',
                  textAlign: 'center',
                }}>
                Atau bagikan dengan link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: heightPercentageToDP('3%'),
                backgroundColor: '#9D9D9D0A',
                justifyContent: 'center',
                paddingVertical: 16,
                borderRadius: 10,
                // alignSelf: 'flex-end',
              }}>
              <View style={{alignSelf: 'flex-end', marginRight: 10}}>
                <SalinLink />
              </View>
            </TouchableOpacity>
          </View>
        </Modalize>
      </Portal>
    </>
  );
});
