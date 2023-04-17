import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {IconKembali, IconLanjut, Kapolri} from '../../assets/Assets';

import {BaseContainer} from '../../component';
import Constanta from '../../lib/Constanta';

export default props => {
  const {params: paramsData} = props.route;
  // console.log(paramsData, 'ini list beritaaa harusnyaaaa');
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'BERITA TERKINI',

        backIconStyle: true,
        titleStyle: {
          ...Constanta({
            font: 'semibold',
          }),
          color: 'white',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.navigate('listberita');
        },
        rightIconStyle: false,
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}>
          <View style={{marginHorizontal: widthPercentageToDP('6%')}}>
            <Text
              style={{
                color: '#616161',
                fontSize: 16,
                ...Constanta({
                  font: 'bold',
                }),
                marginVertical: heightPercentageToDP('3%'),
              }}>
              {/* Pelantikan KAKORLANTAS baru */}
              {paramsData.title}
            </Text>
            <View>
              {/* <Image
                style={{
                  width: widthPercentageToDP('85%'),
                  height: heightPercentageToDP('25%'),
                  borderRadius: 10,
                }}
                source={Kapolri}
                resizeMode={'cover'}
              /> */}
              {paramsData.picture != '' && paramsData.picture != null ? (
                <Image
                  source={{
                    uri:
                      'http://34.128.65.46:3001/uploads/news/' +
                      paramsData.picture,
                  }}
                  style={{
                    borderRadius: 9,
                    width: responsiveWidth(85),
                    height: responsiveHeight(27),
                    // width: responsiveWidth(26),
                    // height: responsiveWidth(26),
                  }}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  style={{
                    width: widthPercentageToDP('85%'),
                    height: heightPercentageToDP('25%'),
                    borderRadius: 10,
                  }}
                  source={Kapolri}
                  resizeMode={'cover'}
                />
              )}

              <Text
                style={{
                  color: '#61616199',
                  marginTop: heightPercentageToDP('2%'),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                {/* 10 November 2021 */}
                {paramsData.date}
              </Text>
            </View>
            <View style={{marginTop: heightPercentageToDP('2%')}}>
              <Text
                style={{
                  textAlign: 'justify',
                  // maxWidth: widthPercentageToDP('85%'),
                  // maxHeight: widthPercentageToDP('55%'),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}
                numberOfLines={16}
                ellipsizeMode="tail">
                {paramsData.content}
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              // position: 'absolute',
              // bottom: heightPercentageToDP('5%'),
              flexDirection: 'row',
              // width: widthPercentageToDP('90%'),
              justifyContent: 'flex-end',
              marginVertical: heightPercentageToDP('2%'),
              marginHorizontal: heightPercentageToDP('2%'),
            }}>
            <TouchableOpacity
              style={{
                height: heightPercentageToDP('5%'),
                borderRadius: 5,
                marginHorizontal: widthPercentageToDP('3%'),
              }}>
              <IconKembali />
            </TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 2,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              1
            </Text>
            <Text
              style={{
                paddingHorizontal: 2,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              2
            </Text>
            <Text
              style={{
                paddingHorizontal: 2,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              3
            </Text>
            <Text
              style={{
                paddingHorizontal: 2,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              4
            </Text>
            <TouchableOpacity
              style={{
                height: heightPercentageToDP('5%'),
                borderRadius: 5,
                marginHorizontal: widthPercentageToDP('3%'),
              }}>
              <IconLanjut />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </BaseContainer>
  );
};
