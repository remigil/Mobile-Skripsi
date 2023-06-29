import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert, Platform} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {BottomHomeNavigation} from './bottomNavigation';
import {
  AvatarIco,
  ContactCentre,
  Faq,
  LogoutIco,
  PanduanIco,
  QRtripon,
  Settings,
  SocialMediIco,
} from '../../assets/Assets';
import LinearGradient from 'react-native-linear-gradient';
import {
  BeritaKorlantas,
  CallCenter,
  CardHistory,
  DataKendaraan,
  DetailBerita,
  DetailNotifikasi,
  FormNgawas,
  History_Ngawas,
  ListBerita,
  Notifikasi,
  PanicButton,
  PetaHistory,
  PetaNgawas,
  ProfileAccountScreen,
  PusatBantuan,
  PusatBantuan2,
  scanKTP,
  SimpanScreen,
  Sosial_Media,
  StakeholderKorlantas,
  TambahData,
  WebKorlantas,
} from '../home';
import DialogContainer, {
  BasicAlertProps,
} from '../../component/container/dialogContainer';
import Modal from 'react-native-modal';

import {authLogout} from '../../redux/auth/action';
// import {HalamanFAQ} from '../home/sidebar/export';
import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Avatar} from 'react-native-paper';
import {API_BASE_URL_TRACK} from '@env';

const CustDrawer = props => {
  const [basicModal, setBasicModal] = useState(BasicAlertProps);
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const closeBasicAlert = () => {
    setBasicModal({
      ...basicModal,
      basicAlertVisible: false,
      basicAlertTitle: null,
      basicAlertMessage: null,
      onClose: null,
      iconClose: false,
    });
  };
  const [modal, setModal] = useState(false);
  const menuDrawer = [
    // {
    //   icon: <ContactCentre width={28} height={28} />,
    //   title: 'Call Centre',
    //   name: 'callcentre',
    //   id: 'callcentre',
    //   onPress: () => {
    //     props.navigation.navigate('CallCenter');
    //   },
    // },
    // {
    //   icon: <QRtripon width={28} height={28} />,
    //   title: 'MyQR TripOn',
    //   name: 'tripon',
    //   id: 'tripon',
    //   onPress: () => {
    //     props.navigation.navigate('FromTripOn');
    //   },
    // },
    {
      icon: <QRtripon width={28} height={28} />,
      title: 'Bogor Ngawas',
      name: 'historyngawas',
      id: 'historyngawas',
      onPress: () => {
        props.navigation.navigate('historyngawas');
      },
    },
    // {
    //   icon: <Faq width={28} height={28} />,
    //   title: 'FAQ',
    //   name: 'faq',
    //   id: 'faq',
    //   onPress: () => {
    //     props.navigation.navigate('HalamanFaq');
    //   },
    // },
    // {
    //   icon: <PanduanIco width={28} height={28} />,
    //   title: 'Panduan',
    //   name: 'panduan',
    //   id: 'panduan',
    //   onPress: () => {
    //     props.navigation.navigate('Home');
    //     setTimeout(() => {
    //       setBasicModal({
    //         basicAlertVisible: true,
    //         basicAlertShowButton: true,
    //         withTitle: true,
    //         basicAlertTitle:
    //           'Apakah Kamu Yakin Ingin Mengunduh file panduan dari Aplikasi ini ?',

    //         basicAlertOnOk: async () => {},
    //         basicAlertOnClosed: () => {
    //           closeBasicAlert();
    //         },
    //         basicAlertOkBtnOnly: false,
    //         basicAlertBtnOkText: 'Unduh',
    //         basicAlertBtnClosedText: 'Batalkan',
    //       });
    //     }, 1000);
    //   },
    // },
    // {
    //   icon: <SocialMediIco width={28} height={28} />,
    //   title: 'Sosial Media',
    //   name: 'sosmed',
    //   id: 'sosmed',
    //   onPress: () => {
    //     props.navigation.navigate('SosialMedia');
    //   },
    // },
    {
      icon: <LogoutIco width={28} height={28} />,
      title: 'Logout',
      name: 'logout',
      id: 'logout',
      onPress: () => {
        setBasicModal({
          basicAlertVisible: true,
          basicAlertTitle: 'Apakah Kamu Yakin Ingin Keluar Dari Aplikasi ini ?',

          basicAlertOnOk: async () => {
            dispatch(authLogout());
          },
          basicAlertOnClosed: () => {
            closeBasicAlert();
          },
          basicAlertOkBtnOnly: false,
          basicAlertBtnOkText: 'Konfirmasi',
          basicAlertBtnClosedText: 'Batalkan',
          basicAlertShowButton: true,
          withTitle: true,
        });
      },
    },
  ];
  let styleElevation = {};
  if (Platform.OS == 'android') {
    styleElevation = {elevation: 3};
  } else {
    styleElevation = {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    };
  }

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: '#fff',
      }}>
      <LinearGradient
        start={{x: 1.0, y: 1.0}}
        end={{x: 0.0, y: 0.4}}
        locations={[0, 0.7]}
        colors={['#01796F', '#01796F']}
        style={{flex: 1, top: -6}}>
        <View style={[{marginBottom: 10}]}>
          <View
            style={{
              height: responsiveHeight(23),
              paddingVertical: heightPercentageToDP('4%'),
              paddingHorizontal: heightPercentageToDP('2%'),
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: heightPercentageToDP('2.5%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Bogor Ngawas
            </Text>
            <View
              style={{
                color: '#FFFFFF',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: responsiveHeight(1),
                // justifyContent: 'center',
              }}>
              {auth?.userData?.getProfile?.foto ? (
                <Avatar.Image
                  source={{
                    uri:
                      `${API_BASE_URL_TRACK}uploads/society/` +
                      auth?.userData?.getProfile?.foto,
                  }}
                />
              ) : (
                <AvatarIco
                  height={heightPercentageToDP('15%')}
                  width={widthPercentageToDP('15%')}
                />
              )}

              <View
                style={{
                  // paddingLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: widthPercentageToDP('50%'),
                }}>
                <View>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: widthPercentageToDP('3%'),
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Profile Account
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: widthPercentageToDP('5%'),
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    {auth?.userData?.getProfile?.person_name}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    // width: widthPercentageToDP('100%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ProfileAccount');
                    }}>
                    <Settings />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* <Modal
            isVisible={modal}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                paddingVertical: 16,
                borderRadius: 14,
                width: widthPercentageToDP('72%'),
                height: heightPercentageToDP('16%'),
              }}>
              <View
                style={{
                  borderBottomColor: '#00000026',
                  borderBottomWidth: 1,
                  paddingBottom: heightPercentageToDP('1%'),
                }}>
                <Text
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginRight: 16,
                    marginLeft: 16,
                    fontSize: 17,
                  }}>
                  Apakah Kamu Yakin Ingin Mengunduh file panduan dari Aplikasi
                  ini ?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setModal(false)}
                  style={{
                    borderColor: '#00000026',
                    borderRightWidth: 1,
                    paddingVertical: heightPercentageToDP('1.5%'),
                    paddingRight: widthPercentageToDP('12%'),
                    borderRightWidth: 1,
                  }}>
                  <Text style={{color: '#01796F'}}>Batalkan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModal(false)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: widthPercentageToDP('10%'),
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={{color: '#01796F'}}>Unduh</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
        </View>
      </LinearGradient>

      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          top: -20,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: responsiveHeight(60),
          paddingVertical: responsiveWidth(4),
        }}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            // top: -30,
            borderRadius: 18,
            // paddingVertical: responsiveWidth(4),
            // paddingHorizontal: 13,
            // marginHorizontal: 20,
          }}>
          <DrawerItemList {...props} />
          {menuDrawer.map(menu => (
            <DrawerItem
              pressColor={'transparent'}
              key={menu.id + 'eee'}
              icon={props => menu.icon}
              labelStyle={[
                {
                  color: '#01796F',
                  fontSize: responsiveFontSize(2),
                  ...Constanta({font: 'regular'}),
                },
              ]}
              style={{
                backgroundColor: '#fff',
                ...styleElevation,
                borderRadius: 30,
                marginVertical: 5,
                paddingLeft: responsiveWidth(8),
                borderWidth: Platform.OS == 'ios' ? 0.8 : 0,
                borderColor: Platform.OS == 'ios' ? '#01796F' : 'transparent',
              }}
              label={menu.title}
              onPress={() => menu.onPress(props)}
            />
          ))}
        </View>
      </View>
      <DialogContainer {...basicModal} />
    </DrawerContentScrollView>
  );
};
export const HomeDrawerNav = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      edgeWidth={widthPercentageToDP('50%')}
      drawerContent={props => <CustDrawer {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: props => <ContactCentre />,

          drawerItemStyle: {
            display: 'none',
          },
          title: 'Call Centre',
        }}
        component={BottomHomeNavigation}
        name="HomeDrawer"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Call Centre',
        }}
        component={ProfileAccountScreen}
        name="ProfileAccount"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Call Centre',
        }}
        component={CallCenter}
        name="CallCenter"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Call Centre',
        }}
        component={FormNgawas}
        name="FormNgawas"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Card History',
        }}
        component={CardHistory}
        name="CardHistory"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Peta History',
        }}
        component={PetaHistory}
        name="PetaHistory"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'ScanKTP',
        }}
        component={scanKTP}
        name="ScanKTP"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Notifikasi',
        }}
        component={Notifikasi}
        name="Notifikasi"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'DetailNotifikasi',
        }}
        component={DetailNotifikasi}
        name="DetailNotifikasi"
      />
      {/* <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Faq',
        }}
        component={HalamanFAQ}
        name="HalamanFaq"
      /> */}
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Faq',
        }}
        component={PetaNgawas}
        name="PetaNgawas"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Pusat Bantuan',
        }}
        component={PusatBantuan}
        name="PusatBantuan"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Pusat Bantuan',
        }}
        component={PusatBantuan2}
        name="PusatBantuan2"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Panic Button',
        }}
        component={PanicButton}
        name="PanicButton"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Sosial Media',
        }}
        component={Sosial_Media}
        name="SosialMedia"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Tambah Data',
        }}
        component={TambahData}
        name="tambahData"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Tambah Data',
        }}
        component={DataKendaraan}
        name="dataKendaraan"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Simpan Screen',
        }}
        component={SimpanScreen}
        name="SimpanScreen"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'List Berita',
        }}
        component={ListBerita}
        name="listberita"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Detail Berita',
        }}
        component={DetailBerita}
        name="detailberita"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Website Korlantas',
        }}
        component={WebKorlantas}
        name="webkorlantas"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Berita Korlantas',
        }}
        component={BeritaKorlantas}
        name="beritakorlantas"
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          title: 'History Ngawas',
        }}
        component={History_Ngawas}
        name="historyngawas"
      />
    </Drawer.Navigator>
  );
};
