import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
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
} from '../../assets/Assets';
import {BaseContainer,
  TouchableGradient,
  TouchableWithoutGradient,
  TouchebleDisable,} from '../../component';
import FilterAddOnHome from './addOnHome/filterAddOnHome';

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
          source={require('../../assets/background.png')}
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
                  }}>
                  - SELAMAT DATANG WARGA KOTA BOGOR -
                </Text>
              </Pressable>
              
            </View>
            <View
              style={{
                marginVertical: 40,
                // flex: 1,
                borderBottomLeftRadius: 19,
                borderBottomRightRadius: 19,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
         <TouchableGradient
                title={'Informasi'}
                icon={<TambahKendaraan />}
                onPress={() =>
                  props.navigation.navigate('ngawas')
              }
                
            />
            </View>
            <View
              style={{
                // flex: 1,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
         <TouchableGradient
                title={'Perjalanan'}
                icon={<TambahKendaraan />}
                onPress={() =>
                  navigation.navigate('ngawas')
                }
              
            />
            </View>
            <View
              style={{
                // flex: 1,
                borderBottomLeftRadius: 19,
                borderBottomRightRadius: 19,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: widthPercentageToDP('10%'),
                paddingVertical: heightPercentageToDP('4%'),
              }}>
         <TouchableGradient
                title={'Perjalanan'}
                icon={<TambahKendaraan />}
                onPress={() =>
                  props.navigation.navigate('ngawas')
                }
               
            />
            </View>
          </View>
        </View>
      </View>
    </BaseContainer>
  );
};
