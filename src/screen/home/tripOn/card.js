import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {IconBackToHome, IconBackToMaps, LogoK3I} from '../../../assets/Assets';
import {BaseContainer, TouchableGradient} from '../../../component';
import Constanta from '../../../lib/Constanta';
import {GetTripOn} from '../../../repositories/tripon';
export default props => {
  const {params: paramsData} = props.route;
  console.log(paramsData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    GetTripOn()
      .then(response => {
        console.log({response: response?.data?.data});
        setDataTripon(response.data.data[0]);
        setDataPenumpang(response.data.data[0].passenger_trip_ons.length);
        setDataKendaraan(response.data.data[0].type_vehicle.type_name);
        console.log('nah', response.data.data[0]);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const [dataTripon, setDataTripon] = useState([]);
  const [dataPenumpang, setDataPenumpang] = useState('');
  const [dataKendaraan, setDataKendaraan] = useState('');

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Trip On Card',
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
          props.navigation.jumpTo('Home');
        },
      }}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              alignItems: 'center',
              marginVertical: heightPercentageToDP('3%'),
            }}>
            {/* <CardTripon
              nopol={dataTripon.public_vehicle?.no_vehicle}
              code={dataTripon.code}
            /> */}
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
                  marginLeft: responsiveWidth(4),
                  fontSize: responsiveFontSize(2),
                }}>
                PUSAT KENDALI KOORDINASI{`\n`}KOMUNIKASI DAN INFORMASI
              </Text>
            </View>
            <Image
              source={{
                uri: `${
                  'http://34.101.85.12:8080/uploads/qrcode/' +
                  dataTripon.barcode
                }`,
              }}
              style={{
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('60%'),
                marginTop: heightPercentageToDP('18%'),
              }}
            />
            <Text
              style={{
                color: '#000',
                marginTop: widthPercentageToDP('2%'),
                textAlign: 'center',
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Berlaku untuk {dataPenumpang} orang dan 1 {dataKendaraan}
              {/* {dataTripon.type_vehicle.type_name} */}
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
            <Text
              style={{
                color: '#000',
                marginVertical: widthPercentageToDP('5%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Masa Berlaku Sampai :{' '}
              {moment(dataTripon.validity_period).format('DD MMMM YYYY')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: widthPercentageToDP('100%'),
                justifyContent: 'space-evenly',
                // justifyContent: 'space-around',
                marginVertical: heightPercentageToDP('1.5%'),
              }}>
              <TouchableGradient
                onPressData={() => {
                  // console.log(props);
                  props.navigation.navigate('tripon.peta', {
                    ...paramsData,
                  });
                }}
                title={'Lihat Trip On Map'}
                icon={<IconBackToMaps />}
                // redirect={'tripon.profilKendaraan'}
                {...props}
              />
              {/* <TouchableWithoutGradient
                title={'Isi Formulir'}
                icon={<IconBackToHome />}
                redirect={'tripon.tanggalKeberangkatan'}
                {...props}
              /> */}
              <TouchableOpacity
                onPress={() => props.navigation.jumpTo('Home')}
                style={{
                  width: widthPercentageToDP('42%'),
                  height: heightPercentageToDP('5%'),
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#003A91',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconBackToHome />
                  <Text
                    style={{
                      color: '#003A91',
                      textAlign: 'center',
                      marginLeft: 10,
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Kembali
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </BaseContainer>
  );
};
