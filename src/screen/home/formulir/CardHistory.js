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
import {CarbonMap, CradNgawas, LogoK3I} from '../../../assets/Assets';
import {BaseContainer, TouchableGradient} from '../../../component';
// import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {GetNgawaS,  NgawasUpdate} from '../../../repositories/ngawas';
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

  const {params: paramsData} = props.route;
  console.log(paramsData, 'ini params dataaa woy');
  const updateNgawas = () => {
    setIsLoading(true);
    NgawasUpdate (paramsData)
      .then(ok => {
        console.log('ok', ok.data);

        if (!ok.success) {
          // alert(ok.message + ',' + JSON.stringify(ok.data));
          setBasicAlertProps({
            basicAlertVisible: true,
            basicAlertShowButton: true,
            withTitle: true,
            basicAlertTitle: 'Gagal',
            basicAlertMessage: ok.message,
            basicAlertOnOk: () => {
              closeBasicAlert();
            },
            basicAlertOkBtnOnly: true,
            basicAlertBtnOkText:
              'Silahkan Coba Kembali setelah dengan data sebelumnya',
          });
        } else {
          // alert(ok.data);
          setBasicAlertProps({
            basicAlertVisible: true,
            basicAlertShowButton: true,
            withTitle: true,
            basicAlertTitle: 'Berhasil',
            basicAlertMessage: ok.message,
            basicAlertOnOk: () => {
              props.navigation.navigate('PanicButton', item)
              closeBasicAlert();
            },
            basicAlertOkBtnOnly: true,
            basicAlertBtnOkText: 'OK',
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
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
          props.navigation.jumpTo('historyngawas');
        },
      }}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              marginTop: heightPercentageToDP('-2%'),
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
              {/* <Image
                source={LogoK3I}
                resizeMode="contain"
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(20),
                }}
              /> */}
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
                BOGOR NGAWAS
              </Text>
            </View>

            <Image
              source={require('../../../assets/Bogor_ngawas.png')}
              style={{
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('60%'),
                marginTop: heightPercentageToDP('18%'),
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
              Berlaku untuk {`${paramsData.penumpangs.length}`} orang dan 1{' '}
              {`${paramsData.type_vehicle.type_name}`}
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
                Selamat Datang Di Kota Bogor
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
                1. Stay Safe
              </Text>
              <Text
                style={{
                  color: '#000',
                  lineHeight: 20,
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                2. Bogor Aman
              </Text>
              <Text
                style={{
                  color: '#000',
                  lineHeight: 20,
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                3. Tegar Beriman
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
            <TouchableOpacity
                onPress={() => {
                  updateNgawas();
                  props.navigation.jumpTo('PanicButton', {
                    ...paramsData,
                  });

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
                {/* <CarbonMap /> */}
                <Text
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    marginLeft: 10,
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Selesai Perjalanan
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </BaseContainer>
  );
};
