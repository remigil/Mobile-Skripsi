import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {InputTextComp, DialogContainer} from '../../component';
import KeyboardAvoiding from '../../component/form/KeyboardAvoiding';
import Constanta from '../../lib/Constanta';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import {ForgetPassword} from '../../repositories/auth';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export default props => {
  const initState = {
    daftar: {
      email: {
        value: '',
        require: true,
      },
    },
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };
  const [formDaftar, setFormDaftar] = useState(initState.daftar);
  const [isLoading, setIsLoading] = useState(false);
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initState.basicAlertProps,
  });
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
  const submitEmailForgot = async () => {
    try {
      let isFilled = true;
      let isFilledField = '';
      if (isFilled) {
        setIsLoading(true);
        ForgetPassword(formDaftar.email.value)
          .then(success => {
            console.log('nih', success);
            if (success.status == 200) {
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertShowButton: true,
                basicAlertTitle: success.status
                  ? 'Kode Terkirim'
                  : 'Gagal Mengirim Kode',
                // basicAlertMessage: 'Silahkan Periksa Email Anda',
                basicAlertOnOk: () => {
                  closeBasicAlert();
                  props.navigation.navigate('auth.verifikasiSandi', {
                    email: formDaftar.email.value,
                  });
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Verifikasi',
              });
            } else {
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertShowButton: true,
                withTitle: true,
                basicAlertTitle: 'Gagal Mengirim Kode',
                basicAlertMessage: success.message,

                basicAlertOnOk: () => {
                  closeBasicAlert();
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Ulangi lagi',
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
    } catch (error) {
      console.log(error);
    } finally {
      () => {
        setIsLoading(false);
      };
    }
  };
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
            marginVertical: heightPercentageToDP('10%'),
          }}>
          Bogor Ngawas
        </Text>
      </View>

      <View style={{paddingHorizontal: widthPercentageToDP('10%')}}>
        <View
          style={{
            marginVertical: 12,
          }}>
          <View
            style={
              {
                // paddingRight: widthPercentageToDP('2%'),
              }
            }>
            <Text
              style={{
                color: '#01796F',
                fontSize: widthPercentageToDP('5%'),
                ...Constanta({
                  font: 'semibold',
                }),
              }}>
              Lupa Kata Sandi
            </Text>
          </View>
          <View
            style={
              {
                // paddingHorizontal: widthPercentageToDP('5%')
                // paddingHorizontal: widthPercentageToDP('10%')
              }
            }>
            <Text
              style={{
                marginTop: 12,
                color: '#999EA1',
                fontSize: 12,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Masukkan Email yang sebelum nya sudah didaftarkan pada tempat yang
              disediakan
            </Text>
          </View>
        </View>

        <KeyboardAvoiding>
          <>
            <InputTextComp
              inputProps={{
                placeholder: 'Masukan Email Anda',
                keyboardType: 'default',
                value: formDaftar.email.value,
                onChangeText: value =>
                  setFormDaftar({
                    ...formDaftar,
                    email: {
                      ...formDaftar.email,
                      value: value,
                    },
                  }),
                style: {
                  borderWidth: 1,
                  borderColor: '#CDD1E0',
                  paddingLeft: widthPercentageToDP('3.5%'),
                  borderRadius: widthPercentageToDP('2%'),
                  height: responsiveHeight(6),
                },
              }}
              labelProps={{
                status: true,
                title: 'Email',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  ...Constanta({
                    font: 'semibold',
                  }),
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                is_false: true,
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
              }}
            />

            <View>
              <TouchableOpacity
                style={{
                  width: widthPercentageToDP('80%'),
                  height: heightPercentageToDP('6%'),
                  backgroundColor: '#01796F',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => submitEmailForgot()}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: widthPercentageToDP('4.5%'),
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Lanjutkan
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginVertical: heightPercentageToDP('2%'),
                    ...Constanta({
                      font: 'regular',
                    }),
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
