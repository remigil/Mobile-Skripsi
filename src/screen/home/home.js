import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  IconEditData,
  IconSilangIco,
  IsiFormulir,
  TambahKendaraan,
  Logo,
} from '../../assets/Assets';
import {BaseContainer,
  TouchableGradient,
  TouchableWithoutGradient,
  TouchebleDisable,} from '../../component';
import FilterAddOnHome from './addOnHome/filterAddOnHome';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default props => {
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'BOGOR NGAWAS',
        titleStyle: {
          color: '#FFFFFF',
          backgrounColor: '#01796F',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.openDrawer();
        },
      }}
      {...props}>
      <View
        style={{
          flex: 1,
          height: heightPercentageToDP('100%'),
        }}>
        <ImageBackground
          source={require('../../assets/Hometampilan.png')}
          resizeMode="cover"
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            flex: 1,
            position: 'absolute',
          }}>
          <View
            style={{
              flex: 1,
              borderBottomLeftRadius: 19,
              borderBottomRightRadius: 19,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 25,
            }}>
            <ImageBackground
          source={require('../../assets/tugu_kujang1.jpg')}
          resizeMode="cover"
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: heightPercentageToDP('30%'),
                width: widthPercentageToDP('100%'),
                borderWidth: 1,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 12,
                right: 8,
              }}>
              {/* <IconFullMap /> */}
            </View>
          </View>
          <View>
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                top: -23,
                left: 0,
                right: 0,
                elevation: 30,
              }}>
              <Pressable
                style={{
                  backgroundColor: '#01796F',
                  width: widthPercentageToDP('80%'),
                  justifyContent: 'center',
                  paddingHorizontal: 25,
                  paddingVertical: 15,
                  borderRadius: 14,
                  elevation: 30,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    alignItems: 'center',
                  }}>
                  - SELAMAT DATANG WARGA KOTA BOGOR -
                </Text>
              </Pressable>
              
            </View>
            <View
              style={{
                // flex: 1,
                borderBottomLeftRadius: 23,
                borderBottomRightRadius: 23,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: widthPercentageToDP('10%'),
                paddingVertical: heightPercentageToDP('7%'),
              }}>
                 <Text
                  style={{
                    color: '#01796F',
                    alignItems: 'center',
                  }}>
                  - DEAR MASYARAKAT KOTA BOGOR - 
                  </Text>

            </View>
            <View
              style={{
                // flex: 1,
                alignItems: 'center',
                top: -30,
                // left: 0,
                // right: 0,
                textAlign: 'justify',
                paddingHorizontal: widthPercentageToDP('5%'),
              }}>
                 <Text
                  style={{
                    color: '#01796F',
                    fontsize: 15,
                    alignItems: 'center',
                    textAlign: 'justify',
                  }}>
                   Aplikasi Bogor Ngawas hadir untuk mempermudah Masyarakat Kota Bogor dalam 
                   mencari rute perjalanan yang memanfaatkan layanan Location Based Service 
                   (LBS)yang disediakan penyedia layanan internet serta telah menggabungkannya 
                   dengan Global Positioning System (GPS) yang terdapat pada perangkat smartphone anda.
                  </Text>
            </View>
              <View
                style={{
                  width: widthPercentageToDP('100%'),
                  alignItems: 'center',
                  top: -100,
                }}>
                <Logo />
              </View>
          </View>
        </View>
      </View>
    </BaseContainer>
  );
};

 {/* <TouchableOpacity
          style={{
            width: 250,
            height: 46,
            backgroundColor: '#01796F',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
          }}
          onPress={() => props.navigation.navigate('DetailScreen')}>
          <Text style={{color: 'white', size: 15}}>Informasi</Text>
          </TouchableOpacity> */}