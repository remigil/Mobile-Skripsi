import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Mata, MataCoret} from '../../assets/Assets';
import CheckBox from '@react-native-community/checkbox';
import KeyboardAvoiding from '../../component/form/KeyboardAvoiding';
import {authLogin as authLoginRedux} from '../../redux/auth/action';
import {AuthLogin, GetProfileData} from '../../repositories/auth';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import {
  InputTextCondition,
  InputTextIconComp,
  DialogContainer,
} from '../../component';
import Constanta from '../../lib/Constanta';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_AUTH_KEY} from '../../repositories/config';
export default props => {
  const scrHeight = Dimensions.get('window').height;

  let heightInput = {};
  if (scrHeight < 684) {
    heightInput = {height: heightPercentageToDP('7.5%')};
  } else {
    heightInput = {height: heightPercentageToDP('6%')};
  }
  const dispatch = useDispatch();
  const initState = {
    login: {
      // username: {
      //   value: '',
      // }
      phone: {
        value: '',
        require: false,
        is_filled: true,
      },
      password: {
        value: '',
        isHidden: true,
        is_filled: true,
      },
    },
    rememberMe: false,
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };

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
      iconClose: false,
    });
  };
  const [formLogin, setFormLogin] = useState(initState.login);
  const [rememberMe, setRememberMe] = useState(initState.rememberMe);
  const [isLoading, setIsLoading] = useState(false);
  const [profilData, setProfilData] = useState({});
  const [isProfile, setProfile] = useState(false);
  const submitLogin = async () => {
    try {
      let isFilled = true;
      let isFilledField = '';
      let formData = new FormData();
      Object.keys(formLogin).forEach(field => {
        if (formLogin[field].value) {
          formData.append(field, formLogin[field].value);
        } else {
          isFilled = false;
          isFilledField = field;
          return;
        }
      });
      if (isFilled) {
        setIsLoading(true);
        const authLogin = await AuthLogin(
          formLogin.phone.value,
          formLogin.password.value,
        );
        console.log({authLogin});
        if (!authLogin.success) {
          // console.log('0' + formLogin.phone.value);
          setBasicAlertProps({
            basicAlertVisible: true,
            basicAlertTitle: 'Gagal',
            basicAlertMessage: authLogin.message,
            basicAlertOnOk: () => {
              closeBasicAlert();
            },
            basicAlertOkBtnOnly: true,
            basicAlertBtnOkText: 'Coba lagi',
            basicAlertBtnClosedText: 'Tutup juga',
            basicAlertShowButton: true,
            withTitle: true,
          });
        } else {
          await AsyncStorage.setItem(API_AUTH_KEY, authLogin.data.accessToken);
          setProfile(true);
          // GetProfileData()
          //   .then(res => {
          //     setProfilData(res.data);
          //     setBasicAlertProps({
          //       basicAlertVisible: true,
          //       basicAlertTitle: 'Login Berhasil',
          //       basicAlertOnOk: () => {
          //         closeBasicAlert();
          //         dispatch(authLoginRedux(res.data));
          //       },
          //       basicAlertOkBtnOnly: true,
          //       basicAlertBtnOkText: 'Masuk',
          //     });
          //   })
          //   .catch(err => console.log(err))
          //   .finally(() => {
          //     setIsLoading(false);
          //   });
        }
      } else {
        setBasicAlertProps({
          basicAlertVisible: true,
          basicAlertTitle: 'Gagal',
          basicAlertMessage: 'Field ' + isFilledField + ' masih kosong',
          basicAlertShowButton: true,
          withTitle: true,
          basicAlertOnOk: () => {
            closeBasicAlert();
          },
          basicAlertOkBtnOnly: true,
          basicAlertBtnOkText: 'Ulangi lagi',
          basicAlertBtnClosedText: 'Tutup juga',
        });
        // alert('Field ' + isFilledField + ' masih kosong');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isProfile) {
      GetProfileData()
        .then(res => {
          console.log({profil: res});
          setProfilData(res.data);
          setBasicAlertProps({
            basicAlertVisible: true,
            basicAlertTitle: 'Login Berhasil',
            basicAlertOnOk: () => {
              closeBasicAlert();
              dispatch(authLoginRedux(res.data));
            },
            basicAlertOkBtnOnly: true,
            basicAlertBtnOkText: 'Masuk',
            basicAlertShowButton: true,
            withTitle: true,
          });
        })
        .catch(err => {
          console.log({error: err.message}, {err});
        })
        .finally(() => {
          setIsLoading(false);
          setProfilData(false);
          setProfile(false);
        });
    }
  }, [isProfile]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <StatusBar animated={true} backgroundColor="#003A91" hidden={false} />
      <KeyboardAvoiding>
        <>
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: heightPercentageToDP('10%'),
              }}>
              <Image
                source={require('../../assets/logo-k3i.png')}
                style={{
                  width: widthPercentageToDP('35%'),
                  height: widthPercentageToDP('35%'),
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  // fontWeight: '700',
                  color: '#003A91',
                  fontSize: widthPercentageToDP('5%'),
                  marginTop: widthPercentageToDP('5%'),
                  ...Constanta({font: 'bold'}),
                }}>
                K3I KORLANTAS POLRI
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#4E4E4E',
                  // fontWeight: '300',
                  fontSize: widthPercentageToDP('4.5%'),
                  width: widthPercentageToDP('70%'),
                  marginTop: 2,
                  ...Constanta({font: 'regular'}),
                }}>
                Silahkan login terlebih dulu atau daftar jika belum memiliki
                akun
              </Text>
            </View>

            <InputTextCondition
              inputProps={{
                placeholder: 'Masukan No Telepon Seluler anda',
                keyboardType: 'numeric',
                value: formLogin.phone.value,
                placeholderTextColor: formLogin.phone.is_filled
                  ? '#9C9D9E'
                  : '#CE2121',
                onChangeText: value =>
                  setFormLogin({
                    ...formLogin,
                    phone: {
                      value: value,
                      is_filled: value == '' ? false : true,
                    },
                  }),
                style: {
                  marginLeft: 3,
                  color: '#9C9D9E',
                },
              }}
              labelProps={{
                status: true,
                title: 'No Telepon Seluler',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: formLogin.phone.is_filled ? '#003A91' : '#CE2121',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                is_false: formLogin.phone.is_filled,
              }}
              condition={{
                title: '+62',
                style: {
                  borderWidth: 1,
                  // borderColor: '#CDD1E0',
                  borderColor: formLogin.phone.is_filled
                    ? '#CDD1E0'
                    : '#CE2121',
                  borderRadius: widthPercentageToDP('2%'),
                  height: responsiveWidth(13),
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
              }}
            />

            <InputTextIconComp
              icon={
                <TouchableOpacity
                  onPress={() =>
                    setFormLogin({
                      ...formLogin,
                      password: {
                        ...formLogin.password,
                        isHidden: !formLogin.password.isHidden,
                      },
                    })
                  }
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  {formLogin.password.isHidden ? (
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
                placeholder: 'Masukkan kata sandi',
                keyboardType: 'default',
                secureTextEntry: formLogin.password.isHidden,
                value: formLogin.password,
                placeholderTextColor: formLogin.password.is_filled
                  ? '#9C9D9E'
                  : '#CE2121',
                onChangeText: value =>
                  setFormLogin({
                    ...formLogin,
                    password: {
                      ...formLogin.password,
                      value: value,
                      is_filled: value == '' ? false : true,
                    },
                  }),
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: formLogin.password.is_filled
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
                  color: formLogin.password.is_filled ? '#003A91' : '#CE2121',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                is_false: formLogin.password.is_filled,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: heightPercentageToDP('1.5%'),
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  disabled={false}
                  value={rememberMe}
                  tintColor="#fff"
                  onValueChange={newValue => setRememberMe(prev => !prev)}
                />
                <Text style={{paddingLeft: 8}}>Ingat Saya</Text>
              </View> */}
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('auth.lupaPassword')
                  }>
                  <Text
                    style={{
                      color: '#FF0000',
                      ...Constanta({font: 'regular'}),
                    }}>
                    Lupa Sandi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginVertical: heightPercentageToDP('4%'),
              }}>
              <Pressable
                onPress={() => submitLogin()}
                style={{
                  backgroundColor: '#003A91',
                  width: widthPercentageToDP('80%'),
                  paddingVertical: widthPercentageToDP('4%'),
                  borderRadius: widthPercentageToDP('2%'),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    ...Constanta({font: 'regular'}),
                  }}>
                  Masuk
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
                    paddingRight: 4,
                    ...Constanta({font: 'regular'}),
                    color: '#9C9D9E',
                  }}>
                  Belum mempunyai akun ?
                </Text>
                <Pressable
                  onPress={() => props.navigation.navigate('auth.daftar')}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#00004D',
                      fontWeight: '300',
                      ...Constanta({font: 'regular'}),
                    }}>
                    Daftar
                  </Text>
                </Pressable>
              </View>
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
            <ActivityIndicator size="large" color="#003A91" />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                marginTop: 9,
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
