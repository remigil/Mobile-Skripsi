import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// import {
//   BaseContainer,
//   DropdownOption,
//   TouchableGradient,
// } from '../../component';
import {
  openSettings,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {BlurView} from '@react-native-community/blur';
// import constanta from '../../lib/Constanta';
import Geolocation from 'react-native-geolocation-service';
import {IconCamera, IconHapusSilang} from '../../../assets/Assets';
import {
  BaseContainer,
  DropdownOption,
  InputTextComp,
  TouchableGradient,
} from '../../../component';
import KeyboardAvoiding from '../../../component/form/KeyboardAvoiding';
import Permission from '../../../lib/permission';
import {BasicAlertProps} from '../../../component/container/dialogContainer';
import {SubmitPanicButton} from '../../../repositories/home';

export default props => {
  const [visible, setVisible] = useState(false);
  const [photoData, setPhotoData] = useState('');
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

  // kecelakaan
  // kemacetan
  // tindak kriminal
  const initState = {
    // dataKendaraan: props.route.params != undefined ? [props.route.params] : [],
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
  const [isLoading, setIsLoading] = useState(false);
  const KirimPanicButton = () => {
    setIsLoading(true);

    SubmitPanicButton({
      categori: formFormulir.kategori.value,
      coordinate: userLocation,
      foto: formFormulir.foto.value,
      description: formFormulir.keterangan.value,
    })
      .then(succ => {
        setBasicAlertProps({
          basicAlertVisible: true,
          basicAlertShowButton: true,
          withTitle: true,
          basicAlertTitle: 'Anda telah Berhasil Mengirim Formulir Panic Button',
          basicAlertMessage: '',
          basicAlertOnOk: () => {
            setBasicAlertProps({
              ...basicAlertProps,
              basicAlertVisible: false,
              basicAlertTitle: null,
              basicAlertMessage: null,
              onClose: null,
              iconClose: false,
            });
            props.navigation.goBack();
          },
          basicAlertOnClosed: () => {
            setBasicAlertProps({
              ...basicAlertProps,
              basicAlertVisible: false,
              basicAlertTitle: null,
              basicAlertMessage: null,
              onClose: null,
              iconClose: false,
            });
          },
          basicAlertOkBtnOnly: true,
          basicAlertBtnOkText: 'Keluar',
          // basicAlertBtnClosedText: 'Batalkan',
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [userLocation, setUserLocation] = useState({
    latitude: '',
    longitude: '',
  });
  const getCurrentLocation = () => {
    Permission.requestAll()
      .then(res => {
        if (res.isAllGranted) {
          Geolocation.getCurrentPosition(
            position => {
              let _currLatLng = userLocation;
              _currLatLng.latitude = position.coords.latitude;
              _currLatLng.longitude = position.coords.longitude;
              // setUserLocation(_currLatLng);
              setUserLocation(_currLatLng);
            },
            error => {
              console.log('get_position_error' + error.message);
            },
            {enableHighAccuracy: true, timeout: 20000},
          );
        } else {
          Alert.alert(
            `Akses Perangkat`,
            `Mohon untuk mengaktifkan permintaan akses beberapa fungsi dari perangkat. Mulai kembali aplikasi setelah menaktifkan akses perangkat.`,
            [
              {
                text: 'Pengaturan Akses',
                onPress: () => {
                  openSettings()
                    .then(() => {})
                    .catch(err => {
                      console.log(err);
                    });
                },
                style: 'default',
              },
              {text: 'Tutup', style: 'cancel'},
            ],
            {
              cancelable: true,
            },
          );
        }
      })
      .catch(res => console.log(res));
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const [basicAlertProps, setBasicAlertProps] = useState(BasicAlertProps);
  return (
    <BaseContainer
      withActionBar={true}
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      actionBarProps={{
        title: 'FORMULIR PANIC BUTTON',
        titleStyle: {
          color: '#01796F',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
          // ...constanta({
          //   font: 'bold',
          // }),
        },
        backIconStyle: true,
        onBackPressed: () => {
          // props.navigation.goBack();
          setBasicAlertProps({
            basicAlertVisible: true,
            basicAlertShowButton: true,
            withTitle: true,
            basicAlertTitle: 'Apakah Kamu Yakin Ingin Keluar dari pengisian ?',
            basicAlertMessage: '',
            basicAlertOnOk: () => {
              setBasicAlertProps({
                ...basicAlertProps,
                basicAlertVisible: false,
                basicAlertTitle: null,
                basicAlertMessage: null,
                onClose: null,
                iconClose: false,
              });
              props.navigation.goBack();
            },
            basicAlertOnClosed: () => {
              setBasicAlertProps({
                ...basicAlertProps,
                basicAlertVisible: false,
                basicAlertTitle: null,
                basicAlertMessage: null,
                onClose: null,
                iconClose: false,
              });
            },
            basicAlertOkBtnOnly: false,
            basicAlertBtnOkText: 'Ya',
            basicAlertBtnClosedText: 'Batalkan',
          });
        },
      }}
      {...props}>
      <View
        style={{
          flex: 1,
          //   marginHorizontal: widthPercentageToDP('8%'),
          // margin: widthPercentageToDP('5%'),
        }}>
        <KeyboardAvoiding>
          <View
            style={{
              margin: widthPercentageToDP('5%'),
            }}>
            <Text
              style={{
                fontSize: widthPercentageToDP('5%'),
                color: '#01796F',
                fontWeight: '400',
                // ...constanta({
                //   font: 'regular',
                // }),
              }}>
              Foto Lokasi
            </Text>
            {formFormulir.foto.value?.uri ? (
              <>
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
                    borderRadius: widthPercentageToDP('6%'),
                    marginVertical: 10,
                  }}>
                  <Image
                    source={{uri: photoData?.uri}}
                    resizeMode="cover"
                    style={{
                      width: 'auto',
                      height: heightPercentageToDP('20%'),
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                      margin: 5,
                    }}
                  />
                </View>
              </>
            ) : (
              <TouchableOpacity
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
                        if (res?.assets) {
                          setPhotoData(res?.assets[0]);
                          setFormFormulir({
                            ...formFormulir,
                            foto: {
                              ...formFormulir.foto,
                              value: res?.assets[0],
                            },
                          });
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
                }}
                style={{
                  height: heightPercentageToDP('20%'),
                  borderWidth: 2,
                  borderColor: '#01796F',
                  borderStyle: 'dashed',
                  borderRadius: widthPercentageToDP('6%'),
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    alignContent: 'center',
                    height: heightPercentageToDP('20%'),
                  }}>
                  <IconCamera />
                  <Text
                    style={{
                      color: '#AAAAAA',
                      fontSize: widthPercentageToDP('5%'),
                      // ...constanta({
                      //   font: 'regular',
                      // }),
                    }}>
                    Masukkan Foto
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            <View>
              <DropdownOption
                titleMaster={'Pilih Kategori'}
                AccordianData={{
                  title: 'Pilih Kategori Laporan',
                  data: [
                    {
                      title: 'Tindak Kriminal',
                      value: 1,
                      valueToDatabase: 1,
                    },
                    {
                      title: 'Kecelakaan Lalu Lintas',
                      value: 2,
                      valueToDatabase: 2,
                    },
                    {
                      title: 'Bencana Alam',
                      value: 3,
                      valueToDatabase: 3,
                    },
                  ],
                  valueForEdit: 'Pilih Kategori Laporan',
                }}
                selectItemAccordian={value => {
                  setFormFormulir({
                    ...formFormulir,
                    kategori: {
                      value: value,
                    },
                  });
                }}
                styleData={{
                  titleHeader: {
                    fontSize: widthPercentageToDP('5%'),
                    color: '#01796F',
                    fontWeight: '400',
                    // ...constanta({
                    //   font: 'regular',
                    // }),
                  },
                  header: {
                    width: widthPercentageToDP('90%'),
                    borderWidth: 1,
                    borderColor: '#CDD1E0',
                    alignSelf: 'center',
                    borderRadius: widthPercentageToDP('2%'),
                    backgroundColor: '#fff',
                    height: heightPercentageToDP('6.3%'),
                    justifyContent: 'center',
                  },
                  titlePlaceholder: {
                    color: '#8E8F90',
                    fontSize: widthPercentageToDP('4%'),
                    // ...constanta({
                    //   font: 'regular',
                    // }),
                  },
                  option: {
                    width: widthPercentageToDP('90%'),
                    borderWidth: 1,
                    borderColor: '#CDD1E0',
                    alignSelf: 'center',
                  },
                }}
              />
            </View>
            <InputTextComp
              inputProps={{
                placeholder: 'Masukkan Keterangan',
                keyboardType: 'default',
                value: formFormulir.kategori.value,
                onChangeText: value => {
                  setFormFormulir({
                    ...formFormulir,
                    keterangan: {
                      value: value,
                    },
                  });
                },
                style: {
                  borderWidth: 1,
                  borderColor: '#CDD1E0',
                  paddingLeft: widthPercentageToDP('3.5%'),
                  borderRadius: widthPercentageToDP('2%'),
                  width: widthPercentageToDP('90%'),
                },
                multiline: true,
                numberOfLines: 8,
                textAlignVertical: 'top',
              }}
              labelProps={{
                status: true,
                title: 'Keterangan',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                  // ...constanta({
                  //   font: 'regular',
                  // }),
                },
                is_false: true,
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('2%'),
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: widthPercentageToDP('15%'),
              }}>
              {formFormulir.kategori.value &&
              formFormulir.foto.value &&
              formFormulir.keterangan.value ? (
                <TouchableGradient
                  title={'KIRIM PESAN'}
                  containerStyle={{borderRadius: 10}}
                  colorGradient={['#1658BC', '#386BF6']}
                  onPressData={() => {
                    setBasicAlertProps({
                      basicAlertVisible: true,
                      basicAlertShowButton: true,
                      withTitle: true,
                      basicAlertTitle:
                        'Apakah Anda yakin ingin mengirim Panic Button ?',
                      basicAlertMessage: '',
                      basicAlertOnOk: () => {
                        setBasicAlertProps({
                          ...basicAlertProps,
                          basicAlertVisible: false,
                          basicAlertTitle: null,
                          basicAlertMessage: null,
                          onClose: null,
                          iconClose: false,
                        });
                        // props.navigation.navigate('home.formulir');
                        KirimPanicButton();
                      },
                      basicAlertOnClosed: () => {
                        setBasicAlertProps({
                          ...basicAlertProps,
                          basicAlertVisible: false,
                          basicAlertTitle: null,
                          basicAlertMessage: null,
                          onClose: null,
                          iconClose: false,
                        });
                      },
                      basicAlertOkBtnOnly: false,
                      basicAlertBtnOkText: 'Ya',
                      basicAlertBtnClosedText: 'Batalkan',
                    });
                  }}
                  {...props}
                />
              ) : (
                <TouchableOpacity
                  // onPress={() => KirimPanicButton()}
                  style={{
                    width: widthPercentageToDP('35%'),
                    height: widthPercentageToDP('10%'),
                    backgroundColor: '#A1A1A1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      // ...constanta({
                      //   font: 'regular',
                      // }),
                    }}>
                    KIRIM PESAN
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoiding>
      </View>
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: heightPercentageToDP('100%'),
            width: widthPercentageToDP('100%'),
            backgroundColor: '#2727278F',
            opacity: 10,
            justifyContent: 'center',
            zIndex: 9999,
          }}>
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#01796F" />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 9,
              }}>
              Harap Tunggu Sebentar
            </Text>
          </View>
        </View>
      )}
    </BaseContainer>
  );
};
