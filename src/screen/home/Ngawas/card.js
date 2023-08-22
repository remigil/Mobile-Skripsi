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
import {GetNgawaS} from '../../../repositories/ngawas';
export default props => {
  const {params: paramsData} = props.route;
  console.log(paramsData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    GetNgawaS()
      .then(response => {
        console.log({response: response?.data?.data});
        setDataNgawas(response.data.data[0]);
        setDataPenumpang(response.data.data[0].penumpangs.length);
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
  const [dataNgawas, setDataNgawas] = useState([]);
  const [dataPenumpang, setDataPenumpang] = useState('');
  const [dataKendaraan, setDataKendaraan] = useState('');

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Ngawas Card',
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
            {/* <CradNgawas
              nopol={dataNgawas.public_vehicle?.no_vehicle}
              code={dataNgawas.code}
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
                  marginLeft: responsiveWidth(4),
                  fontSize: responsiveFontSize(2),
                }}>
                "Hati-hati, bepergian dengan aman, dan semoga perjalananmu
                menyenangkan."{`\n`}
                {`\n`}BOGOR NGAWAS
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
                marginTop: widthPercentageToDP('2%'),
                textAlign: 'center',
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Berlaku untuk {dataPenumpang} orang dan 1 {dataKendaraan}
              {/* {dataNgawas.type_vehicle.type_name} */}
            </Text>
            <View>
              <Text
                style={{
                  color: '#000',
                  marginTop: widthPercentageToDP('3%'),
                  textAlign: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                  marginBottom: 3,
                }}>
                DOA SELAMAT NAIK KENDARAAN
              </Text>
              <Text
                style={{
                  color: '#000',
                  lineHeight: 40,
                  textAlign: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                  fontSize: responsiveFontSize(1.7),
                }}>
                سُبْحَانَ الَّذِى سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ
                مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ
              </Text>
              <Text
                style={{
                  color: '#000',
                  lineHeight: 30,
                  textAlign: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Alhamdulillahil ladzi sakhkhoro lana hadza wa ma kunna lahu
                muqrinina wa inna ila rabbina lamunqalibun.
              </Text>
              {/* <Text
                style={{
                  color: '#000',
                  lineHeight: 25,
                  textAlign: 'justify',
                  justifyContent: 'center',
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Artinya: “Segala puji bagi Allah yang telah menundukkan semua
                ini bagi kami, padahal sebelumnya kami tidak mampu menguasainya,
                dan sesungguhnya hanya kepada Tuhan kami-lah kami akan kembali.”
              </Text> */}
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
              {moment(dataNgawas.validity_period).format('DD MMMM YYYY')}
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
                  props.navigation.navigate('ngawas.peta', {
                    ...paramsData,
                  });
                }}
                title={'Lihat Ngawas Map'}
                icon={<IconBackToMaps />}
                {...props}
              />
              <TouchableOpacity
                onPress={() => props.navigation.jumpTo('Home')}
                style={{
                  width: widthPercentageToDP('42%'),
                  height: heightPercentageToDP('5%'),
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#01796F',
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
                      color: '#01796F',
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
