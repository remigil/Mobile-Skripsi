import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {IconLocation} from '../../assets/Assets';

import {DropdownOption} from '..';

import {useSelector} from 'react-redux';
import DialogContainer, {BasicAlertProps} from '../container/dialogContainer';
import {useRoute} from '@react-navigation/native';
import {GetKendaraan} from '../../repositories/ngawas';
import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {decryptResponseAPI} from '../../lib/decrptyResponApi';
export default props => {
  const route = useRoute();

  const scrHeight = Dimensions.get('screen').height;
  let hTampilan = {};
  if (scrHeight < 731) {
    hTampilan = {height: heightPercentageToDP('95%')};
  } else {
    hTampilan = {height: heightPercentageToDP('80%')};
  }
  let stateFormData = props.stateFormData;

  const initState = {
    keterangan_keberangkatan: {
      nopol: {
        value: stateFormData.vehicle_id,
        data: [],
      },
      lokasi_awal: {
        value: stateFormData.start_coordinate
          ? stateFormData.start_coordinate
          : '',
      },
      lokasi_tujuan: {
        value: stateFormData.end_coordinate ? stateFormData.end_coordinate : '',
      },
    },
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initState.basicAlertProps,
  });

  const closeBasicAlert = () => {
    setIsAlert(false);
    setBasicAlertProps({
      // ...basicAlertProps,
      basicAlertVisible: false,
      basicAlertTitle: null,
      basicAlertMessage: null,
      iconClose: false,
    });
  };

  const [isAlert, setIsAlert] = useState(false);
  const pointing = useSelector(state => state.pointingData);

  const [formKeterangan, setFormKeterangan] = useState(
    initState.keterangan_keberangkatan,
  );
  useEffect(() => {
    if (route.params?.awal) {
      setFormKeterangan({
        ...formKeterangan,
        lokasi_awal: {
          value: route.params?.awal,
        },
      });
    }
  }, [route.params?.awal]);
  useEffect(() => {
    if (route.params?.akhir) {
      setFormKeterangan({
        ...formKeterangan,
        lokasi_tujuan: {
          value: route.params?.akhir,
        },
      });
    }
  }, [route.params?.akhir]);
  const [isSelectPolisi, setIsSelectPolisi] = useState(null);
  useEffect(() => {
    // setIsLoading(true);
    GetKendaraan()
      .then(succ => {
        let aaa = decryptResponseAPI({
          msg: stateFormData.vehicle_id,
        });
        let mapKendaraan = succ.data.data.map(es => ({
          title: es.no_vehicle,
          value: es.id,
          valueToDatabase: es.id,
          selected:
            parseInt(aaa) ==
            parseInt(
              decryptResponseAPI({
                msg: es.id,
              }),
            )
              ? true
              : false,
        }));
        if (mapKendaraan.filter(esr => esr.selected == true).length) {
          console.log('sini');
          setIsSelectPolisi(
            mapKendaraan.filter(esr => esr.selected == true)[0].title,
          );
        }

        setFormKeterangan({
          ...formKeterangan,
          nopol: {
            ...formKeterangan.nopol,
            data: mapKendaraan,
          },
        });
        // console.log({succ: succ.data.data});
      })
      .catch(err => {})
      .finally(() => {
        // setIsLoading(false);
      });
  }, []);

  return (
    <View
      style={{
        height: responsiveScreenHeight(90),
        // ...hTampilan,
      }}>
      <ScrollView nestedScrollEnabled={true}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              fontWeight: '600',
              fontSize: widthPercentageToDP('6%'),
              marginVertical: heightPercentageToDP('2%'),
              ...Constanta({
                font: 'semibold',
              }),
            }}>
            {props.title}
          </Text>
          {/* Nomor Polisi */}
          <DropdownOption
            titleMaster={'Nomor Registrasi'}
            AccordianData={{
              title: isSelectPolisi ? isSelectPolisi : 'Pilih Nomor Registrasi',
              data: formKeterangan.nopol.data,
              valueForEdit: isSelectPolisi
                ? isSelectPolisi
                : 'Pilih Nomor Registrasi',
            }}
            selectItemAccordian={value => {
              setFormKeterangan({
                ...formKeterangan,
                nopol: {
                  ...formKeterangan.nopol,
                  value: value,
                },
              });
            }}
          />

          {/* Titik Lokasi */}
          <View>
            <View
              style={{
                width: widthPercentageToDP('84%'),
                marginVertical: heightPercentageToDP('1%'),
              }}>
              <Text
                style={{
                  color: '#01796F',
                  fontWeight: '400',
                  fontSize: responsiveFontSize(2.5),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Titik Lokasi Keberangkatan
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#CDD1E0',
                width: widthPercentageToDP('84%'),
                height: heightPercentageToDP('6%'),
                justifyContent: 'center',
                borderRadius: responsiveWidth(2.3),
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: widthPercentageToDP('80%'),
                }}
                onPress={() =>
                  props.navigation.navigate('ngawas.pointingMaps', {
                    title: 'Titik Lokasi Keberangkatan',
                    code: 'awal',
                    tempat: 'berangkat',
                  })
                }>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text
                    style={{
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    {formKeterangan.lokasi_awal.value.latitude == '' ||
                    formKeterangan.lokasi_awal.value.latitude == undefined
                      ? 'Klik untuk menandakan lokasi'
                      : formKeterangan.lokasi_awal?.value?.latitude +
                        ',' +
                        formKeterangan.lokasi_awal?.value?.longitude}

                    {/* {formKeberangkatan.date.values
                  ? moment(formKeberangkatan.date.value).format('YYYY-MM-DD') */}
                    {/* : 'Pilih Tanggal'} */}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconLocation />
                </View>
              </Pressable>
            </View>
          </View>
          {/* Titik Lokasi Tujuan */}
          <View>
            <View
              style={{
                width: widthPercentageToDP('84%'),
                marginVertical: heightPercentageToDP('1%'),
              }}>
              <Text
                style={{
                  color: '#01796F',
                  fontWeight: '400',
                  fontSize: responsiveFontSize(2.5),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Titik Lokasi Tujuan
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#CDD1E0',
                width: widthPercentageToDP('84%'),
                height: heightPercentageToDP('6%'),
                justifyContent: 'center',
                borderRadius: responsiveWidth(2.4),
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: widthPercentageToDP('80%'),
                }}
                onPress={() =>
                  props.navigation.navigate('ngawas.pointingMaps', {
                    title: 'Titik Lokasi Tujuan',
                    code: 'akhir',
                  })
                }>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text
                    style={{
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    {formKeterangan.lokasi_tujuan.value.latitude == '' ||
                    formKeterangan.lokasi_tujuan.value.latitude == undefined
                      ? 'Klik untuk menandakan lokasi'
                      : formKeterangan.lokasi_tujuan?.value?.latitude +
                        ',' +
                        formKeterangan.lokasi_tujuan?.value?.longitude}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconLocation />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

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
            props.kembaliFormulir(1);
          }}
          style={{
            // height: heightPercentageToDP('5%'),
            // borderRadius: 5,
            // marginHorizontal: widthPercentageToDP('3%'),
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
              ...Constanta({font: 'regular'}),
              color: '#01796F',
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
          Langkah 2 dari 3
        </Text> */}
        <TouchableOpacity
          onPress={() => {
            if (
              formKeterangan.lokasi_awal.value == '' ||
              formKeterangan.lokasi_tujuan.value == '' ||
              formKeterangan.nopol.value == ''
            ) {
              setIsAlert(true);
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertTitle: 'Perhatian',
                basicAlertMessage: 'Nopol atau Titik Lokasi belum dipilih',
                basicAlertOnOk: () => {
                  closeBasicAlert();
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Kembali',
                basicAlertShowButton: true,
                withTitle: true,
              });
            } else {
              props.lanjutFormulir(3, {
                start_coordinate: formKeterangan.lokasi_awal.value,
                end_coordinate: formKeterangan.lokasi_tujuan.value,
                vehicle_id: formKeterangan.nopol.value,
              });
            }
          }}
          style={{
            height: responsiveHeight(4),
            borderRadius: 5,
            marginHorizontal: widthPercentageToDP('3%'),
            backgroundColor: '#01796F',
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(25),
          }}>
          {/* <IconLanjut /> */}
          <Text
            style={{
              ...Constanta({font: 'regular'}),
              color: 'white',
            }}>
            Selanjutnya
          </Text>
        </TouchableOpacity>
      </View>
      {isAlert && (
        <>
          <DialogContainer {...basicAlertProps} />
        </>
      )}
    </View>
  );
};
