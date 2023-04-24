import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
  Dimensions,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  AvatarIco,
  IconBelumAdaData,
  IconEditData,
  IconEditPhoto,
  IconHapusSilang,
  IconSilangIco,
  IsiFormulir,
  TambahKendaraan,
} from '../../../assets/Assets';
import {
  BaseContainer,
  TouchableGradient,
  TouchableWithoutGradient,
  TouchebleDisable,
} from '../../../component';
import {ActivityIndicator, Avatar, Divider, List} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {DeleteKendaraan, GetKendaraan} from '../../../repositories/ngawas';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {
  openSettings,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  GetFotoProfil,
  ScanKTP,
  SubmitProfil,
} from '../../../repositories/sidebar';
import {useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import Constanta from '../../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {BasicAlertProps} from '../../../component/container/dialogContainer';
import {API_BASE_URL_TRACK} from '@env';

const FirstRoute = ({...props}) => {
  const [photoData, setPhotoData] = useState('');
  console.log('photo data', photoData);
  const {params: paramsData} = props.route;
  const [isLoading, setIsLoading] = useState(false);
  const cameraPermission = {
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY],
  };

  const fileManagerPermission = {
    android: [
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
    ios: [PERMISSIONS.IOS.MEDIA_LIBRARY],
  };

  const initState = {
    formulir: {
      foto: {
        value: '',
      },
      kategori: {
        value: '',
      },
      keterangan: {
        value: '',
      },
    },
  };

  const [formFormulir, setFormFormulir] = useState(initState.formulir);

  // const AddKtp = fotoktp => {
  //   // setIsLoading(true);
  //   console.log('foto ktpp iniiii', fotoktp);
  //   scanKTP({
  //     fotoktp,
  //   })
  //     .then(succ => {
  //       console.log('hey ktp', succ);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       // setIsLoading(false);
  //     });
  // };

  const AddKtp = fotoprofil => {
    ScanKTP({
      //  foto: fotoprofil,
      foto: fotoprofil,
    })
      .then(succ => {
        //  setIsLoading(true);
        console.log('scan KTP sukses dong pliss', succ);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        //  setIsLoading(false);
      });
  };

  const compProps = {
    mediaType: 'photo',
    saveToPhotos: true,
    title: null,
    containerStyle: {},
    visible: false,
    onDismiss: () => {},
    dismissable: true,
    onCloseBtn: () => {},
    onDone: res => {},
  };

  const [ktpId, setKtpId] = useState({});

  const [dataKTP, setDataKTP] = useState({});

  return (
    <View>
      {formFormulir.foto.value?.uri ? (
        <>
          <ScrollView>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setFormFormulir({
                    ...formFormulir,
                    foto: {
                      value: '',
                    },
                  });
                }}
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  top: 20,
                  zIndex: 9,
                  right: -5,
                  borderRadius: 50,
                  width: 30,
                  height: 30,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconHapusSilang width={40} height={40} />
              </TouchableOpacity>
              <View
                style={{
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderWidth: 2,
                  borderColor: '#01796F',
                  borderStyle: 'dashed',
                  borderRadius: responsiveWidth(6),
                  marginVertical: 10,
                }}>
                <Image
                  source={{uri: photoData?.uri}}
                  resizeMode="cover"
                  style={{
                    width: 'auto',
                    height: responsiveHeight(20),
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    margin: 5,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  marginVertical: widthPercentageToDP('4%'),
                  borderWidth: 1,
                  borderColor: '#01796F',
                  width: widthPercentageToDP('90%'),
                  paddingVertical: widthPercentageToDP('3%'),
                  borderRadius: 4,
                }}
                onPress={() => props.navigation.navigate('Scan')}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: widthPercentageToDP('4.5%'),
                    color: '#01796F',
                  }}>
                  Scan Ulang e-KTP
                </Text>
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    marginTop: 12,

                    color: '#01796F',
                    fontSize: widthPercentageToDP('5%'),
                  }}>
                  Data Diri
                </Text>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        fontSize: widthPercentageToDP('4.5%'),
                      }}>
                      Nama Lengkap
                    </Text>
                    <View
                      style={{
                        width: 321,
                        height: 47,
                        borderColor: '#CDD1E0',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{color: 'black', fontsize: 12, marginLeft: 16}}>
                        Roki Al Akhnafi
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 9,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontsize: 12,
                            marginRight: 7,
                          }}>
                          Edit data
                        </Text>
                        <IconEditData />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        fontSize: widthPercentageToDP('4.5%'),
                      }}>
                      Nomor Induk Kependudukan (NIK)
                    </Text>
                    <View
                      style={{
                        width: 321,
                        height: 47,
                        borderColor: '#CDD1E0',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', size: 12, marginLeft: 16}}>
                        3672819872129741
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 9,
                        }}>
                        <Text
                          style={{color: 'black', size: 12, marginRight: 7}}>
                          Edit data
                        </Text>
                        <IconEditData />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        fontSize: widthPercentageToDP('4.5%'),
                      }}>
                      Tanggal Lahir
                    </Text>
                    <View
                      style={{
                        width: 321,
                        height: 47,
                        borderColor: '#CDD1E0',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', size: 12, marginLeft: 16}}>
                        11 Mei 1989
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 9,
                        }}>
                        <Text
                          style={{color: 'black', size: 12, marginRight: 7}}>
                          Edit data
                        </Text>
                        <IconEditData />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        fontSize: widthPercentageToDP('4.5%'),
                      }}>
                      Kewarganegaraan
                    </Text>
                    <View
                      style={{
                        width: 321,
                        height: 47,
                        borderColor: '#CDD1E0',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', size: 12, marginLeft: 16}}>
                        Warga Negara Indonesia
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 9,
                        }}>
                        <Text
                          style={{color: 'black', size: 12, marginRight: 7}}>
                          Edit data
                        </Text>
                        <IconEditData />
                      </View>
                    </View>
                  </View>
                </View>

                <Text
                  style={{
                    marginTop: 20,
                    marginLeft: 20,
                    color: '#01796F',
                    fontSize: widthPercentageToDP('4.5%'),
                  }}>
                  Data Lainnya
                </Text>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        fontSize: widthPercentageToDP('4.5%'),
                      }}>
                      Nomor SIM
                    </Text>
                    <View
                      style={{
                        width: 321,
                        height: 47,
                        borderColor: '#CDD1E0',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', size: 12, marginLeft: 16}}>
                        3672819872129741
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 9,
                        }}>
                        <Text
                          style={{color: 'black', size: 12, marginRight: 7}}>
                          Edit data
                        </Text>
                        <IconEditData />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        sfontSize: widthPercentageToDP('4.5%'),
                      }}>
                      Email
                    </Text>
                    <View
                      style={{
                        width: 321,
                        height: 47,
                        borderColor: '#CDD1E0',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', size: 12, marginLeft: 16}}>
                        rokik@gmail.com
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 9,
                        }}>
                        <Text
                          style={{color: 'black', size: 12, marginRight: 7}}>
                          Edit data
                        </Text>
                        <IconEditData />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        fontSize: widthPercentageToDP('4.5%'),
                      }}>
                      No Telepon Seluler
                    </Text>
                    <View
                      style={{
                        width: 321,
                        height: 47,
                        borderColor: '#CDD1E0',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginTop: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black', size: 12, marginLeft: 16}}>
                        +62 89631789831
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 9,
                        }}>
                        <Text
                          style={{color: '#000000', size: 12, marginRight: 7}}>
                          Edit data
                        </Text>
                        <IconEditData />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      width: 321,
                      height: 46,
                      backgroundColor: '#01796F',
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 30,
                    }}
                    onPress={() => props.navigation.navigate('SimpanScreen')}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: widthPercentageToDP('4.5%'),
                      }}>
                      Simpan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <FormAkun /> */}
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              marginTop: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(9),
              borderWidth: 2,
              borderColor: '#686565',
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: responsiveWidth(4),
              width: responsiveWidth(80),
            }}>
            <IconBelumAdaData
              width={responsiveWidth(45)}
              height={responsiveWidth(35)}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: responsiveWidth(5),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Belum ada data e-KTP
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: responsiveWidth(4),
              borderWidth: 1,
              borderColor: '#01796F',
              width: responsiveWidth(80),
              height: responsiveHeight(6),
              borderRadius: 4,
              justifyContent: 'center',
            }}
            onPress={async () => {
              // setVisible(true);
              const grantPermissions = await requestMultiple(
                cameraPermission[Platform.OS],
              );
              let isAllGranted = true;
              for (let p of cameraPermission[Platform.OS]) {
                if (grantPermissions[p] !== 'granted') isAllGranted = false;
                break;
              }
              // setVisible(false);
              if (isAllGranted) {
                launchCamera(
                  {
                    mediaType: compProps.mediaType ?? 'photo',
                    saveToPhotos: compProps.saveToPhotos ?? true,
                  },
                  res => {
                    console.log('ini ress', res);
                    if (res?.assets) {
                      setPhotoData(res?.assets[0]);
                      // setFormFormulir({
                      //   ...formFormulir,
                      //   foto: {
                      //     ...formFormulir.foto,
                      //     value: res.assets[0],
                      //   },
                      // });
                      // console.log(
                      //   'ini formmulir foto',
                      //   formFormulir.foto.value,
                      // );
                      AddKtp(res?.assets[0]);

                      // props.onPress(res?.assets[0]);
                    }
                  },
                );
              } else {
                Alert.alert(
                  'Permintaan Akses',
                  'Mohon hidupkan akses ke kamera perangkat Anda',
                  [
                    {
                      text: 'Buka Pengaturan',
                      onPress: async () => {
                        await openSettings();
                      },
                    },
                    {
                      text: 'Nanti',
                    },
                  ],
                );
              }
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: responsiveWidth(5),
                color: '#01796F',
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Scan e-KTP
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const SecondRoute = ({kendaraan, ...props}) => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const scrWidth = Dimensions.get('screen').width;
  const scrHeight = Dimensions.get('screen').height;

  let lebarGambar,
    tinggiGambar = {};

  if (scrWidth > 411 || scrHeight <= 731) {
    lebarGambar = {width: widthPercentageToDP('41.5%')};
    tinggiGambar = {height: heightPercentageToDP('30%')};
  } else {
    lebarGambar = {width: widthPercentageToDP('52%')};
    tinggiGambar = {height: heightPercentageToDP('32%')};
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

  return (
    <BaseContainer
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      withActionBar={false}
      actionBarProps={{
        title: 'Bogor Ngawas',
        titleStyle: {
          color: '#01796F',

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
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(20),
          }}>
          <ActivityIndicator color="#01796F" />
        </View>
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
            {dataKendaraan.length ? (
              <ScrollView
                style={{
                  height: responsiveHeight(120),
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
                                'SimpanScreen',
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
                <Image
                  source={require('../../../assets/ngawas/icon-tidak-ada-data.png')}
                  resizeMode="contain"
                  style={{
                    ...lebarGambar,
                    ...tinggiGambar,
                    marginTop: responsiveHeight(3),
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
                title={'Tambah Kendaraan'}
                icon={<TambahKendaraan />}
                onPressData={() => props.navigation.navigate('tambahData')}
                {...props}
              />
              {dataKendaraan.length ? (
                <>
                  {!formulirReady ? (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: widthPercentageToDP('42%'),
                        height: heightPercentageToDP('5%'),
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#01796F',
                      }}
                      onPress={() => {
                        setBasicAlertProps({
                          basicAlertVisible: true,
                          basicAlertShowButton: true,
                          withTitle: true,
                          basicAlertTitle:
                            'Belum dapat menambahkan Data, Anda Masih Memiliki Data yang terdaftar',
                          basicAlertMessage: '',
                          basicAlertOnOk: () => {
                            setBasicAlertProps({
                              ...basicAlertProps,
                              basicAlertVisible: false,
                              basicAlertTitle: null,
                              basicAlertMessage: null,
                              iconClose: false,
                            });
                            // deleteKendaraanFunc(id);
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
                          basicAlertOkBtnOnly: true,
                          basicAlertBtnOkText: 'Ok',
                          basicAlertBtnClosedText: 'Batal',
                        });
                      }}>
                      <Image
                        source={require('../../../assets/ngawas/tambah_formulir.png')}
                        style={{
                          width: 17.5,
                          height: 20,
                        }}
                      />
                      <Text
                        style={{
                          ...Constanta({
                            font: 'semibold',
                          }),
                          marginLeft: 10,
                        }}>
                        Isi Formulir
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableWithoutGradient
                      title={'Isi Formulir'}
                      icon={
                        <Image
                          source={require('../../../assets/ngawas/tambah_formulir.png')}
                          style={{
                            width: 17.5,
                            height: 20,
                          }}
                        />
                      }
                      redirect={'ngawas.tanggalKeberangkatan'}
                      {...props}
                    />
                  )}
                </>
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

export default props => {
  const renderScene = SceneMap({
    first: () => <FirstRoute {...props} />,
    second: () => <SecondRoute {...props} />,
  });
  const {auth} = useSelector(state => state);
  const [modalProfil, setModalProfil] = useState(false);
  const [modalFotoProfil, setModalFotoProfil] = useState(false);
  const [photoData, setPhotoData] = React.useState('');
  console.log('isi photodata', photoData);
  const modalizeProfil = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const cameraPermission = {
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY],
  };

  const fileManagerPermission = {
    android: [
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
    ios: [PERMISSIONS.IOS.MEDIA_LIBRARY],
  };

  const refresh = props.route.params;
  const [isRefresh, setIsRefresh] = useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Data Diri'},
    {key: 'second', title: 'Data Kendaraan'},
  ]);
  const layout = useWindowDimensions();

  const initState = {
    // dataKendaraan: props.route.params != undefined ? [props.route.params] : [],
    formulir: {
      foto: {
        value: '',
      },
    },
  };
  // console.log('pliss ada dongg', initState.formulir.foto);
  // console.log('setformformulir', setFormFormulir);
  const [formFormulir, setFormFormulir] = useState(initState.formulir);

  const compProps = {
    mediaType: 'photo',
    saveToPhotos: true,
    title: null,
    containerStyle: {},
    visible: false,
    onDismiss: () => {},
    dismissable: true,
    onCloseBtn: () => {},
    onDone: res => {},
  };

  const EditFotoProfil = fotoprofil => {
    SubmitProfil({
      foto: fotoprofil,
    })
      .then(succ => {
        setIsLoading(true);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getFotoProfil = () => {
    GetFotoProfil()
      .then(success => {
        setIsLoading(true);
        setFotoNih(success.data.data);
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
    setIsLoading(true);
    getFotoProfil();
  }, []);

  const [fotonih, setFotoNih] = useState({});
  console.log('fotonih pokonyaa', fotonih.foto);

  const [basicAlertProps, setBasicAlertProps] = useState(BasicAlertProps);

  return (
    <BaseContainer
      withActionBar={true}
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      actionBarProps={{
        title: 'Akun Saya',
        backIconStyle: true,
        titleStyle: {
          color: '#FFF',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.goBack();
        },
      }}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: responsiveWidth(5),
        }}>
        {fotonih.foto ? (
          <TouchableOpacity
            onPress={() => {
              setModalProfil(true);
            }}>
            <Avatar.Image
              source={{
                uri:
                  photoData?.uri ||
                  `${API_BASE_URL_TRACK}uploads/society/` + fotonih.foto,
              }}
              size={130}
            />
          </TouchableOpacity>
        ) : (
          <>
            <View>
              <AvatarIco
                height={responsiveWidth(30)}
                width={responsiveWidth(30)}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 4,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalProfil(true);
                  }}>
                  <IconEditPhoto
                    height={responsiveWidth(6)}
                    width={responsiveWidth(6)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '400',
            color: '#28292D',
            marginTop: responsiveHeight(2),
            fontSize: responsiveWidth(5),
            ...Constanta({
              font: 'regular',
            }),
          }}>
          {auth?.userData?.getProfile?.person_name}
          {/* Danu Maulana */}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '400',
            color: '#01796F',
            fontSize: responsiveWidth(4),
            ...Constanta({
              font: 'regular',
            }),
          }}>
          Data Kendaraan Belum Lengkap
        </Text>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{
          marginTop: responsiveWidth(5),
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            labelStyle={{
              color: '#01796F',
            }}
            style={{
              backgroundColor: 'white',
            }}
            indicatorStyle={{
              backgroundColor: '#01796F',
              height: 2,
            }}
          />
        )}
        initialLayout={{width: layout.width}}
      />

      <Modal
        isVisible={modalProfil}
        animationIn={'zoomIn'}
        animationInTiming={500}
        animationOut={'zoomOut'}
        animationOutTiming={500}
        onBackdropPress={() => {
          setModalProfil(false);
        }}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            // paddingVertical: 16,
            justifyContent: 'center',
            // alignItems: 'center',
            borderRadius: 14,
            width: responsiveWidth(60),
          }}>
          <TouchableOpacity
            style={
              {
                // paddingBottom: heightPercentageToDP('1%'),
                // justifyContent: 'center',
              }
            }
            onPress={() => {
              setTimeout(() => {
                setModalFotoProfil(true);
              }, 1000);
              setModalProfil(false);
              // setModalFotoProfil(true);
              // setModalProfil(false);
            }}>
            <Text
              style={{
                color: '#01796F',
                alignItems: 'center',
                paddingVertical: 10,
                textAlign: 'center',
                fontSize: 17,
              }}>
              Lihat Foto Profil
            </Text>
            <Divider />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              {
                // paddingBottom: heightPercentageToDP('1%'),
              }
            }
            onPress={() => {
              setTimeout(() => {
                modalizeProfil.current.open();
              }, 1000);
              setModalProfil(false);
            }}>
            <Text
              style={{
                color: '#01796F',
                paddingVertical: 10,
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 17,
              }}>
              Ganti Foto Profil
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modalFotoProfil}
        animationIn={'zoomIn'}
        animationInTiming={500}
        animationOut={'zoomOut'}
        animationOutTiming={500}
        onBackdropPress={() => {
          setModalFotoProfil(false);
        }}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{
            width: responsiveWidth(60),
            height: responsiveHeight(30),
          }}
          source={{
            uri:
              photoData?.uri ||
              `${API_BASE_URL_TRACK}uploads/society/` + fotonih.foto,
          }}
          resizeMode={'cover'}
          borderRadius={14}></ImageBackground>
      </Modal>
      <Modalize
        ref={modalizeProfil}
        withHandle={true}
        modalHeight={responsiveHeight(48)}
        handlePosition="inside"
        handleStyle={{
          backgroundColor: '#135AAC',
        }}
        HeaderComponent={
          <View
            style={{
              paddingHorizontal: responsiveWidth(4),
            }}></View>
        }
        modalStyle={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: '#FEFEFE',
        }}>
        <View
          style={{
            flex: 1,
            marginTop: responsiveHeight(6),
            marginHorizontal: responsiveWidth(5),
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(4),
                ...Constanta({
                  font: 'semibold',
                }),
              }}>
              Upload Foto
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: responsiveFontSize(1.5),
                marginTop: responsiveHeight(0.5),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Pilih Metode Yang Anda Inginkan
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: responsiveHeight(5),
              // height: heightPercentageToDP('30%'),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#135AAC',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginVertical: 5,
              }}
              onPress={async () => {
                // setVisible(true);
                const grantPermissions = await requestMultiple(
                  cameraPermission[Platform.OS],
                );
                let isAllGranted = true;
                for (let p of cameraPermission[Platform.OS]) {
                  if (grantPermissions[p] !== 'granted') isAllGranted = false;
                  break;
                }
                // setVisible(false);
                if (isAllGranted) {
                  launchCamera(
                    {
                      mediaType: compProps.mediaType ?? 'photo',
                      saveToPhotos: compProps.saveToPhotos ?? true,
                    },
                    res => {
                      console.log('ini res yaa', res);
                      if (res?.assets) {
                        // console.log('set sat', setPhotoData);
                        setPhotoData(res?.assets[0]);
                        // setFormFormulir(
                        //   (initState.formulir.foto.value = res?.assets[0]),
                        // );
                        // props.onPress(res?.assets[0]);
                        EditFotoProfil(res?.assets[0]);
                      }
                    },
                  );
                } else {
                  Alert.alert(
                    'Permintaan Akses',
                    'Mohon hidupkan akses ke kamera perangkat Anda',
                    [
                      {
                        text: 'Buka Pengaturan',
                        onPress: async () => {
                          await openSettings();
                        },
                      },
                      {
                        text: 'Nanti',
                      },
                    ],
                  );
                }
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  // marginTop: 6,
                  paddingVertical: responsiveHeight(2),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Buka Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#135AAC',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginVertical: 5,
                ...Constanta({
                  font: 'regular',
                }),
              }}
              onPress={async () => {
                // setVisible(true);
                const grantPermissions = await requestMultiple(
                  fileManagerPermission[Platform.OS],
                );
                let isAllGranted = true;
                for (let p of fileManagerPermission[Platform.OS]) {
                  if (grantPermissions[p] !== 'granted') isAllGranted = false;
                  break;
                }
                // setVisible(false);
                if (isAllGranted) {
                  launchImageLibrary(
                    {
                      mediaType: compProps.mediaType ?? 'photo',
                      saveToPhotos: compProps.saveToPhotos ?? true,
                    },
                    res => {
                      console.log('ini res yaa', res);
                      if (res?.assets) {
                        // console.log('set sat', setPhotoData);
                        setPhotoData(res?.assets[0]);

                        EditFotoProfil(res?.assets[0]);
                      }
                    },
                  );
                  // props.navigation.navigate('SimpanScreen');
                  // {
                  //   mediaType: compProps.mediaType ?? 'photo',
                  //   saveToPhotos: compProps.saveToPhotos ?? true,
                  // },
                  // res => {
                  //   if (res?.assets) {
                  //     setPhotoData(res?.assets[0]);
                  //     setFormFormulir({
                  //       ...formFormulir,
                  //       foto: {
                  //         ...formFormulir.foto,
                  //         value: res?.assets[0],
                  //       },
                  //     });
                  //     // props.onPress(res?.assets[0]);
                  //   }
                  // },
                } else {
                  Alert.alert(
                    'Permintaan Akses',
                    'Mohon hidupkan akses ke kamera perangkat Anda',
                    [
                      {
                        text: 'Buka Pengaturan',
                        onPress: async () => {
                          await openSettings();
                        },
                      },
                      {
                        text: 'Nanti',
                      },
                    ],
                  );
                }
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  // marginTop: 6,
                  paddingVertical: responsiveHeight(2),
                }}>
                Buka Galeri
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#135AAC',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginVertical: 5,
              }}
              onPress={async () => {
                modalizeProfil.current.close();
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  // marginTop: 6,
                  paddingVertical: responsiveHeight(2),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Kembali
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </BaseContainer>
  );
};
