import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {
  IconEditData,
  IconKembali,
  IconLanjut,
  IconSilangIco,
  IconTambahPenumpang,
} from '../../assets/Assets';
import Constanta from '../../lib/Constanta';

import TouchableGradient from '../button/TouchableGradient';
export default props => {
  const {auth} = useSelector(state => state);
  // console.log({propsData: props.route.params});
  const stateFormData = props.stateFormData;
  const scrHeight = Dimensions.get('window').height;
  let hTampilan = {};
  if (scrHeight < 732) {
    hTampilan = {height: heightPercentageToDP('80%')};
  } else {
    hTampilan = {height: heightPercentageToDP('95%')};
  }
  const initState = {
    date: new Date(),
    open: false,
  };

  const [tampilPenumpang, setTampilPenumpang] = useState([
    {
      // nationality: auth.userData.getProfile.nationality,
      name: auth.userData.getProfile.person_name,
      nik: auth.userData.getProfile.nik,
    },
  ]);

  useEffect(() => {
    if (props.route.params?.penumpang) {
      setTampilPenumpang(prev => {
        return [...prev, props.route.params?.penumpang];
      });
    }
  }, [props.route.params]);

  return (
    <View
      style={{
        ...hTampilan,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            // fontWeight: '600',
            fontSize: widthPercentageToDP('6%'),
            marginVertical: heightPercentageToDP('2%'),
            ...Constanta({
              font: 'semibold',
            }),
          }}>
          {props.title}
        </Text>
        {/* Data penumpang */}
        {!tampilPenumpang.length ? (
          <View
            style={{
              width: widthPercentageToDP('90%'),
              borderWidth: 1,
              borderColor: '#E5E3FF',
              padding: widthPercentageToDP('5%'),
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '300',
                textAlign: 'center',
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Data penumpang masih kosong
            </Text>
          </View>
        ) : (
          <>
            {tampilPenumpang?.map((tampil, indexPenum) => (
              // <View
              //   key={indexPenum}
              //   style={{
              //     width: widthPercentageToDP('90%'),
              //     borderWidth: 1,
              //     borderColor: '#E5E3FF',
              //     padding: widthPercentageToDP('5%'),
              //     borderRadius: 8,
              //     marginTop: responsiveHeight(1),
              //   }}>
              //   <Text
              //     style={{
              //       color: '#000000',
              //       fontWeight: '300',
              //       ...Constanta({
              //         font: 'regular',
              //       }),
              //     }}>
              //     {tampil.name}
              //   </Text>
              //   <Text
              //     style={{
              //       color: '#00000080',
              //       fontWeight: '300',
              //       ...Constanta({
              //         font: 'regular',
              //       }),
              //     }}>
              //     {tampil.nationality}
              //   </Text>
              // </View>
              <View
                key={indexPenum}
                style={{
                  width: responsiveWidth(90),
                  borderWidth: 1,
                  borderColor: '#E5E3FF',
                  marginVertical: 10,
                  paddingHorizontal: widthPercentageToDP('5%'),
                  paddingVertical: heightPercentageToDP('2%'),
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#4E4E4E',
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}>
                      {tampil.name}
                    </Text>
                    <Text
                      style={{
                        color: '#4E4E4E',
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}>
                      {/* {kendaraan.tipe_kendaraan_title} */}
                      {tampil.nationality}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    {indexPenum == 0 ? (
                      <></>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ngawas.tambahpenumpang');
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <Text
                          style={{
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          Edit Data{' '}
                        </Text>
                        <IconEditData />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: -widthPercentageToDP('2'),
                    top: -heightPercentageToDP('1'),
                  }}>
                  {indexPenum == 0 ? (
                    <></>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(indexPenum, tampilPenumpang, tampil.nik);
                        setTampilPenumpang(prev => {
                          return prev.filter(penum => penum.nik != tampil.nik);
                        });
                        // deleteAction(kendaraan.id);
                      }}>
                      <IconSilangIco />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            width: widthPercentageToDP('100%'),
            marginVertical: heightPercentageToDP('2%'),
            paddingHorizontal: widthPercentageToDP('5%'),
          }}>
          <TouchableGradient
            icon={<IconTambahPenumpang />}
            redirect={'ngawas.tambahpenumpang'}
            onPressData={() =>
              props.navigation.navigate('ngawas.tambahpenumpang')
            }
            title={'Tambah Penumpang'}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: responsiveWidth(25),
          flexDirection: 'row',
          width: responsiveWidth(95),
          justifyContent: 'flex-end',
          marginVertical: heightPercentageToDP('2%'),
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('test');
            props.kembaliFormulir(1);
          }}
          style={{
            height: responsiveHeight(4),
            borderRadius: 5,
            marginHorizontal: widthPercentageToDP('3%'),
            // backgroundColor: '#01796F',
            borderColor: '#01796F',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(25),
          }}>
          {/* <IconKembali /> */}
          <Text
            style={{
              color: '#01796F',
              ...Constanta({
                font: 'regular',
              }),
            }}>
            Sebelumnya
          </Text>
        </TouchableOpacity>
        {/* <Text
          style={{
            ...Constanta({
              font: 'regular',
            }),
          }}>
          Lihat Pratinjau
        </Text> */}
        <TouchableOpacity
          onPress={() => {
            props.lanjutFormulir(3, {
              penumpangs: tampilPenumpang,
            });
          }}
          style={{
            // height: heightPercentageToDP('5%'),
            // borderRadius: 5,
            // marginHorizontal: widthPercentageToDP('3%'),
            height: responsiveHeight(4),
            borderRadius: 5,
            marginHorizontal: widthPercentageToDP('3%'),
            backgroundColor: '#01796F',
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(25),
          }}>
          {/* <IconLanjut />
           */}
          <Text
            style={{
              color: 'white',
              ...Constanta({
                font: 'regular',
              }),
            }}>
            Lihat Pratinjau
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
