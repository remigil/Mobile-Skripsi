import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  AvatarIco,
  IconAvatar,
  IconBelumAdaData,
  IconEditData,
  IconEditPhoto,
  IconHapus,
} from '../../../assets/Assets';
import {BaseContainer, InputTextComp} from '../../../component';
import {List} from 'react-native-paper';
import KeyboardAvoiding from '../../../component/form/KeyboardAvoiding';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import MapView from 'react-native-maps';
import CardNgawas from '../../../component/card/CardNgawas';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import FormAkun from '../formulir/FormAkun';
import Modal from 'react-native-modal';
import InputText from '../../../component/form/InputText';
import InputTextWithIcon from '../../../component/form/InputTextWithIcon';
import {useSelector} from 'react-redux';

const FirstRoute = props => (
  <ScrollView>
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          marginTop: heightPercentageToDP('2%'),
          paddingHorizontal: widthPercentageToDP('9%'),
          borderWidth: 2.5,
          borderColor: '#686565',
          borderStyle: 'dashed',
          paddingVertical: widthPercentageToDP('4%'),
          width: widthPercentageToDP('80%'),
        }}>
        <IconBelumAdaData
          width={widthPercentageToDP('55%')}
          height={widthPercentageToDP('35%')}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: widthPercentageToDP('5%'),
          }}>
          Belum ada data e-KTP
        </Text>
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
            {/* <Text style={{ color: '#01796F', fontSize: widthPercentageToDP('4.5%') }}>Nama Lengkap</Text> */}
            {/* <View style={{ width: 321, height: 47, borderColor: '#CDD1E0', borderWidth: 1, borderRadius: 6, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}> */}

            <InputTextWithIcon
              inputProps={{
                placeholder: 'Masukan Email Akun Anda',
                keyboardType: 'default',
                style: {
                  color: 'black',
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
                width: widthPercentageToDP('90%'),
              }}
              labelProps={{
                status: true,
                title: 'Nama Lengkap',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
              }}
              icon={
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('')}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                    flexDirection: 'row',
                  }}>
                  <Text>Edit Data</Text>
                  <IconEditData
                    width={widthPercentageToDP('5%')}
                    height={heightPercentageToDP('5%')}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View
            style={{
              marginVertical: 5,
            }}>
            <InputTextWithIcon
              inputProps={{
                placeholder: 'Masukan Email Akun Anda',
                keyboardType: 'default',
                style: {
                  color: 'black',
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
                width: widthPercentageToDP('90%'),
              }}
              labelProps={{
                status: true,
                title: 'Nomor Induk Kependudukan',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
              }}
              icon={
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Scan')}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  <IconEditData
                    width={widthPercentageToDP('5%')}
                    height={heightPercentageToDP('5%')}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <InputTextWithIcon
              inputProps={{
                placeholder: 'Masukan Email Akun Anda',
                keyboardType: 'default',
                style: {
                  color: 'black',
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
                width: widthPercentageToDP('90%'),
              }}
              labelProps={{
                status: true,
                title: 'Tanggal Lahir',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
              }}
              icon={
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Scan')}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  <IconEditData
                    width={widthPercentageToDP('5%')}
                    height={heightPercentageToDP('5%')}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <InputTextWithIcon
              inputProps={{
                placeholder: 'Masukan Email Akun Anda',
                keyboardType: 'default',
                style: {
                  color: 'black',
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
                width: widthPercentageToDP('90%'),
              }}
              labelProps={{
                status: true,
                title: 'Kewarganegaraan',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
              }}
              icon={
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Scan')}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  <IconEditData
                    width={widthPercentageToDP('5%')}
                    height={heightPercentageToDP('5%')}
                  />
                </TouchableOpacity>
              }
            />
          </View>
        </View>

        <Text
          style={{
            marginTop: 12,
            color: '#01796F',
            fontSize: widthPercentageToDP('5%'),
          }}>
          Data Lainnya
        </Text>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginVertical: 10,
            }}>
            <InputTextWithIcon
              inputProps={{
                placeholder: 'Masukan Email Akun Anda',
                keyboardType: 'default',
                style: {
                  color: 'black',
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
                width: widthPercentageToDP('90%'),
              }}
              labelProps={{
                status: true,
                title: 'Nomor SIM',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
              }}
              icon={
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Scan')}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  <IconEditData
                    width={widthPercentageToDP('5%')}
                    height={heightPercentageToDP('5%')}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <InputTextWithIcon
              inputProps={{
                placeholder: 'Masukan Email Akun Anda',
                keyboardType: 'default',
                style: {
                  color: 'black',
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
                width: widthPercentageToDP('90%'),
              }}
              labelProps={{
                status: true,
                title: 'Email',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
              }}
              icon={
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Scan')}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  <IconEditData
                    width={widthPercentageToDP('5%')}
                    height={heightPercentageToDP('5%')}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <InputTextWithIcon
              inputProps={{
                placeholder: 'Masukan Email Akun Anda',
                keyboardType: 'default',
                style: {
                  color: 'black',
                },
              }}
              containerProps={{
                marginBottom: heightPercentageToDP('3%'),
                width: widthPercentageToDP('90%'),
              }}
              labelProps={{
                status: true,
                title: 'No Telepon Seluler',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
              }}
              icon={
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Scan')}
                  style={{
                    paddingRight: widthPercentageToDP('2%'),
                  }}>
                  <IconEditData
                    width={widthPercentageToDP('5%')}
                    height={heightPercentageToDP('5%')}
                  />
                </TouchableOpacity>
              }
            />
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
              style={{color: 'white', fontSize: widthPercentageToDP('4.5%')}}>
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FormAkun />
    </View>
  </ScrollView>
);

const SecondRoute = props => (
  <View style={{flex: 1, alignItems: 'center'}}>
    <View
      style={{
        marginTop: heightPercentageToDP('2%'),
        paddingHorizontal: widthPercentageToDP('9%'),
        borderWidth: 2.5,
        borderColor: '#686565',
        borderStyle: 'dashed',
        paddingVertical: widthPercentageToDP('4%'),
        width: widthPercentageToDP('80%'),
      }}>
      <IconBelumAdaData
        width={widthPercentageToDP('55%')}
        height={widthPercentageToDP('35%')}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: widthPercentageToDP('5%'),
        }}>
        Belum ada data e-KTP
      </Text>
    </View>
    <TouchableOpacity
      style={{
        marginVertical: widthPercentageToDP('4%'),
        borderWidth: 1,
        borderColor: '#01796F',
        width: widthPercentageToDP('80%'),
        paddingVertical: widthPercentageToDP('3%'),
        borderRadius: 4,
      }}
      onPress={() => props.navigation.navigate('tambahData')}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: widthPercentageToDP('4.5%'),
          color: '#01796F',
        }}>
        Tambah Data Kendaraan
      </Text>
    </TouchableOpacity>
  </View>
);

export default props => {
  const renderScene = SceneMap({
    first: () => <FirstRoute {...props} />,
    second: () => <SecondRoute {...props} />,
  });
  const [index, setIndex] = React.useState(0);
  const {auth} = useSelector(state => state);
  const [routes] = React.useState([
    // {key: 'first', title: 'Data Diri'},
    {key: 'second', title: 'Data Kendaraan'},
  ]);
  const layout = useWindowDimensions();
  const initState = {
    dataKendaraan: props.route.params != undefined ? [props.route.params] : [],
  };
  const [dataKendaraan, setDataKendaraan] = useState(initState.dataKendaraan);
  console.log(initState);
  const [modal, setModal] = useState(false);
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Akun Saya',
        backIconStyle: true,
        titleStyle: {
          color: '#01796F',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.navigate('ProfileAccount');
        },
      }}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: widthPercentageToDP('5%'),
        }}>
        <View>
          <IconAvatar
            height={widthPercentageToDP('30%')}
            width={widthPercentageToDP('30%')}
          />
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 4,
            }}>
            <TouchableOpacity onPress={() => setModal(true)}>
              <IconEditPhoto
                height={widthPercentageToDP('6%')}
                width={widthPercentageToDP('6%')}
              />
              <Modal
                isVisible={modal}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    borderRadius: 10,
                    width: 192,
                    height: 94,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setModal(false)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomColor: '#E2E2E2',
                      borderBottomWidth: 1,
                      width: 192,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        marginHorizontal: 20,
                        marginBottom: 10,
                      }}>
                      Lihat Foto Profil
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        marginHorizontal: 20,
                        marginTop: 10,
                      }}>
                      Ganti Foto Profil
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '400',
            color: '#28292D',
            fontSize: widthPercentageToDP('5%'),
          }}>
          {auth.userData.getProfile.person_name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '400',
            color: '#01796F',
            fontSize: widthPercentageToDP('4.5%'),
          }}>
          Data Kendaraan Belum Lengkap
        </Text>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{
          marginTop: widthPercentageToDP('5%'),
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
    </BaseContainer>
  );
};
