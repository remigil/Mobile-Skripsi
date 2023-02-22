import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  IconCalendar,
  IconJam,
  IconLanjut,
  IconLocation,
} from '../../assets/Assets';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DialogContainer, {BasicAlertProps} from '../container/dialogContainer';
import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import DropdownOption from '../form/DropdownOption';
import {GetKendaraan} from '../../repositories/tripon';
import {decryptResponseAPI} from '../../lib/decrptyResponApi';
export default props => {
  const route = useRoute();
  const navigasi = useNavigation();

  const scrHeight = Dimensions.get('screen').height;
  // console.log(props);
  let stateFormData = props.stateFormData;
  console.log({props});
  let hTampilan = {};
  if (scrHeight > 731) {
    hTampilan = {height: heightPercentageToDP('85%')};
  } else {
    hTampilan = {height: heightPercentageToDP('95%')};
  }
  // useEffect(() => {
  //   console.log('tinggi =>', scrHeight);
  // }, []);
  const initState = {
    date: new Date(),
    open: false,
    formKeberangkatan: {
      date: {
        value: stateFormData?.departure_date
          ? stateFormData?.departure_date
          : '',
      },
      time: {
        value: stateFormData?.departure_time
          ? stateFormData?.departure_time
          : '',
      },
    },
    keterangan_keberangkatan: {
      nopol: {
        value: stateFormData.vechicle_id,
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
      awal: {
        value: stateFormData.awal ? stateFormData.awal : '',
      },
      tujuans: {
        value: stateFormData.tujuans ? stateFormData.tujuans : '',
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

  const [openDate, setOpenDate] = useState(initState.open);
  const [openTime, setOpenTime] = useState(initState.open);
  const [dateNow, setDateNow] = useState(initState.date);
  const [timeNow, setTimeNow] = useState(initState.date);
  const [formKeberangkatan, setFormKeberangkatan] = useState(
    initState.formKeberangkatan,
  );
  const [formKeterangan, setFormKeterangan] = useState(
    initState.keterangan_keberangkatan,
  );
  // useEffect(() => {
  //   if (route.params?.awal) {
  //     setFormKeterangan({
  //       ...formKeterangan,

  //     });
  //   }
  // }, [route.params?.awal]);
  useEffect(() => {
    if (route?.params?.awalss) {
      setFormKeterangan({
        ...formKeterangan,
        awal: {
          value: route?.params?.awalss,
        },
        lokasi_awal: {
          value: route.params?.awal,
        },
      });
    }
  }, [route?.params?.awalss]);
  useEffect(() => {
    if (route.params?.akhirss) {
      setFormKeterangan({
        ...formKeterangan,
        tujuans: {
          value: route.params?.akhirss,
        },
        lokasi_tujuan: {
          value: route.params?.akhir,
        },
      });
    }
  }, [route.params?.akhirss]);
  // useEffect(() => {
  //   if (route.params?.akhir) {
  //     setFormKeterangan({
  //       ...formKeterangan,
  //       lokasi_tujuan: {
  //         value: route.params?.akhir,
  //       },
  //     });
  //   }
  // }, [route.params?.akhir]);
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
        height: responsiveHeight(90),
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
            fontSize: widthPercentageToDP('6%'),
            marginVertical: heightPercentageToDP('2%'),
            ...Constanta({
              font: 'semibold',
            }),
          }}>
          {props.title}
        </Text>
        {/* input Tanggal */}
        <View
          style={{
            width: widthPercentageToDP('90%'),
            marginVertical: heightPercentageToDP('1%'),
          }}>
          <Text
            style={{
              color: '#003A91',
              fontWeight: '400',
              fontSize: widthPercentageToDP('4%'),
              ...Constanta({
                font: 'regular',
              }),
            }}>
            Keterangan Keberangkatan
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#CDD1E0',
            width: widthPercentageToDP('90%'),
            height: heightPercentageToDP('6%'),
            justifyContent: 'center',
            borderRadius: 4,
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: widthPercentageToDP('80%'),
            }}
            onPress={() => setOpenDate(true)}>
            <View>
              <Text
                style={{
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                {formKeberangkatan.date.value
                  ? moment(formKeberangkatan.date.value).format('DD/MM/YYYY')
                  : 'Pilih Tanggal'}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#003A91',
                  // fontWeight: '800',
                  position: 'absolute',
                  ...Constanta({
                    font: 'bold',
                  }),
                }}>
                {moment().format('D')}
              </Text>
              <IconCalendar />
            </View>
          </Pressable>
        </View>
        {/* input jam */}
        <View
          style={{
            width: widthPercentageToDP('90%'),
            marginVertical: heightPercentageToDP('1%'),
          }}>
          <Text
            style={{
              color: '#003A91',
              fontWeight: '400',
              fontSize: widthPercentageToDP('4%'),
              ...Constanta({
                font: 'regular',
              }),
            }}>
            Waktu Keberangkatan
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#CDD1E0',
            width: widthPercentageToDP('90%'),
            height: heightPercentageToDP('6%'),
            justifyContent: 'center',
            borderRadius: 4,
            alignItems: 'center',
            marginBottom: responsiveHeight(2),
          }}>
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: widthPercentageToDP('80%'),
            }}
            onPress={() => setOpenTime(true)}>
            <View>
              <Text
                style={{
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                {/* {console.log(new Date().getDay())} */}
                {formKeberangkatan.time.value
                  ? formKeberangkatan.time.value
                  : 'Pilih Waktu'}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconJam />
            </View>
          </Pressable>
        </View>
        {/* <Text
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
          Keterangan Keberangkatan
        </Text> */}
        {/* Nomor Polisi */}
        <DropdownOption
          titleMaster={'Nomor Registrasi'}
          AccordianData={{
            title: isSelectPolisi ? isSelectPolisi : 'Pilih Nopol',
            data: formKeterangan.nopol.data,
            valueForEdit: isSelectPolisi ? isSelectPolisi : 'Pilih Nopol',
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
          styleData={{
            titleHeader: {
              color: '#003A91',
              fontSize: widthPercentageToDP('5%'),
            },
            titlePlaceholder: {
              color: '#8E8F90',
            },
            header: {
              width: widthPercentageToDP('90%'),
              borderWidth: 1,
              borderColor: '#CDD1E0',
              alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: 'white',
            },
            option: {
              width: widthPercentageToDP('84%'),
              borderWidth: 1,
              borderColor: '#CDD1E0',
              alignSelf: 'center',
            },
          }}
        />
        {/* Titik Lokasi */}
        <View>
          <View
            style={{
              width: widthPercentageToDP('90%'),
              marginVertical: heightPercentageToDP('1%'),
            }}>
            <Text
              style={{
                color: '#003A91',
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
              width: widthPercentageToDP('90%'),
              height: heightPercentageToDP('6%'),
              justifyContent: 'center',
              borderRadius: responsiveWidth(1.5),
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: widthPercentageToDP('90%'),
              }}
              onPress={() =>
                navigasi.navigate('tripon.pointingMaps', {
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
                    width: responsiveWidth(75),
                  }}>
                  {formKeterangan.awal.value == '' ||
                  formKeterangan.awal.value == undefined
                    ? 'Klik untuk menandakan lokasi'
                    : formKeterangan.awal?.value +
                      ',' +
                      formKeterangan.awal?.value}

                  {/* {formKeberangkatan.date.values
                  ? moment(formKeberangkatan.date.value).format('YYYY-MM-DD') */}
                  {/* : 'Pilih Tanggal'} */}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginEnd: responsiveWidth(1),
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
              width: widthPercentageToDP('90%'),
              marginVertical: heightPercentageToDP('1%'),
            }}>
            <Text
              style={{
                color: '#003A91',
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
              width: widthPercentageToDP('90%'),
              height: heightPercentageToDP('6%'),
              justifyContent: 'center',
              borderRadius: responsiveWidth(1.5),
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: widthPercentageToDP('85%'),
              }}
              onPress={() =>
                navigasi.navigate('tripon.pointingMaps', {
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
                    width: responsiveWidth(75),
                  }}>
                  {formKeterangan.tujuans.value == '' ||
                  formKeterangan.tujuans.value == undefined
                    ? 'Klik untuk menandakan lokasi'
                    : formKeterangan.tujuans?.value +
                      ',' +
                      formKeterangan.tujuans?.value}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginEnd: responsiveWidth(1),
                }}>
                <IconLocation />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: responsiveWidth(25),
          flexDirection: 'row',
          width: responsiveWidth(95),
          justifyContent: 'flex-end',
          // marginVertical: heightPercentageToDP('5%'),
        }}>
        <TouchableOpacity
          onPress={() => {
            if (
              formKeberangkatan.date.value == '' ||
              formKeberangkatan.time.value == '' ||
              formKeterangan.lokasi_awal.value == '' ||
              formKeterangan.lokasi_tujuan.value == '' ||
              formKeterangan.nopol.value == ''
            ) {
              setIsAlert(true);
              setBasicAlertProps({
                basicAlertVisible: true,
                basicAlertTitle: 'Perhatian',
                basicAlertMessage: 'masih ada form yang belum di pilih',
                basicAlertOnOk: () => {
                  closeBasicAlert();
                },
                basicAlertOkBtnOnly: true,
                basicAlertBtnOkText: 'Kembali',
                basicAlertShowButton: true,
                withTitle: true,
              });
            } else {
              props.lanjutFormulir(2, {
                departure_date: moment(formKeberangkatan.date.value).format(
                  'YYYY-MM-DD',
                ),
                departure_time: formKeberangkatan.time.value,
                start_coordinate: formKeterangan.lokasi_awal.value,
                end_coordinate: formKeterangan.lokasi_tujuan.value,
                vehicle_id: formKeterangan.nopol.value,
                tujuans: formKeterangan.tujuans.value,
                awal: formKeterangan.awal.value,
              });
            }
          }}
          style={{
            height: responsiveHeight(4),
            borderRadius: 5,
            marginHorizontal: widthPercentageToDP('3%'),
            backgroundColor: '#003A91',
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
      {/* pilih tanggal */}
      <DatePicker
        modal
        mode={'date'}
        cancelText={'Batal'}
        confirmText={'Simpan'}
        title={'Pilih Tanggal'}
        fadeToColor="blue"
        open={openDate}
        date={dateNow}
        onConfirm={date => {
          setOpenDate(false);
          setFormKeberangkatan({
            ...formKeberangkatan,
            date: {
              value: date,
            },
          });
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
      />
      {/* pilih jam */}
      <DatePicker
        modal
        fadeToColor="blue"
        open={openTime}
        confirmText={'Simpan'}
        cancelText={'Batal'}
        title={'Pilih Waktu'}
        date={timeNow}
        mode={'time'}
        onConfirm={time => {
          setOpenTime(false);

          setFormKeberangkatan({
            ...formKeberangkatan,
            time: {
              value: moment(time).format('HH:mm'),
            },
          });
        }}
        onCancel={() => {
          setOpenTime(false);
        }}
      />
      {isAlert && (
        <>
          <DialogContainer {...basicAlertProps} />
        </>
      )}
    </View>
  );
};
