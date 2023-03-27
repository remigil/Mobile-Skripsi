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
import {GetTripOn} from '../../../repositories/tripon';
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
    GetTripOn()
      .then(response => {
        console.log({response: response.data.data});
        setDataTripon(response.data.data[0]);
        // console.log('nah', response.data.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const [dataTripon, setDataTripon] = useState([]);
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

  const {params: paramsData} = props.route;
  console.log(paramsData, 'ini params dataaa woy');
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Bogor Ngawas Card',
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
          props.navigation.jumpTo('historytripon');
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
                  'http://34.101.85.12:8080/uploads/qrcode/' +
                  paramsData.barcode
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
              Berlaku untuk {`${paramsData.passenger_trip_ons.length}`} orang
              dan 1 {`${paramsData.type_vehicle.type_name}`}
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
                {moment(paramsData.validity_period).format('DD MMMM YYYY')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.jumpTo('PetaHistory', {
                  ...paramsData,
                });
                // console.log({
                //   paramsData,
                // });
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
                colors={['#275DAD', '#003A91']}
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
                  Lihat TripOn Map
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </BaseContainer>
  );
};
