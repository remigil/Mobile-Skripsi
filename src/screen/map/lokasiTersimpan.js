import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  ChevronNext,
  Etle,
  Hotel,
  IconCctv,
  IconRumahMakan,
  NotifRed,
  NotifWhite,
  RumahIbadah,
  RumahSakit,
  Spbu,
} from '../../assets/Assets';
import {BaseContainer} from '../../component';

export default props => {
  const datalokasi = [
    {
      id: '1',
      title: 'ETLE-Jagorawi',
      lokasi: 'QRG6+VX Senayan, Kota Jakarta Selatan, ...',
      icon: <Etle />,
    },
    {
      id: '2',
      title: 'Rumah Makan - Aromapadi Cipete',
      lokasi: 'Jalan Gandaria No.25-27, RT.1/RW.9, Kram ...',
      icon: <IconRumahMakan />,
    },
    {
      id: '3',
      title: 'SPBU - SPBU 31.121.04',
      lokasi: 'Jalan Gandaria No.25-27, RT.1/RW.9, Kram ...',
      icon: <Spbu />,
    },
    {
      id: '4',
      title: 'Rumah Sakit -  Jakarta Medical Center',
      lokasi: 'Jalan Gandaria No.25-27, RT.1/RW.9, Kram ...',
      icon: <RumahSakit />,
    },
    {
      id: '5',
      title: 'Hotel -  Js Luwansa Hotel',
      lokasi: 'Blok G, Jl. Rafles No.2, RW.9, Gn. Sahari ...',
      icon: <Hotel />,
    },
    {
      id: '6',
      title: 'Rumah Ibadah - Masjid Agung Al-Azhar',
      lokasi: 'Masjid Agung Al-Azhar, Jl. Sisingamangara ...',
      icon: <RumahIbadah />,
    },
  ];

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Lokasi Tersimpan',
        backIconStyle: true,
        titleStyle: {
          color: '#01796F',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.navigate('Peta');
        },
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            // backgroundColor: 'red',
          }}>
          <Text style={{color: 'grey'}}>Terbaru {'(8}'}</Text>
        </View>
        {datalokasi.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingVertical: heightPercentageToDP('2%'),
              borderColor: '#EEEEEE',
              borderWidth: 1,
            }}
            onPress={() => props.navigation.navigate('DetailNotifikasi')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginHorizontal: 20,
                alignItems: 'center',
              }}>
              <View>{item.icon}</View>
              <View style={{marginHorizontal: 25, justifyContent: 'center'}}>
                <Text style={{color: 'grey'}}>{item.title}</Text>
                <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                  {item.lokasi}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <ChevronNext />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {/* <TouchableOpacity
          style={{
            paddingVertical: heightPercentageToDP('2%'),
            borderColor: '#EEEEEE',
            borderWidth: 1,
          }}
          onPress={() => props.navigation.navigate('DetailNotifikasi')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <IconCctv />
            <View style={{marginHorizontal: 25, justifyContent: 'center'}}>
              <Text style={{color: 'grey'}}>
                Rumah Makan - Aromapadi Cipete
              </Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Jalan Gandaria No.25-27, RT.1/RW.9, Kram ...
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: heightPercentageToDP('2%'),
            borderColor: '#EEEEEE',
            borderWidth: 1,
          }}
          onPress={() => props.navigation.navigate('DetailNotifikasi')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <IconCctv />
            <View style={{marginHorizontal: 25, justifyContent: 'center'}}>
              <Text style={{color: 'grey'}}>SPBU - SPBU 31.121.04</Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Jalan Gandaria No.25-27, RT.1/RW.9, Kram ...
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: heightPercentageToDP('2%'),
            borderColor: '#EEEEEE',
            borderWidth: 1,
          }}
          onPress={() => props.navigation.navigate('DetailNotifikasi')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <IconCctv />
            <View style={{marginHorizontal: 25, justifyContent: 'center'}}>
              <Text style={{color: 'grey'}}>
                Rumah Sakit - Jakarta Medical Center
              </Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Jalan Gandaria No.25-27, RT.1/RW.9, Kram ...
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: heightPercentageToDP('2%'),
            borderColor: '#EEEEEE',
            borderWidth: 1,
          }}
          onPress={() => props.navigation.navigate('DetailNotifikasi')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <IconCctv />
            <View style={{marginHorizontal: 25, justifyContent: 'center'}}>
              <Text style={{color: 'grey'}}>Hotel - Js Luwansa Hotel</Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Blok G, Jl. Rafles No.2, RW.9, Gn. Sahari ...
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: heightPercentageToDP('2%'),
            borderColor: '#EEEEEE',
            borderWidth: 1,
          }}
          onPress={() => props.navigation.navigate('DetailNotifikasi')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <IconCctv />
            <View style={{marginHorizontal: 25, justifyContent: 'center'}}>
              <Text style={{color: 'grey'}}>
                Rumah Ibadah - Masjid Agung Al-Azhar
              </Text>
              <Text style={{color: 'grey', fontSize: 12, lineHeight: 20}}>
                Masjid Agung Al-Azhar, Jl. Sisingamangara ...
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <ChevronNext />
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
    </BaseContainer>
  );
};
