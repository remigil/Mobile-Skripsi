import React, {useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  BagikanPeta,
  CircleChat,
  CircleShare,
  CircleTwitter,
  CircleWA,
  CloseModalize,
  SalinLink,
  SimpanPeta,
} from '../../assets/Assets';
import {Portal} from 'react-native-portalize';

export default props => {
  const modalizeRef = useRef(null);
  const modalizeShare = useRef(null);
  return (
    <View>
      <Portal>
        <Modalize
          ref={props.ref}
          withHandle={true}
          modalHeight={heightPercentageToDP('65%')}
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
          <View
            style={{
              flex: 1,
              marginHorizontal: widthPercentageToDP('3%'),
              position: 'relative',
            }}>
            <View style={{marginTop: 6}}>
              <Text
                style={{color: '#4E4E4E', fontSize: 20, fontWeight: 'bold'}}>
                {props.title}
              </Text>
              <Text style={{color: '#4E4E4E', fontSize: 14}}>{props.kota}</Text>
            </View>
            <View
              style={{
                paddingTop: heightPercentageToDP('2%'),
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: widthPercentageToDP('10%'),
              }}>
              <Image
                source={props.source}
                resizeMode={'cover'}
                style={{width: widthPercentageToDP('94%')}}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 9}}>
              <View style={{flex: 3, marginRight: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    props.kordinat;
                  }}
                  style={{
                    backgroundColor: '#386BF6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{fontSize: 14, paddingVertical: 16, color: 'white'}}>
                    Petunjuk Arah
                  </Text>
                </TouchableOpacity>
                <View style={{marginTop: 6, flexWrap: 'wrap'}}>
                  <Text style={{lineHeight: 20, color: '#1E3B84'}}>
                    Detail Lokasi Polda
                  </Text>
                  <Text style={{lineHeight: 20, color: '#787878'}}>
                    PQWX+JC Pulo, Kota Jakarta Selatan,{`\n`}Daerah Khusus
                    Ibukota Jakarta
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
                      -6,987675
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{lineHeight: 20, color: '#1E3B84'}}>
                      Bujur
                    </Text>
                    <Text style={{lineHeight: 20, color: '#787878'}}>
                      107,654321
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
                  }}>
                  <SimpanPeta />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#386BF6',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => modalizeShare.current.open()}>
                  <BagikanPeta />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modalize>
      </Portal>
      <Portal>
        <Modalize
          ref={modalizeShare}
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
                  Wa
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
                backgroundColor: 'lightgrey',
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
    </View>
  );
};
