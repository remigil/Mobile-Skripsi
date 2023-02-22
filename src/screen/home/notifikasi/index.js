import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
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
        title: 'Notifikasi',
        backIconStyle: true,
        titleStyle: {
          color: '#003A91',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.goBack();
        },
        rightIconStyle: false,
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            // backgroundColor: 'red',
          }}>
          <Text style={{color: 'grey'}}>Terbaru {'(3}'}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFB8B8',
            paddingBottom: 20,
            borderColor: '#EEEEEE',
            borderWidth: 1,
          }}
          onPress={() => props.navigation.navigate('DetailNotifikasi')}>
          <View style={{alignSelf: 'flex-end', marginTop: 6}}>
            <Text style={{color: 'grey', marginRight: 15}}>Baru Saja</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8,
              marginHorizontal: 20,
            }}>
            <NotifWhite />
            <View style={{marginHorizontal: 25}}>
              <Text style={{color: 'grey'}}>PANIC BUTTON</Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Laporan anda telah kami terima silahkan melakukan panggilan yang
                telah disediakan.
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingBottom: 20, borderColor: '#EEEEEE', borderWidth: 1}}>
          <View style={{alignSelf: 'flex-end', marginTop: 6}}>
            <Text style={{color: 'grey', marginRight: 15}}>Baru Saja</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8,
              marginHorizontal: 20,
            }}>
            <NotifRed />
            <View style={{marginHorizontal: 25}}>
              <Text style={{color: 'grey'}}>PANIC BUTTON</Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Laporan anda telah kami terima silahkan melakukan panggilan yang
                telah disediakan.
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingBottom: 20, borderColor: '#EEEEEE', borderWidth: 1}}>
          <View style={{alignSelf: 'flex-end', marginTop: 6}}>
            <Text style={{color: 'grey', marginRight: 15}}>Baru Saja</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8,
              marginHorizontal: 20,
            }}>
            <NotifRed />
            <View style={{marginHorizontal: 25}}>
              <Text style={{color: 'grey'}}>PANIC BUTTON</Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Laporan anda telah kami terima silahkan melakukan panggilan yang
                telah disediakan.
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            // backgroundColor: 'red',
          }}>
          <Text style={{color: 'grey'}}>Sudah dibaca {'(3}'}</Text>
        </View>
        <TouchableOpacity
          style={{
            paddingBottom: 20,
            backgroundColor: '#EBEBEB',
            borderColor: '#D0D0D0',
            borderWidth: 1,
          }}>
          <View style={{alignSelf: 'flex-end', marginTop: 6}}>
            <Text style={{color: 'grey', marginRight: 15}}>Kemarin</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8,
              marginHorizontal: 20,
            }}>
            <NotifRed />
            <View style={{marginHorizontal: 25}}>
              <Text style={{color: 'grey'}}>PANIC BUTTON</Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Laporan anda telah kami terima silahkan melakukan panggilan yang
                telah disediakan.
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingBottom: 20,
            backgroundColor: '#EBEBEB',
            borderColor: '#D0D0D0',
            borderWidth: 1,
          }}>
          <View style={{alignSelf: 'flex-end', marginTop: 6}}>
            <Text style={{color: 'grey', marginRight: 15}}>Kemarin</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8,
              marginHorizontal: 20,
            }}>
            <NotifRed />
            <View style={{marginHorizontal: 25}}>
              <Text style={{color: 'grey'}}>PANIC BUTTON</Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Laporan anda telah kami terima silahkan melakukan panggilan yang
                telah disediakan.
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  );
};
