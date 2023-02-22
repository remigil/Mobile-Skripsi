import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  CC_Telepon,
  CC_Wa,
  ChevronNext,
  IconNextBerita,
  NotifRed,
  NotifWhite,
} from '../../../assets/Assets';
import {BaseContainer} from '../../../component';

export default props => {
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Detail Notifikasi',
        backIconStyle: true,
        titleStyle: {
          color: '#003A91',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.navigate('Notifikasi');
        },
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}></View>
        <View
          style={{
            backgroundColor: '#F0F3FF',
            paddingVertical: heightPercentageToDP('3%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 25,
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              <Text style={{color: 'grey', fontWeight: 'bold'}}>
                PANIC BUTTON
              </Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Kepada Polda Metro Jaya
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: '#4E4E4E'}}>10:30 WIB</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{marginHorizontal: 25}}>
            <View
              style={{
                paddingBottom: 35,
                marginTop: heightPercentageToDP('2%'),
              }}>
              <Text style={{color: '#4E4E4E'}}>Kamis , 10 Agustus 2022</Text>
            </View>
            <View style={{paddingBottom: heightPercentageToDP('10%')}}>
              <Text style={{color: '#4E4E4E'}}>
                Laporan anda telah kami terima, silahkan melakukan panggilan
                yang telah disediakan.
              </Text>
            </View>
            <View style={{paddingBottom: heightPercentageToDP('5%')}}>
              <Text style={{color: '#6574FF', lineHeight: 20}}>
                Telepon admin CALL CENTRE
              </Text>
              <Text
                style={{color: '#6574FF', fontWeight: 'bold', lineHeight: 20}}>
                K3I KORLANTAS
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#D9D9D938',
            paddingVertical: heightPercentageToDP('10%'),
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <View
                style={{
                  width: widthPercentageToDP('40%'),
                  backgroundColor: '#A2C7FD',
                  borderRadius: 28,
                  marginHorizontal: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 18,
                }}>
                <CC_Wa />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#234FA2',
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  Hubungi Polres terdekat{`\n`}VIA{' '}
                  {
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}>
                      WHATSAPP
                    </Text>
                  }
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  width: widthPercentageToDP('40%'),
                  backgroundColor: '#F5D8D8',
                  borderRadius: 28,
                  marginHorizontal: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 18,
                }}>
                <View>
                  <CC_Telepon />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#B81F1F',
                    marginTop: 10,
                    fontSize: 10,
                  }}>
                  Hubungi{' '}
                  {
                    <Text
                      style={{
                        color: '#B81F1F',
                        fontWeight: 'bold',
                        opacity: 10,
                        textAlign: 'center',
                      }}>
                      Hotline
                    </Text>
                  }
                  {`\n`}Polres terdekat
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseContainer>
  );
};
