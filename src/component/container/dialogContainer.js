import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import Modal from 'react-native-modal';
import {iOSColors} from 'react-native-typography';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Constanta from '../../lib/Constanta';
import {CloseModalize} from '../../assets/Assets';
export const BasicAlertProps = {
  basicAlertRef: null,
  basicAlertVisible: false,
  basicAlertTitle: null,
  basicAlertMessage: null,
  basicAlertOnBackdropPress: null,
  basicAlertOnDismiss: null,
  basicAlertOnClosed: null,
  basicAlertOnOk: null,
  basicAlertMessageStyle: {},
  basicAlertBtnClosedText: 'Close',
  basicAlertBtnOkText: 'Ok',
  basicAlertOkBtnOnly: true,
  basicAlertImage: false,
  basicAlertImageSource: '',
  iconClose: true,
  basicAlertShowButton: true,
  withTitle: true,
  place: '',
  address: '',
  distance: false,
  detailPlace: false,
  haversine: '',
};
export default (props = BasicAlertProps) => {
  return (
    <Modal
      ref={props.basicAlertRef}
      onDismiss={props.basicAlertOnDismiss}
      onBackdropPress={props.basicAlertOnBackdropPress}
      isVisible={props.basicAlertVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      customBackdrop={
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor={'#ededed'}
        />
      }>
      <View
        style={{
          padding: widthPercentageToDP('4%'),
        }}>
        <View
          style={[
            {
              padding: 0,
              fontSize: widthPercentageToDP('3%'),
              // opacity: 0.8,
              backgroundColor: '#fff',
              borderRadius: widthPercentageToDP('3%'),
            },
          ]}>
          {props.iconClose ? (
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: responsiveHeight(1.3),
                right: responsiveWidth(3),
                zIndex: 1,
              }}
              onPress={() => props.iconClose && props.iconClose()}>
              <CloseModalize width={25} height={25} />
            </Pressable>
          ) : (
            <></>
          )}
          {props.basicAlertImage ? (
            <Image
              source={props.basicAlertImageSource}
              resizeMode="stretch"
              style={{
                width: widthPercentageToDP('82%'),
                height: heightPercentageToDP('22%'),
                borderTopLeftRadius: widthPercentageToDP('3%'),
                borderTopRightRadius: widthPercentageToDP('3%'),
              }}
            />
          ) : (
            <></>
          )}
          {props.detailPlace ? (
            <View style={{padding: 8, marginBottom: responsiveHeight(1.5)}}>
              <Text
                style={{
                  ...Constanta({
                    font: 'bold',
                  }),
                  color: '#000',
                }}>
                {props.tempat}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.4),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                {props.address}
              </Text>
              {props.distance ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    //   backgroundColor: 'red',
                    marginTop: responsiveWidth(2),
                  }}>
                  <View
                    style={{
                      // marginTop: responsiveWidth(3),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Image
                        source={require('../../assets/icon_pin_point.png')}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: responsiveWidth(1.5),
                      }}>
                      <Text
                        style={{
                          ...Constanta({font: 'regular'}),
                          color: '#01796F',
                          fontSize: responsiveFontSize(1.55),
                        }}>
                        Jarak Dengan lokasi anda sekarang
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        ...Constanta({font: 'regular'}),
                        color: '#01796F',
                        fontSize: responsiveFontSize(1.55),
                      }}>
                      {/* {Haversine({
                    lat1: userLocation.latitude,
                    lon1: userLocation.longitude,
                    lat2: parseFloat(list.latitude),
                    lon2: parseFloat(list.longitude),
                  }).toFixed(2)}{' '} */}
                      {props.haversine} KM
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          ) : (
            <></>
          )}
          {props.withTitle ? (
            <View
              style={{
                padding: widthPercentageToDP('2.5%'),
                borderBottomColor: '#D6D6D6',
                borderBottomWidth: 1,
              }}>
              <View
                style={[
                  {padding: widthPercentageToDP('3%'), paddingHorizontal: 40},
                ]}>
                <Text
                  style={[
                    {
                      color: '#000000',
                      fontSize: widthPercentageToDP('6%'),
                      alignSelf: 'center',
                      textAlign: 'center',
                      marginBottom: responsiveHeight(2.5),
                      ...Constanta({
                        font: 'regular',
                      }),
                    },
                  ]}>
                  {props.basicAlertTitle}
                </Text>
                {props.basicAlertMessage && (
                  <Text
                    style={[
                      {
                        ...props.basicAlertMessageStyle,
                        color: iOSColors.black,
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: responsiveFontSize(1.5),
                        ...Constanta({
                          font: 'regular',
                        }),
                        // ...constanta({
                        //   font: 'regular',
                        // }),
                      },
                    ]}>
                    {props.basicAlertMessage}
                  </Text>
                )}
              </View>
            </View>
          ) : (
            <></>
          )}

          {props.basicAlertShowButton ? (
            <View
              style={{
                flexDirection: props.basicAlertOkBtnOnly ? 'column' : 'row',
              }}>
              {!props.basicAlertOkBtnOnly && (
                <View
                  style={{
                    flex: 1,
                    borderRightColor: '#D6D6D6',
                    borderRightWidth: 1,
                  }}>
                  <Pressable
                    style={[
                      {
                        alignItems: 'center',
                        padding: widthPercentageToDP('3.5%'),
                      },
                    ]}
                    android_ripple={{
                      color: '#aaa',
                      borderless: false,
                    }}
                    onPress={() =>
                      props.basicAlertOnClosed && props.basicAlertOnClosed()
                    }>
                    <View>
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            color: iOSColors.blue,
                            fontSize: widthPercentageToDP('4%'),
                            textTransform: 'uppercase',
                            ...Constanta({
                              font: 'regular',
                            }),
                            textAlign: 'center',
                            // ...constanta({
                            //   font: 'regular',
                            // }),
                          },
                        ]}>
                        {props.basicAlertBtnClosedText}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              )}
              <View style={{flex: props.basicAlertOkBtnOnly ? 0 : 1}}>
                <Pressable
                  style={[
                    {
                      alignItems: 'center',
                      padding: widthPercentageToDP('3.5%'),
                    },
                  ]}
                  android_ripple={{color: '#aaa', borderless: false}}
                  onPress={() =>
                    props.basicAlertOnOk && props.basicAlertOnOk()
                  }>
                  <Text
                    style={[
                      {
                        alignSelf: 'center',
                        color: iOSColors.blue,
                        fontSize: widthPercentageToDP('4%'),
                        textTransform: 'uppercase',
                        ...Constanta({
                          font: 'regular',
                        }),
                        textAlign: 'center',
                        // ...constanta({
                        //   font: 'regular',
                        // }),
                      },
                    ]}>
                    {props.basicAlertBtnOkText}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Modal>
  );
};
