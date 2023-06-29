import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CarbonMap, CardTripOn, LogoK3I} from '../../../assets/Assets';
import {BaseContainer, TouchableGradient} from '../../../component';
// import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {GetNgawaS} from '../../../repositories/ngawas';
import Constanta from '../../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import moment from 'moment';

export default props => {
  const scrWidth = Dimensions.get('screen').width;
  const scrHeight = Dimensions.get('screen').height;
  let lebarGambar,
    tinggiGambar = {};

  if (scrWidth > 411 || scrHeight <= 731) {
    lebarGambar = {width: widthPercentageToDP('41.5%')};
    tinggiGambar = {height: heightPercentageToDP('30%')};
  } else {
    lebarGambar = {width: widthPercentageToDP('52%')};
    tinggiGambar = {height: heightPercentageToDP('32%')};
  }
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    GetNgawaS()
      .then(response => {
        console.log({response: response.data.data});
        setDataNgawas(response.data.data[0]);
        // console.log('nah', response.data.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const [dataNgawas, setDataNgawas] = useState([]);
  const initState = {
    actionBar: {
      title: 'Main Menus',
      titleStyle: {color: '#aaa'},
      onBackPressed: () => {
        // setBasicAlertProp({
        //   ...basicAlertProp,
        //   visible: true,
        //   title: 'Confirmation',
        //   message: 'Are you sure wanna logout?',
        //   onClose: closeBasicAlert,
        //   onOK: () => dispatch(authLogout()),
        //   isOKOnly: false,
        // });
      },
    },
  };
  const [actionBarData, setActionBarData] = useState(initState.actionBar);
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  const {auth} = useSelector(state => state);
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Kartu Jalan',
        backIconStyle: true,
        titleStyle: {
          color: '#FFF',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
          ...Constanta({
            font: 'bold',
          }),
        },
        onBackPressed: () => {
          props.navigation.goBack();
        },
      }}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              marginTop: heightPercentageToDP('2%'),
              alignItems: 'center',
            }}>
            {dataNgawas == null ? (
              <>
                <Image
                  source={require('../../../assets/ngawas/icon-tidak-ada-data.png')}
                  resizeMode="contain"
                  style={{
                    ...lebarGambar,
                    ...tinggiGambar,
                  }}
                />
                <Text
                  style={{
                    color: '#4E4E4E',
                    fontSize: widthPercentageToDP('6%'),
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Anda Belum memiiki data
                </Text>
              </>
            ) : (
              <>
                {/* <Image
                  source={CardTripOn}
                  style={{
                    marginRight: widthPercentageToDP('6.5%'),
                    width: widthPercentageToDP('95%'),
                  }}
                /> */}
                {/* <View
                  style={{
                    position: 'absolute',
                    marginHorizontal: widthPercentageToDP('6%'),
                    left: widthPercentageToDP('7.5%'),
                    justifyContent: 'center',
                    height: heightPercentageToDP('22%'),
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#FFF',
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}>
                      {dataNgawas.code}
                    </Text>
                    <Text
                      style={{
                        ...Constanta({
                          font: 'bold',
                        }),
                        fontSize: 16,
                        marginTop: 5,
                        color: '#FFF',
                      }}>
                      {auth.userData.getProfile.person_name}
                    </Text>
                  </View>
                </View> */}
                {/* <View
                  style={{
                    position: 'absolute',
                    marginHorizontal: widthPercentageToDP('6%'),
                    left: widthPercentageToDP('7.5%'),
                    justifyContent: 'center',
                    // bottom: 0,
                    zIndex: 9999,
                    // height: heightPercentageToDP('22%'),
                    height: responsiveHeight(40),
                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      ...Constanta({
                        font: 'bold',
                      }),
                      lineHeight: 33,
                      color:
                        'linear-gradient(0deg, rgba(242, 218, 3, 1), rgba(114, 103, 4, 1))',
                    }}>
                    {dataNgawas.public_vehicle?.no_vehicle}
                  </Text>
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    // marginVertical: 50,
                    zIndex: 999,
                    height: responsiveHeight(20),
                    // marginHorizontal: responsiveWidth(2),
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={LogoK3I}
                    resizeMode="contain"
                    style={{
                      width: responsiveWidth(20),
                      height: responsiveHeight(20),
                    }}
                  />
                  <Text
                    style={{
                      color: '#000',
                      ...Constanta({
                        font: 'semibold',
                      }),
                      textAlign: 'center',
                      marginLeft: responsiveWidth(2),
                      fontSize: responsiveFontSize(2),
                    }}>
                    PUSAT KENDALI KOORDINASI{`\n`}KOMUNIKASI DAN INFORMASI
                  </Text>
                </View>
                <Image
                  source={{
                    uri: `${
                      'http://108.136.137.131:3001/uploads/qrcode/' +
                      dataNgawas.barcode
                    }`,
                  }}
                  style={{
                    width: widthPercentageToDP('50%'),
                    height: widthPercentageToDP('50%'),
                    marginTop: heightPercentageToDP('20%'),
                  }}
                />
                <Text
                  style={{
                    color: '#000',
                    marginTop: widthPercentageToDP('3%'),
                    textAlign: 'center',
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Berlaku untuk 3 orang dan 1 mobil
                </Text>
                <View>
                  <Text
                    style={{
                      color: '#000',
                      marginTop: widthPercentageToDP('3%'),
                      textAlign: 'left',
                      ...Constanta({
                        font: 'regular',
                      }),
                      marginBottom: 3,
                    }}>
                    Syarat dan Ketentuan:
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      lineHeight: 20,
                      ...Constanta({
                        font: 'regular',
                      }),
                      fontSize: responsiveFontSize(1.7),
                    }}>
                    1. Dilarang menggandakan/memperbanyak QR Code
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      lineHeight: 20,
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    2. QR Code tidak boleh diperjualbelikan
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      lineHeight: 20,
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    3. Menunjukkan QR Code kepada petugas
                  </Text>
                </View>
                <View
                  style={
                    {
                      // marginTop: heightPercentageToDP('3%'),
                    }
                  }>
                  <Text
                    style={{
                      color: '#000',
                      marginVertical: widthPercentageToDP('5%'),
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Masa Berlaku Sampai :{' '}
                    {moment(dataNgawas.validity_period).format('DD MMMM YYYY')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.jumpTo('PetaNgawas', {
                      ...dataNgawas,
                    });
                    // console.log(props.navigation);
                    //   props.navigation.navigate('tripon.index', {
                    //   screen: 'tripon.peta',
                    // })
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
                    colors={['#01796F', '#01796F']}
                    style={{
                      flex: 1,
                      borderRadius: 5,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: heightPercentageToDP('80%'),
                    }}>
                    <CarbonMap />
                    <Text
                      style={{
                        color: '#FFF',
                        textAlign: 'center',
                        marginLeft: 10,
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}>
                      Lihat Ngawas Map
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </BaseContainer>
  );
};
