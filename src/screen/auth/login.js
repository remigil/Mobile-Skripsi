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
import {authLoginGoogle as authLoginGoogleRedux} from '../../redux/auth/action';
import {AuthLogin, GetProfileData, LoginGoogle} from '../../repositories/auth';
import {BasicAlertProps} from '../../component/container/dialogContainer';
import {
  InputTextCondition,
  InputTextIconComp,
  DialogContainer,
} from '../../component';
import Constanta from '../../lib/Constanta';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_AUTH_KEY} from '../../repositories/config';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {log} from 'react-native-reanimated';
// import { WEB_CLIENT_ID } from '../utils/keys'

GoogleSignin.configure({
  webClientId:
    '574559979289-im0c8nnjo31ha637sbqg2ssh7hjkbdqf.apps.googleusercontent.com',
});

export default props => {
  const scrHeight = Dimensions.get('window').height;

  let heightInput = {};
  if (scrHeight < 684) {
    heightInput = {height: heightPercentageToDP('7.5%')};
  } else {
    heightInput = {height: heightPercentageToDP('6%')};
  }
  const dispatch = useDispatch();
  const {params: paramsData} = props.route;
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
    loginGoogle: {
      email: {
        value: '',
        require: true,
        is_filled: true,
      },
      person_name: {
        value: '',
        require: true,
        is_filled: true,
      },
      id_google: {
        value: '',
        require: true,
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
  const [formLoginGoogle, setFormLoginGoogle] = useState(initState.loginGoogle);
  const [rememberMe, setRememberMe] = useState(initState.rememberMe);
  const [isLoading, setIsLoading] = useState(false);
  const [profilData, setProfilData] = useState({});
  const [isProfile, setProfile] = useState(false);

  const googleSignIn = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);
    console.log(res);
    await postGoogleSignInData(
      res.user.email,
      res.user.displayName,
      res.user.uid,
    );
  };
  const postGoogleSignInData = async (email, name, uid) => {
    const endpoint = 'http://108.136.137.131:3001/v1/auth-society/loginGoogle'; // Ganti dengan URL endpoint yang sesuai

    const requestData = {
      email: email,
      person_name: name,
      id_google: uid,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sesuaikan dengan tipe data yang diterima oleh endpoint
        },
        body: JSON.stringify(requestData),
      });

      const responseGoogle = await response.json();

      await AsyncStorage.setItem(API_AUTH_KEY, responseGoogle.data.accessToken);
      setProfile(true);
      GetProfileData()
        .then(res => {
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
          });
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });

      console.log('Response from endpoint:', responseGoogle);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
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
          GetProfileData()
            .then(res => {
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
              });
            })
            .catch(err => console.log(err))
            .finally(() => {
              setIsLoading(false);
            });
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
  // const fetch = require('node-fetch'); // Di lingkungan non-browser, seperti Node.js

  // const userData = {
  //   additionalUserInfo: {
  //     isNewUser: false,
  //     profile: {
  //       // Data profil dari respons
  //       // ...
  //     },
  //     providerId: 'google.com'
  //   },
  //   user: {

  //     // Data pengguna dari respons
  //     // ...
  //   }
  // };

  // // Ganti dengan URL endpoint yang sesuai
  // const endpointUrl = '108.136.137.131:3001/v1/';

  // // Kirim data menggunakan metode POST
  // fetch(endpointUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(userData)
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Data berhasil dikirim:', data);
  //   })
  //   .catch(error => {
  //     console.error('Terjadi kesalahan:', error);
  //   });

  // const LoginGoogle = async (email, person_name, id_google) => {
  //   const endpoint = '108.136.137.131:3001/v1/auth-society/loginGoogle'; // Ganti dengan URL endpoint yang sesuai

  //   const requestData = {
  //     email: email,
  //     person_name: person_name,
  //     id_google: id_google,
  //   };

  //   try {
  //     const response = await fetch(endpoint, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': FormData, // Sesuaikan dengan tipe data yang diterima oleh endpoint
  //       },
  //       body: FormData(response.body),
  //     });

  //     const data = await response.formData();

  //     // Lakukan sesuatu dengan data yang diterima dari endpoint
  //     return data;
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     throw error;
  //   }
  // };

  // Kemudian dalam fungsi submitLoginGoogle
  const submitLoginGoogle = async (email, name, uid) => {
    try {
      setIsLoading(true);
      const authLoginGoogle = await LoginGoogle(email, name, uid);
    } catch (error) {
      // Tangani error jika diperlukan
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <StatusBar animated={true} backgroundColor="#01796F" hidden={false} />
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
                source={require('../../assets/Bogor_ngawas.png')}
                style={{
                  width: widthPercentageToDP('35%'),
                  height: widthPercentageToDP('35%'),
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  // fontWeight: '700',
                  color: '#01796F',
                  fontSize: widthPercentageToDP('5%'),
                  marginTop: widthPercentageToDP('5%'),
                  ...Constanta({font: 'bold'}),
                }}>
                BOGOR NGAWAS
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
                  color: formLogin.phone.is_filled ? '#01796F' : '#CE2121',
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
                    ? '#01796F'
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
                    ? '#01796F'
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
                  color: formLogin.password.is_filled ? '#01796F' : '#CE2121',
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
                  backgroundColor: '#01796F',
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
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: heightPercentageToDP('2%'),
                  ...Constanta({
                    font: 'regular',
                  }),
                  color: '#01796F',
                }}>
                Atau
              </Text>
              <TouchableOpacity
                onPress={() => {
                  googleSignIn();
                  submitLoginGoogle();
                  // props.navigation.navigate('home', {
                  //   ...paramsData,
                  // });
                  // props.navigation.jumpTo('home', {
                  //   ...paramsData,
                  // });
                }}
                style={[
                  {
                    width: widthPercentageToDP('80%'),
                    height: heightPercentageToDP('7%'),
                    borderRadius: 5,
                    marginTop: heightPercentageToDP('1%'),
                  },
                  props.styles,
                ]}>
                <LinearGradient
                  start={{x: 1.0, y: 1.0}}
                  end={{x: 0.0, y: 0.4}}
                  locations={[0, 0.7]}
                  colors={['#fffffF', '#ffffff']}
                  style={{
                    backgroundColor: 'white',
                    width: widthPercentageToDP('80%'),
                    paddingVertical: widthPercentageToDP('4%'),
                    borderRadius: widthPercentageToDP('2%'),
                    borderColor: '#01796F',
                    borderWidth: 1,
                  }}>
                  {/* <CarbonMap /> */}
                  <Text
                    style={{
                      color: '#01796F',
                      textAlign: 'center',
                      marginLeft: 10,
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Login With Google
                  </Text>
                </LinearGradient>
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
                      color: '#01796F',
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
            <ActivityIndicator size="large" color="#01796F" />
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
