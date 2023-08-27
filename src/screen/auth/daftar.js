import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Mata, MataCoret} from '../../assets/Assets';
import {DialogContainer, InputTextComp} from '../../component';
import InputTextWithIcon from '../../component/form/InputTextWithIcon';
import InputTextWithCond from '../../component/form/InputTextWithCond';
import KeyboardAvoiding from '../../component/form/KeyboardAvoiding';
import {AuthRegister} from '../../repositories/auth';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import {ActivityIndicator} from 'react-native-paper';
import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export default props => {
  const {params: paramsData} = props.route;
  const initState = {
    daftar: {
      nama: {
        value:
          paramsData?.peron_name === undefined ? '' : paramsData?.person_name,
        require: true,
        is_filled: true,
      },
      email: {
        value: paramsData?.email === undefined ? '' : paramsData?.email,
        require: true,
        is_filled: true,
      },
      password: {
        value: paramsData?.password === undefined ? '' : paramsData?.password,
        isHidden: true,
        require: true,
        is_filled: true,
      },
      verifpassword: {
        value: paramsData?.password === undefined ? '' : paramsData?.password,
        isHidden: true,
        require: true,
        is_filled: true,
      },
      phone: {
        value: paramsData?.no_hp === undefined ? '' : paramsData?.no_hp,
        require: true,
        is_filled: true,
      },
      // no_hp: {
      //   value: paramsData?.no_hp === undefined ? '' : paramsData?.no_hp,
      //   require: false,
      //   is_filled: true,
      // },
    },
    rememberMe: false,
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };
  const [formDaftar, setFormDaftar] = useState(initState.daftar);
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initState.basicAlertProps,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onReach_MAX_Length = temp => {
    let tempLength = temp?.length.toString();

    // if (tempLength < 16) {
    //   setBasicAlertProps({
    //     basicAlertVisible: true,
    //     basicAlertTitle: 'Perhatian',
    //     basicAlertMessage: 'Jumlah digit NIK anda kurang',
    //     basicAlertOkBtnOnly: true,
    //     basicAlertBtnOkText: 'OK',
    //     basicAlertOnOk: () => {
    //       closeBasicAlert();
    //     },
    //     basicAlertShowButton: true,
    //     withTitle: true,
    //   });
    // }
  };

  const submitDaftar = async () => {
    try {
      let isFilled = true;
      let isFilledField = '';
      // if () {
      //   onReach_MAX_Length(formDaftar.no_hp.value);
      // }

      console.log({formDaftar});
      Object.keys(formDaftar).forEach(data => {
        console.log(formDaftar[data]);
        if (formDaftar[data].value === '') {
          console.log({data});
          isFilled = false;
        }
      });
      if (!isFilled) {
        setBasicAlertProps({
          basicAlertVisible: true,
          basicAlertShowButton: true,
          withTitle: true,
          basicAlertTitle: 'Gagal',
          // basicAlertMessage: 'Field ' + isFilledField + ' masih kosong',
          basicAlertMessage: 'Harap isi field yang masih kosong',
          basicAlertOnOk: () => {
            closeBasicAlert();
          },
          basicAlertOkBtnOnly: true,
          basicAlertBtnOkText: 'Ulangi lagi',
          basicAlertBtnClosedText: 'Tutup juga',
        });
      }
      // if (formDaftar.no_hp.value.length < 16) {
      //   onReach_MAX_Length(formDaftar.no_hp.value);
      // } else 
      {
        if (isFilled) {
          if (formDaftar.phone.value[0] == '0') {
            formDaftar.phone.value = '62' + formDaftar.phone.value.substring(1);
          } else {
            formDaftar.phone.value = '62' + formDaftar.phone.value;
          }

          setIsLoading(true);
          AuthRegister(
            formDaftar.phone.value,
            formDaftar.password.value,
            formDaftar.nama.value,
            formDaftar.email.value,
            // formDaftar.no_hp.value,
          )
            .then(success => {
              console.log({success});
              if (success.status) {
                setBasicAlertProps({
                  basicAlertVisible: true,
                  basicAlertShowButton: true,
                  withTitle: true,
                  basicAlertTitle: success.status ? 'Berhasil' : 'Gagal',
                  basicAlertMessage: 'Daftar Akun Berhasil',
                  basicAlertOnOk: () => {
                    closeBasicAlert();
                    props.navigation.navigate('auth.verifikasi', {
                      ...success.data,
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
                  basicAlertTitle: 'Gagal',
                  // basicAlertMessage: 'Field ' + isFilledField + ' masih kosong',
                  // basicAlertMessage: 'Harap isi field yang masih kosong',
                  basicAlertOnOk: () => {
                    closeBasicAlert();
                  },
                  basicAlertOkBtnOnly: true,
                  basicAlertBtnOkText: 'Ulangi lagi',
                  basicAlertBtnClosedText: 'Tutup juga',
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
                basicAlertBtnClosedText: 'Tutup',
              });
            })
            .finally(() => {
              // setIsLoading(false);
            });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      () => {
        setIsLoading(false);
      };
    }
  };
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <StatusBar animated={true} backgroundColor="#01796F" hidden={false} />
      <KeyboardAvoiding>
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: responsiveWidth(14),
            }}>
            <Image
              source={require('../../assets/Bogor_ngawas.png')}
              style={{
                width: responsiveWidth(35),
                height: responsiveWidth(35),
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                // fontWeight: '700',
                color: '#01796F',
                fontSize: responsiveWidth(5),
                marginTop: responsiveWidth(5),
                ...Constanta({
                  font: 'bold',
                }),
              }}>
              BOGOR NGAWAS
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#4E4E4E',
                // fontWeight: '300',
                fontSize: responsiveFontSize(2.2),
                width: responsiveWidth(70),
                marginTop: 2,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Silahkan isi form registrasi dibawah ini
            </Text>
          </View>

          <InputTextComp
            inputProps={{
              placeholder: 'Masukan Nama Anda',
              keyboardType: 'default',
              value: formDaftar.nama.value,
              onChangeText: value =>
                setFormDaftar({
                  ...formDaftar,
                  nama: {
                    ...formDaftar.nama,
                    value: value,
                    is_filled: value == '' ? false : true,
                  },
                }),
              placeholderTextColor: formDaftar.nama.is_filled
                ? '#9C9D9E'
                : '#CE2121',
              style: {
                borderWidth: 1,
                borderColor: formDaftar.nama.is_filled ? '#01796F' : '#CE2121',
                height: responsiveHeight(6),
                paddingLeft: responsiveWidth(3.5),
                borderRadius: responsiveWidth(2),
                color: '#9C9D9E',
              },
            }}
            labelProps={{
              status: true,
              title: 'Nama',
              style: {
                fontSize: responsiveWidth(5),

                color: formDaftar.nama.is_filled ? '#01796F' : '#CE2121',
                fontWeight: '400',
                marginBottom: responsiveWidth(1.5),
              },
              require: formDaftar.nama.require,
              is_false: formDaftar.nama.is_filled,
            }}
            containerProps={{
              marginBottom: responsiveHeight(3),
            }}
          />
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
                    is_filled: value == '' ? false : true,
                  },
                }),
              placeholderTextColor: formDaftar.email.is_filled
                ? '#9C9D9E'
                : '#CE2121',
              style: {
                borderWidth: 1,
                borderColor: formDaftar.email.is_filled ? '#01796F' : '#CE2121',
                height: responsiveHeight(6),
                paddingLeft: responsiveWidth(3.5),
                borderRadius: responsiveWidth(2),
                color: '#9C9D9E',
              },
            }}
            labelProps={{
              status: true,
              title: 'Email',
              style: {
                fontSize: responsiveWidth(5),
                color: formDaftar.email.is_filled ? '#01796F' : '#CE2121',
                fontWeight: '400',
                marginBottom: responsiveWidth(1.5),
              },
              require: formDaftar.email.require,
              is_false: formDaftar.email.is_filled,
            }}
            containerProps={{
              marginBottom: responsiveHeight(3),
            }}
          />
          <InputTextWithIcon
            containerProps={{
              marginBottom: responsiveHeight(3),
            }}
            icon={
              <TouchableOpacity
                onPress={() =>
                  setFormDaftar({
                    ...formDaftar,
                    password: {
                      ...formDaftar.password,
                      isHidden: !formDaftar.password.isHidden,
                    },
                  })
                }
                style={{
                  paddingRight: responsiveWidth(2),
                }}>
                {formDaftar.password.isHidden ? (
                  <Mata
                    width={responsiveWidth(6)}
                    height={responsiveHeight(6)}
                  />
                ) : (
                  <MataCoret
                    width={responsiveWidth(6)}
                    height={responsiveHeight(6)}
                  />
                )}
              </TouchableOpacity>
            }
            inputProps={{
              placeholder: 'Berisi 1 huruf besar  dan terdiri dari 8 kata',
              keyboardType: 'default',
              value: formDaftar.password.value,
              secureTextEntry: formDaftar.password.isHidden,
              placeholderTextColor: formDaftar.password.is_filled
                ? '#9C9D9E'
                : '#CE2121',
                onChangeText: (value) => {
                  const hasCapitalLetter = /[A-Z]/.test(value);
                  const hasLowerCaseLetter = /[a-z]/.test(value);
                  const isValid = hasCapitalLetter && hasLowerCaseLetter && value.length >= 8;
                  setFormDaftar((prevForm) => ({
                    ...prevForm,
                    password: {
                      ...prevForm.password,
                      value: value,
                      is_filled: value !== '',
                      is_valid: isValid,
                    },
                  }));
                },
              style: {
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                color: '#9C9D9E',

                borderColor: formDaftar.password.is_filled
                  ? '#01796F'
                  : '#CE2121',
                paddingLeft: responsiveWidth(3.5),
                borderRadius: responsiveWidth(2),
              },
            }}
            labelProps={{
              status: true,
              title: 'Kata Sandi',
              style: {
                fontSize: responsiveWidth(5),
                // color: '#01796F',
                color: formDaftar.password.is_filled ? '#01796F' : '#CE2121',
                ...Constanta({
                  font: 'semibold',
                }),
                marginBottom: responsiveWidth(1.5),
              },
              require: formDaftar.password.require,
              is_false: !formDaftar.password.is_valid && formDaftar.password.is_filled,
              otherTitleCondition: 'Harus memiliki setidaknya satu huruf kapital dan terdiri 8 kata',
            }}
          />
          <InputTextWithIcon
            icon={
              <TouchableOpacity
                onPress={() =>
                  setFormDaftar({
                    ...formDaftar,
                    verifpassword: {
                      ...formDaftar.verifpassword,
                      isHidden: !formDaftar.verifpassword.isHidden,
                    },
                  })
                }
                style={{
                  paddingRight: responsiveWidth(2),
                }}>
                {formDaftar.verifpassword.isHidden ? (
                  <Mata
                    width={responsiveWidth(6)}
                    height={responsiveHeight(6)}
                  />
                ) : (
                  <MataCoret
                    width={responsiveWidth(6)}
                    height={responsiveHeight(6)}
                  />
                )}
              </TouchableOpacity>
            }
            inputProps={{
              placeholder: 'Berisi 1 huruf besar  dan terdiri dari 8 kata',
              keyboardType: 'default',
              secureTextEntry: formDaftar.verifpassword.isHidden,
              value: formDaftar.verifpassword.value,
              placeholderTextColor: formDaftar.verifpassword.is_filled
                ? '#9C9D9E'
                : '#CE2121',
                onChangeText: (value) => {
                  const isFilled = value !== '';
                  const hasCapitalLetter = /[A-Z]/.test(value);
                  const hasLowerCaseLetter = /[a-z]/.test(value);
                  const isValid = isFilled && hasCapitalLetter && hasLowerCaseLetter;
            
                  setFormDaftar((prevForm) => ({
                    ...prevForm,
                    verifpassword: {
                      ...prevForm.verifpassword,
                      value: value,
                      is_filled: isFilled,
                      is_valid: isValid,
                    },
                  }));
                },
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  color: '#9C9D9E',
  
                  borderColor: formDaftar.password.is_filled
                    ? '#01796F'
                    : '#CE2121',
                  paddingLeft: responsiveWidth(3.5),
                  borderRadius: responsiveWidth(2),
                },
            }}
            labelProps={{
              status: true,
              title: 'Konfirmasi Ulang Kata Sandi',
              style: {
                fontSize: responsiveWidth(5),
                color: formDaftar.verifpassword.is_filled
                  ? '#01796F'
                  : '#CE2121',
                fontWeight: '400',
                marginBottom: responsiveWidth(1.5),
              },
              require: true,
              is_false:
              (!formDaftar.verifpassword.is_valid ||
                formDaftar.verifpassword.value !== formDaftar.password.value) &&
              formDaftar.verifpassword.value
                ? 'Kombinasi Kata Sandi Tidak Sesuai'
                : '',
            otherTitleCondition:
              (formDaftar.verifpassword.value === formDaftar.password.value &&
                formDaftar.password.value) ||
              formDaftar.verifpassword.is_filled
                ? ''
                : 'Kombinasi Kata Sandi Tidak Sesuai',
          }}
            containerProps={{
              marginBottom: responsiveHeight(3),
            }}
          />
          <InputTextWithCond
            inputProps={{
              placeholder: 'Masukan No Telepon Seluler anda',
              keyboardType: 'numeric',
              maxLength: 11,
              value: formDaftar.phone.value,
              onChangeText: value =>
                setFormDaftar({
                  ...formDaftar,
                  phone: {
                    ...formDaftar.phone,
                    value: value,
                    is_filled: value == '' ? false : true,
                  },
                }),
              placeholderTextColor: formDaftar.phone.is_filled
                ? '#9C9D9E'
                : '#CE2121',
              style: {
                marginLeft: 3,
                borderColor: formDaftar.phone.is_filled ? '#CDD1E0' : '#CE2121',
                color: '#01796F',
              },
            }}
            labelProps={{
              status: true,
              title: 'No Telepon Seluler',
              style: {
                fontSize: responsiveWidth(5),
                color: formDaftar.phone.is_filled ? '#01796F' : '#CE2121',
                fontWeight: '400',
                marginBottom: responsiveWidth(1.5),
              },
              require: formDaftar.phone.require,
              is_false: formDaftar.phone.is_filled,
            }}
            condition={{
              title: '+62',
              style: {
                borderWidth: 1,
                borderColor: '#01796F',
                height: responsiveWidth(13),
                borderRadius: responsiveWidth(2),
              },
            }}
            containerProps={{
              marginBottom: responsiveWidth(3),
            }}
          />
          {/* <InputTextComp
            inputProps={{
              placeholder: 'Masukan NIK',
              keyboardType: 'numeric',
              value: formDaftar.no_hp.value,
              placeholderTextColor: formDaftar.no_hp.is_filled
                ? '#9C9D9E'
                : '#CE2121',
              onChangeText: value =>
                setFormDaftar({
                  ...formDaftar,
                  no_hp: {
                    ...formDaftar.no_hp,
                    value: value,
                  },
                }),

              style: {
                borderWidth: 1,
                borderColor: '#01796F',
                height: responsiveWidth(13),
                paddingLeft: responsiveWidth(3.5),
                borderRadius: responsiveWidth(2),
                color: '#9C9D9E',
                // marginTop: 10,
              },
              maxLength: 16,
            }}
            labelProps={{
              title: 'NIK (Nomor Induk Kependudukan)',
              style: {
                fontSize: responsiveWidth(5),
                color: '#01796F',
                fontWeight: '400',
                marginBottom: responsiveWidth(1.5),
              },
              is_false: formDaftar.no_hp.is_filled,
              status: true,
              // require: true,
            }}
            containerProps={{
              marginBottom: responsiveWidth(3),
            }}
          /> */}

          <Text
            style={{
              textAlign: 'right',
              color: 'red',
              ...Constanta({font: 'regular'}),
            }}>
            * Wajib Diisi
          </Text>

          <View
            style={{
              marginVertical: responsiveWidth(2),
            }}>
            <Pressable
              onPress={() => submitDaftar()}
              style={{
                backgroundColor: formDaftar.password.is_valid ? '#01796F' : '#9C9D9E',
                width: responsiveWidth(80),
                paddingVertical: responsiveWidth(4),
                borderRadius: responsiveWidth(2),
                opacity: formDaftar.password.is_valid ? 4 : 2,
              }}disabled={!formDaftar.password.is_valid}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  ...Constanta({font: 'regular'}),
                }}>
                Daftar
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
                  marginVertical: responsiveWidth(2),
                  ...Constanta({font: 'regular'}),
                  color: '#9C9D9E',
                }}>
                Sudah mempunyai akun ?
              </Text>
              <Pressable
                onPress={() => props.navigation.navigate('auth.login')}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 4,
                }}>
                <Text
                  style={{
                    color: '#01796F',
                    fontWeight: '300',
                    ...Constanta({font: 'regular'}),
                  }}>
                  Masuk
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      </KeyboardAvoiding>
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
