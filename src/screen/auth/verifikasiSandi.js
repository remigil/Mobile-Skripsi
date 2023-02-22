import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useRoute} from '@react-navigation/native';
import Constanta from '../../lib/Constanta';
import {DialogContainer} from '../../component';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import {ResendForgetPass, TokenForgotVerif} from '../../repositories/auth';
const CELL_COUNT = 6;
export default props => {
  const route = useRoute();
  // console.log(route.params);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [CellOnLayoutHandler, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const initState = {
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initState.basicAlertProps,
  });
  const closeBasicAlert = () => {
    setBasicAlertProps({
      ...basicAlertProps,
      basicAlertVisible: false,
      basicAlertTitle: null,
      basicAlertMessage: null,
      onClose: null,
      iconClose: false,
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   if (!isLoading) {
  //     props.navigation.addListener('beforeRemove', e => {
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       setBasicAlertProps({
  //         basicAlertVisible: true,
  //         basicAlertTitle: 'Gagal',
  //         basicAlertMessage:
  //           'Anda Harus Menyelesaikan Tahap Verifikasi ini agar dapat melakukan login',

  //         basicAlertOnOk: () => {
  //           closeBasicAlert();
  //         },
  //         basicAlertOkBtnOnly: true,
  //         basicAlertBtnOkText: 'Tutup',
  //       });
  //     });
  //   }
  // }, [props.navigation]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);
  const submitForgotVerif = async () => {
    try {
      if (value) {
        setIsLoading(true);
        TokenForgotVerif({
          email: route.params.email,
          token: value,
        })
          .then(index => {
            console.log({index});
            if (index.data == null) {
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertShowButton: true,
                withTitle: true,
                basicAlertTitle: 'Verifikasi Berhasil',
                basicAlertOnOk: () => {
                  closeBasicAlert();
                  props.navigation.navigate('auth.konfirmasiSandi', {
                    email: route.params.email,
                  });
                  setIsLoading(false);
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Lanjut',
              });
            } else {
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertShowButton: true,
                withTitle: true,
                basicAlertTitle: index.message,
                basicAlertOnOk: () => {
                  closeBasicAlert();
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Coba Lagi',
              });
            }
          })
          .catch(err => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resendToken = async () => {
    try {
      setIsLoading(true);
      ResendForgetPass(route.params.email)
        .then(res => {
          console.log({res});
          if (res.data == null) {
            setBasicAlertProps({
              basicAlertVisible: true,
              basicAlertShowButton: true,
              withTitle: true,
              basicAlertTitle: 'Kode Terkirim',
              basicAlertMessage: 'Silakan Periksa Email Anda',
              basicAlertOnOk: () => {
                closeBasicAlert();
                setIsLoading(false);
              },
              basicAlertOkBtnOnly: true,
              basicAlertBtnOkText: 'Tutup',
            });
          } else {
            setBasicAlertProps({
              basicAlertVisible: true,
              basicAlertShowButton: true,
              withTitle: true,
              basicAlertTitle: res.message,
              basicAlertOnOk: () => {
                closeBasicAlert();
              },
              basicAlertOkBtnOnly: true,
              basicAlertBtnOkText: 'Coba Lagi',
            });
          }
        })
        .catch(err => console.log(err))
        .finally(() => {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <StatusBar animated={true} backgroundColor="#003A91" hidden={false} />
      {isLoading ? (
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
            <ActivityIndicator size="large" color="#003A91" />
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
      ) : (
        <>
          <View>
            <Text
              style={{
                textAlign: 'center',
                ...Constanta({
                  font: 'bold',
                }),
                color: '#003A91',
                fontSize: widthPercentageToDP('5%'),
                marginVertical: 70,
              }}>
              K3I KORLANTAS POLRI
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#003A91',
                fontSize: widthPercentageToDP('5%'),
                marginTop: widthPercentageToDP('5%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Verifikasi
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#999EA1',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Kode unik akan dikirimkan ke Email Anda
            </Text>
          </View>

          <View>
            <CodeField
              ref={ref}
              {...CellOnLayoutHandler}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={{marginVertical: 30}}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    {
                      width: 34,
                      height: 34,
                      lineHeight: 38,
                      fontSize: 24,
                      borderBottomWidth: 1,
                      borderColor: '#000000',
                      textAlign: 'center',
                      ...Constanta({
                        font: 'regular',
                      }),
                    },
                    isFocused && {
                      borderColor: '#000',
                    },
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Pressable
              style={{
                backgroundColor: '#003A91',
                width: widthPercentageToDP('80%'),
                paddingVertical: widthPercentageToDP('4%'),
                borderRadius: widthPercentageToDP('2%'),
              }}
              //   disini ya
              onPress={() => {
                if (value.length == 6) {
                  submitForgotVerif();
                } else {
                  setBasicAlertProps({
                    basicAlertVisible: true,
                    basicAlertShowButton: true,
                    withTitle: true,
                    basicAlertTitle: 'Gagal',
                    basicAlertMessage: 'kode kurang dari 6',

                    basicAlertOnOk: () => {
                      closeBasicAlert();
                    },
                    basicAlertOkBtnOnly: true,
                    basicAlertBtnOkText: 'Coba lagi',
                  });
                }
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Konfirmasi
              </Text>
            </Pressable>
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
                Belum mendapatkan kode?
              </Text>
              <Pressable
                onPress={() => resendToken()}
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
                  Kirim Ulang
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
      <DialogContainer {...basicAlertProps} />
    </View>
  );
};
