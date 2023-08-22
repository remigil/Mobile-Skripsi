import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
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
import {TokenVerifikasi} from '../../repositories/auth';
import Constanta from '../../lib/Constanta';
import {DialogContainer} from '../../component';
import {BasicAlertProps} from '../../component/container/dialogContainer';
const CELL_COUNT = 6;
export default props => {
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
  const dataProps = props.route.params;
  console.log({dataProps});
  useEffect(() => {
    if (!isLoading) {
      props.navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        setBasicAlertProps({
          basicAlertVisible: true,
          basicAlertShowButton: true,
          withTitle: true,
          basicAlertTitle: 'Gagal',
          basicAlertMessage:
            'Anda Harus Menyelesaikan Tahap Verifikasi ini agar dapat melakukan login',

          basicAlertOnOk: () => {
            closeBasicAlert();
          },
          basicAlertOkBtnOnly: true,
          basicAlertBtnOkText: 'Tutup',
        });
      });
    }
  }, [props.navigation]);
  const [isLoading, setIsLoading] = useState(false);
  const submitVerif = async () => {
    try {
      if (value) {
        setIsLoading(true);
        TokenVerifikasi({
          no_hp: dataProps.no_hp,
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
                  props.navigation.navigate('auth.login');
                  // setIsLoading(false);
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Lanjut',
              });
            } else {
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertShowButton: true,
                withTitle: true,
                basicAlertTitle: 'Berhasil',
                basicAlertMessage: index.message,

                basicAlertOnOk: () => {
                  closeBasicAlert();
                  props.navigation.navigate('auth.login');
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Selanjutnya',
              });
            }
          })
          .catch(err => {
            setBasicAlertProps({
              basicAlertVisible: true,
              basicAlertShowButton: true,
              withTitle: true,
              basicAlertTitle: 'Berhasil',
              basicAlertMessage: err.message,
              basicAlertOnOk: () => {
                closeBasicAlert();
                props.navigation.navigate('auth.login');
              },
              basicAlertOkBtnOnly: true,
              basicAlertBtnOkText: 'Selanjutnya',
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
  return (
    <View
      style={{
        flex: 1,

        alignItems: 'center',
      }}>
      <StatusBar animated={true} backgroundColor="#01796F" hidden={false} />
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
      ) : (
        <>
          <View
            style={{
              marginVertical: heightPercentageToDP('15%'),
            }}>
            <Text
              style={{
                textAlign: 'center',
                // fontWeight: '700',
                color: '#01796F',
                fontSize: widthPercentageToDP('5%'),
                marginVertical: heightPercentageToDP('3%'),
                ...Constanta({
                  font: 'bold',
                }),
              }}>
              Bogor Ngawas
            </Text>
            <Text
              style={{
                textAlign: 'center',

                color: '#01796F',
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
              Kode unik akan dikirimkan via Email Anda
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
                      color: '#9C9D9E',
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
                backgroundColor: '#01796F',
                width: widthPercentageToDP('80%'),
                paddingVertical: widthPercentageToDP('4%'),
                borderRadius: widthPercentageToDP('2%'),
              }}
              onPress={() => {
                if (value.length == 6) {
                  submitVerif();
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
                // value && submitVerif()
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Verifikasi
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
                  color: '#9C9D9E',
                }}>
                Belum mendapatkan kode?
              </Text>
              <Pressable
                // onPress={() => props.navigation.navigate('auth.login')}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 4,
                }}>
                <Text
                  style={{
                    color: '#01796F',
                    // fontWeight: '300',
                    ...Constanta({
                      font: 'semibold',
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
