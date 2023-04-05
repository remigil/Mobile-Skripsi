import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Mata, MataCoret} from '../../assets/Assets';
import {InputTextComp, DialogContainer} from '../../component';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import InputTextWithIcon from '../../component/form/InputTextWithIcon';
import KeyboardAvoiding from '../../component/form/KeyboardAvoiding';
import Constanta from '../../lib/Constanta';
import {ChangePassword} from '../../repositories/auth';

export default props => {
  const route = useRoute();
  const initState = {
    daftar: {
      kata_sandi: {
        value: '',
        require: true,
        isHidden: true,
        is_filled: true,
      },
      konfirmasi_kata_sandi: {
        value: '',
        require: true,
        isHidden: true,
        is_filled: true,
      },
    },
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initState.basicAlertProps,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formDaftar, setFormDaftar] = useState(initState.daftar);
  const closeBasicAlert = () => {
    setIsLoading(false);
    setBasicAlertProps({
      ...basicAlertProps,
      basicAlertVisible: false,
      basicAlertTitle: null,
      basicAlertMessage: null,
      onClose: null,
      iconClose: false,
    });
  };
  const submitNewPass = () => {
    try {
      let isFilled = true;
      let isFilledField = '';
      if (isFilled) {
        setIsLoading(true);
        ChangePassword(route.params.email, formDaftar.kata_sandi.value)
          .then(ganti => {
            console.log({ganti});
            if (ganti.status == 201) {
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertShowButton: true,
                withTitle: true,
                basicAlertTitle: ganti.message,
                basicAlertOnOk: () => {
                  closeBasicAlert();
                  props.navigation.navigate('auth.login');
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'OK',
              });
            } else {
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertShowButton: true,
                withTitle: true,
                basicAlertTitle: 'Gagal',
                basicAlertMessage: ganti.message,

                basicAlertOnOk: () => {
                  closeBasicAlert();
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Coba lagi',
              });
            }
          })
          .catch(err => {
            setBasicAlertProps({
              basicAlertVisible: true,
              basicAlertShowButton: true,
              withTitle: true,
              basicAlertTitle: 'Gagal',
              basicAlertMessage: err.message,
              basicAlertOnOk: () => {
                closeBasicAlert();
              },
              basicAlertOkBtnOnly: true,
              basicAlertBtnOkText: 'Coba lagi',
            });
          })
          .finally(() => {});
      } else {
        alert('Field ' + isFilledField + ' masih kosong');
      }
    } catch (e) {
      console.log(e);
    } finally {
      () => {
        setIsLoading(false);
      };
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <StatusBar animated={true} backgroundColor="#01796F" hidden={false} />
      <View>
        <Text
          style={{
            textAlign: 'center',
            ...Constanta({
              font: 'bold',
            }),
            color: '#01796F',
            fontSize: widthPercentageToDP('5%'),
            marginVertical: 70,
          }}>
          Bogor Ngawas
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: widthPercentageToDP('5%'),
        }}>
        <View
          style={{
            marginVertical: 12,
          }}>
          <View>
            <Text
              style={{
                marginTop: 12,
                color: '#01796F',
                fontSize: widthPercentageToDP('5%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Lupa Kata Sandi
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: 12,
                color: '#999EA1',
                fontSize: 12,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Masukkan Kata Sandi Baru pada tempat yang telah disediakan
            </Text>
          </View>
        </View>
        <KeyboardAvoiding>
          <>
            <InputTextWithIcon
              containerProps={{marginBottom: heightPercentageToDP('3%')}}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setFormDaftar({
                      ...formDaftar,
                      kata_sandi: {
                        ...formDaftar.kata_sandi,
                        isHidden: !formDaftar.kata_sandi.isHidden,
                      },
                    });
                  }}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  {formDaftar.kata_sandi.isHidden ? (
                    <Mata
                      width={widthPercentageToDP('6%')}
                      height={heightPercentageToDP('6%')}
                    />
                  ) : (
                    <MataCoret
                      width={widthPercentageToDP('6%')}
                      height={heightPercentageToDP('6%')}
                    />
                  )}
                </TouchableOpacity>
              }
              inputProps={{
                placeholder: 'Masukan Sandi Baru Anda',
                keyboardType: 'default',
                value: formDaftar.kata_sandi.value,
                secureTextEntry: formDaftar.kata_sandi.isHidden,
                placeholderTextColor: formDaftar.kata_sandi.is_filled
                  ? '#9C9D9E'
                  : '#CE2121',
                onChangeText: value =>
                  setFormDaftar({
                    ...formDaftar,
                    kata_sandi: {
                      ...formDaftar.kata_sandi,
                      value: value,
                      is_filled: value == '' ? false : true,
                    },
                  }),
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: formDaftar.kata_sandi.is_filled
                    ? '#CDD1E0'
                    : '#CE2121',
                  paddingLeft: widthPercentageToDP('3.5%'),
                  borderRadius: widthPercentageToDP('2%'),
                },
              }}
              labelProps={{
                status: true,
                title: 'Kata Sandi',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: formDaftar.kata_sandi.is_filled
                    ? '#01796F'
                    : '#CE2121',
                  ...Constanta({font: 'semibold'}),
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                require: formDaftar.kata_sandi.require,
                is_false: formDaftar.kata_sandi.is_filled,
              }}
            />
            {/* <InputTextComp
              inputProps={{
                placeholder: 'Masukan Ulang Sandi Baru Anda',
                keyboardType: 'default',
                secureTextEntry: formDaftar.konfirmasi_kata_sandi.isHidden,
                value: formDaftar.konfirmasi_kata_sandi.value,
                onChangeText: value =>
                  setFormDaftar({
                    ...formDaftar,
                    konfirmasi_kata_sandi: {
                      ...formDaftar.konfirmasi_kata_sandi,
                      value: value,
                      is_filled: value == '' ? false : true,
                    },
                  }),
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,

                  borderColor: formDaftar.konfirmasi_kata_sandi.is_filled
                    ? '#CDD1E0'
                    : '#CE2121',
                  paddingLeft: widthPercentageToDP('3.5%'),
                  borderRadius: widthPercentageToDP('2%'),
                },
              }}
              labelProps={{
                status: true,
                title: 'Konfirmasi Ulang Kata Sandi',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: formDaftar.konfirmasi_kata_sandi.is_filled
                    ? '#01796F'
                    : '#CE2121',
                  ...Constanta({font: 'semibold'}),
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                require: true,
                is_false:
                  (formDaftar.konfirmasi_kata_sandi.value !=
                    formDaftar.kata_sandi.value ||
                    !formDaftar.konfirmasi_kata_sandi.is_filled) &&
                  formDaftar.konfirmasi_kata_sandi.value
                    ? false
                    : true,
                otherTitleCondition:
                  (formDaftar.konfirmasi_kata_sandi.value ==
                    formDaftar.kata_sandi.value &&
                    formDaftar.kata_sandi.value) ||
                  formDaftar.konfirmasi_kata_sandi.is_filled
                    ? ''
                    : 'Kombinasi Kata Sandi Tidak Sesuai',
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
              }}
            /> */}
            <InputTextWithIcon
              icon={
                <TouchableOpacity
                  onPress={() =>
                    setFormDaftar({
                      ...formDaftar,
                      konfirmasi_kata_sandi: {
                        ...formDaftar.konfirmasi_kata_sandi,
                        isHidden: !formDaftar.konfirmasi_kata_sandi.isHidden,
                      },
                    })
                  }
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  {formDaftar.konfirmasi_kata_sandi.isHidden ? (
                    <Mata
                      width={widthPercentageToDP('6%')}
                      height={heightPercentageToDP('6%')}
                    />
                  ) : (
                    <MataCoret
                      width={widthPercentageToDP('6%')}
                      height={heightPercentageToDP('6%')}
                    />
                  )}
                </TouchableOpacity>
              }
              inputProps={{
                placeholder: 'Masukan Ulang Sandi Baru Anda',
                keyboardType: 'default',
                secureTextEntry: formDaftar.konfirmasi_kata_sandi.isHidden,
                value: formDaftar.konfirmasi_kata_sandi.value,
                onChangeText: value =>
                  setFormDaftar({
                    ...formDaftar,
                    konfirmasi_kata_sandi: {
                      ...formDaftar.konfirmasi_kata_sandi,
                      value: value,
                      is_filled: value == '' ? false : true,
                    },
                  }),
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,

                  borderColor: formDaftar.konfirmasi_kata_sandi.is_filled
                    ? '#CDD1E0'
                    : '#CE2121',
                  paddingLeft: widthPercentageToDP('3.5%'),
                  borderRadius: widthPercentageToDP('2%'),
                },
              }}
              labelProps={{
                status: true,
                title: 'Konfirmasi Ulang Kata Sandi',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: formDaftar.konfirmasi_kata_sandi.is_filled
                    ? '#01796F'
                    : '#CE2121',
                  ...Constanta({font: 'semibold'}),
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                require: true,
                is_false:
                  (formDaftar.konfirmasi_kata_sandi.value !=
                    formDaftar.kata_sandi.value ||
                    !formDaftar.konfirmasi_kata_sandi.is_filled) &&
                  formDaftar.konfirmasi_kata_sandi.value
                    ? false
                    : true,
                otherTitleCondition:
                  (formDaftar.konfirmasi_kata_sandi.value ==
                    formDaftar.kata_sandi.value &&
                    formDaftar.kata_sandi.value) ||
                  formDaftar.konfirmasi_kata_sandi.is_filled
                    ? ''
                    : 'Kombinasi Kata Sandi Tidak Sesuai',
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
              }}
            />
            <View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    width: 321,
                    height: 46,
                    backgroundColor: '#01796F',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => submitNewPass()}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: widthPercentageToDP('4.5%'),
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Konfirmasi
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginVertical: heightPercentageToDP('2%'),
                  }}>
                  Belum mempunyai akun ?
                </Text>
                <Pressable
                  onPress={() => props.navigation.navigate('auth.daftar')}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 4,
                  }}>
                  <Text
                    style={{
                      color: '#00004D',
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Daftar
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
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
          }}>
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#01796F" />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                marginTop: 9,
                ...Constanta({font: 'regular'}),
              }}>
              Harap Tunggu Sebentar
            </Text>
          </View>
        </View>
      )}
      <DialogContainer {...basicAlertProps} />
    </View>
  );
};
