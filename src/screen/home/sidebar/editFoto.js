import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
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
} from '../../../assets/Assets';
import {BaseContainer} from '../../../component';
import {List} from 'react-native-paper';
import KeyboardAvoiding from '../../../component/form/KeyboardAvoiding';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import MapView from 'react-native-maps';
import CardTripon from '../../../component/card/CardTripon';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import FormAkun from '../Formulir/FormAkun';
import Modal from 'react-native-modal';

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
            <Text
              style={{color: '#01796F', fontSize: widthPercentageToDP('4.5%')}}>
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
              <Text style={{color: 'black', fontsize: 12, marginLeft: 16}}>
                Roki Al Akhnafi
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 9,
                }}>
                <Text style={{color: 'black', fontsize: 12, marginRight: 7}}>
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
              style={{color: '#01796F', fontSize: widthPercentageToDP('4.5%')}}>
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
                <Text style={{color: 'black', size: 12, marginRight: 7}}>
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
              style={{color: '#01796F', fontSize: widthPercentageToDP('4.5%')}}>
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
                <Text style={{color: 'black', size: 12, marginRight: 7}}>
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
              style={{color: '#01796F', fontSize: widthPercentageToDP('4.5%')}}>
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
                <Text style={{color: 'black', size: 12, marginRight: 7}}>
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
              style={{color: '#01796F', fontSize: widthPercentageToDP('4.5%')}}>
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
                <Text style={{color: 'black', size: 12, marginRight: 7}}>
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
                <Text style={{color: 'black', size: 12, marginRight: 7}}>
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
              style={{color: '#01796F', fontSize: widthPercentageToDP('4.5%')}}>
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
                <Text style={{color: '#000000', size: 12, marginRight: 7}}>
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
          fontSize: widthPercentageToDP('6%'),
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
  const [routes] = React.useState([
    {key: 'first', title: 'Data Diri'},
    {key: 'second', title: 'Data Kendaraan'},
  ]);
  const layout = useWindowDimensions();
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
          Roki Al Akhnafi
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
