import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  IconEditData,
  IconSilangIco,
  IsiFormulir,
  TambahKendaraan,
} from '../../../assets/Assets';
import {
  CheckMyTripOn,
  DeleteKendaraan,
  GetKendaraan,
} from '../../../repositories/tripon';
import {
  BaseContainer,
  TouchableGradient,
  TouchableWithoutGradient,
  TouchebleDisable,
} from '../../../component';
import Constanta from '../../../lib/Constanta';
import {BasicAlertProps} from '../../../component/container/dialogContainer';
import {decryptResponseAPI} from '../../../lib/decrptyResponApi';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export default props => {
  const scrWidth = Dimensions.get('screen').width;
  const scrHeight = Dimensions.get('screen').height;

  let lebarGambar,
    tinggiGambar = {};

  if (scrWidth > 411 || scrHeight <= 731) {
    lebarGambar = {width: widthPercentageToDP('41.5%')};
    tinggiGambar = {height: heightPercentageToDP('30%')};
  } else {
    lebarGambar = {width: widthPercentageToDP('42%')};
    tinggiGambar = {height: heightPercentageToDP('22%')};
  }
  const [isLoading, setIsLoading] = useState(false);
  const getKendaraan = () => {
    setIsLoading(true);
    GetKendaraan()
      .then(succ => {
        console.log({succ});
        setDataKendaraan(succ.data.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefresh(false);
      });
  };
  useEffect(() => {
    getKendaraan();
  }, []);

  const [isRefresh, setIsRefresh] = useState(false);
  const [formulirReady, setFormulirReady] = useState(false);

  const deleteKendaraanFunc = id => {
    DeleteKendaraan(id)
      .then(del => {
        setIsRefresh(true);
        getKendaraan();
      })
      .catch(() => {})
      .finally(() => {});
  };
  const deleteAction = id => {
    setBasicAlertProps({
      basicAlertVisible: true,
      basicAlertShowButton: true,
      withTitle: true,
      basicAlertTitle: 'Yakin Data Kendaraan akan anda hapus?',
      basicAlertMessage: '',
      basicAlertOnOk: () => {
        setBasicAlertProps({
          ...basicAlertProps,
          basicAlertVisible: false,
          basicAlertTitle: null,
          basicAlertMessage: null,
          iconClose: false,
        });
        deleteKendaraanFunc(id);
      },
      basicAlertOnClosed: () => {
        setBasicAlertProps({
          ...basicAlertProps,
          basicAlertVisible: false,
          basicAlertTitle: null,
          basicAlertMessage: null,
          iconClose: false,
        });
      },
      basicAlertOkBtnOnly: false,
      basicAlertBtnOkText: 'Hapus',
      basicAlertBtnClosedText: 'Batal',
    });
  };
  const initState = {
    dataKendaraan: props.route.params != undefined ? [props.route.params] : [],
  };

  const [dataKendaraan, setDataKendaraan] = useState(initState.dataKendaraan);
  const [refreshIndicator, setRefreshIndicator] = useState(false);
  const refresh = props.route.params;
  const [basicAlertProps, setBasicAlertProps] = useState(BasicAlertProps);
  useEffect(() => {
    getKendaraan();
  }, [refresh]);
  useEffect(() => {
    CheckMyTripOn()
      .then(myTrip => {
        console.log({myTrip});
        if (myTrip.data) {
          setFormulirReady(false);
        } else {
          setFormulirReady(true);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <BaseContainer
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      withActionBar={true}
      actionBarProps={{
        title: 'Trip On',
        titleStyle: {
          color: 'white',
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
          ...Constanta({
            font: 'semibold',
          }),
        },
        onBackPressed: () => {
          props.navigation.openDrawer();
        },
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshIndicator}
              onRefresh={getKendaraan}
            />
          }>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                ...Constanta({
                  font: 'semibold',
                }),
                fontSize: widthPercentageToDP('6%'),
                marginVertical: heightPercentageToDP('2%'),
              }}>
              Data Kendaraan
            </Text>

            {dataKendaraan.length ? (
              <ScrollView
                style={{
                  height: responsiveHeight(60),
                  // backgroundColor: 'red',
                  width: widthPercentageToDP('100%'),
                  zIndex: -1,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingHorizontal: widthPercentageToDP('8%'),
                    paddingBottom: heightPercentageToDP('2%'),
                  }}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      ...Constanta({
                        font: 'semibold',
                      }),
                      color: 'black',
                    }}>
                    Trip On merupakan fitur yang akan menemani perjalanan anda.
                    Trip On memberikan info tentang rute, lama tempuh
                    perjalanan, lalu lintas, keberadaan CCTV, fasilitas umum ,
                    dan banyak lagi.
                  </Text>
                </View>
                {dataKendaraan.length ? (
                  dataKendaraan.map((kendaraan, indexKen) => (
                    <View
                      key={indexKen}
                      style={{
                        width: widthPercentageToDP('85%'),
                        borderWidth: 1,
                        borderColor: '#E5E3FF',
                        marginVertical: 10,
                        paddingHorizontal: widthPercentageToDP('5%'),
                        paddingVertical: heightPercentageToDP('2%'),
                        borderRadius: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              color: '#4E4E4E',
                              ...Constanta({
                                font: 'regular',
                              }),
                            }}>
                            {kendaraan.no_vehicle}
                          </Text>
                          <Text
                            style={{
                              color: '#4E4E4E',
                              ...Constanta({
                                font: 'regular',
                              }),
                            }}>
                            {/* {kendaraan.tipe_kendaraan_title} */}
                            {kendaraan?.type_vehicle?.type_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignSelf: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate(
                                'tripon.profilKendaraan',
                                kendaraan,
                              );
                            }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                            }}>
                            <Text
                              style={{
                                ...Constanta({
                                  font: 'regular',
                                }),
                              }}>
                              Edit Data{' '}
                            </Text>
                            <IconEditData />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          right: -widthPercentageToDP('2'),
                          top: -heightPercentageToDP('1'),
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            deleteAction(kendaraan.id);
                          }}>
                          <IconSilangIco />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </ScrollView>
            ) : (
              <>
                <View
                  style={{
                    paddingHorizontal: widthPercentageToDP('8%'),
                    paddingBottom: heightPercentageToDP('2%'),
                  }}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      ...Constanta({
                        font: 'semibold',
                      }),
                      color: 'black',
                    }}>
                    Trip On merupakan fitur yang akan menemani perjalanan anda.
                    Trip On memberikan info tentang rute, lama tempuh
                    perjalanan, lalu lintas, keberadaan CCTV, fasilitas umum ,
                    dan banyak lagi.
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/tripon/icon-tidak-ada-data.png')}
                  resizeMode="contain"
                  style={{
                    ...lebarGambar,
                    ...tinggiGambar,
                  }}
                />
                <Text
                  style={{
                    color: '#4E4E4E',
                    fontSize: widthPercentageToDP('6%'),
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Belum ada Kendaraan Terdaftar
                </Text>
              </>
            )}

            <View
              style={{
                flexDirection: 'row',
                width: widthPercentageToDP('100%'),
                justifyContent: 'space-evenly',
                // justifyContent: 'space-around',
                marginVertical: heightPercentageToDP('2%'),
              }}>
              <TouchableGradient
                title={'Kendaraan Baru'}
                icon={<TambahKendaraan />}
                onPressData={() =>
                  props.navigation.navigate('tripon.profilKendaraan')
                }
                {...props}
              />
              {dataKendaraan?.length ? (
                <TouchableWithoutGradient
                  title={'Isi Formulir'}
                  icon={
                    <Image
                      source={require('../../../assets/tripon/tambah_formulir.png')}
                      style={{
                        width: 17.5,
                        height: 20,
                      }}
                    />
                  }
                  redirect={'tripon.tanggalKeberangkatan'}
                  {...props}
                />
              ) : (
                <TouchebleDisable
                  title={'Isi Formulir'}
                  icon={<IsiFormulir />}
                  {...props}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </BaseContainer>
  );
};
