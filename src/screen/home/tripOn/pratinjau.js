import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  IconCalendar,
  IconExpand,
  IconExpandClose,
  IconJam,
  IconKembali,
  IconLocation,
  TambahKendaraan,
} from '../../../assets/Assets';
import {BaseContainer, InputTextComp} from '../../../component';
import KeyboardAvoiding from '../../../component/form/KeyboardAvoiding';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import {AddTripON, GetKendaraanId} from '../../../repositories/tripon';
import DialogContainer, {
  BasicAlertProps,
} from '../../../component/container/dialogContainer';
import Constanta from '../../../lib/Constanta';
import {responsiveHeight} from 'react-native-responsive-dimensions';
export default props => {
  const {params: paramsData} = props.route;
  console.log(paramsData, 'ini param dari tripon');
  // console.log('ini', paramsData);

  const initState = {
    formProfilKendaraan: {
      nopol: {
        value: paramsData?.nopol === undefined ? '' : paramsData?.nopol,
        is_require: false,
        placeholder: 'Pilih Warga Negara',
      },
      tipeKendaraan: {
        // value: '',
        value:
          paramsData?.tipeKendaraan === undefined
            ? ''
            : paramsData?.tipeKendaraan,
        is_require: false,
        placeholder: 'Masukan Nama',
        children: [],
      },
      merk: {
        // value: '',
        value: paramsData?.merk === undefined ? '' : paramsData?.merk,
        is_require: false,
        placeholder: 'Masukkan Nik',
        children: [],
      },
    },
    tipeKendaraan: [
      {
        title: 'Mobil',
        value: 1,
        valueToDatabase: 1,
        children: [
          {
            title: 'Honda',
            value: 1,
            valueToDatabase: 1,
          },
          {
            title: 'Toyota',
            value: 2,
            valueToDatabase: 2,
          },
          {
            title: 'Daihatsu',
            value: 3,
            valueToDatabase: 3,
          },
          {
            title: 'Suzuki',
            value: 4,
            valueToDatabase: 4,
          },
          {
            title: 'Nissan',
            value: 5,
            valueToDatabase: 5,
          },
          {
            title: 'Yamaha',
            value: 6,
            valueToDatabase: 6,
          },
        ],
      },
      {
        title: 'Sepeda motor',
        value: 2,
        valueToDatabase: 2,
        children: [
          {
            title: 'Honda',
            value: 1,
            valueToDatabase: 1,
          },

          {
            title: 'Yamaha',
            value: 6,
            valueToDatabase: 6,
          },
        ],
      },
    ],
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };
  const [stateExpanded, setStateExpended] = useState({
    keterangan_keberangkatan: false,
    penumpang: false,
    // penumpang2: false,
  });
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initState.basicAlertProps,
  });
  const [isLoading, setIsLoading] = useState(false);
  const closeBasicAlert = () => {
    setIsLoading(false);
    setBasicAlertProps({
      ...basicAlertProps,
      basicAlertVisible: false,
      basicAlertTitle: null,
      basicAlertMessage: null,
      iconClose: false,
    });
  };
  const submitTripOn = () => {
    setIsLoading(true);
    AddTripON(paramsData)
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
              'Silahkan Coba Kembali setelah trip on sebelumnya',
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
              props.navigation.navigate('tripon.card', {
                koorA: paramsData.start_coordinate,
                koorB: paramsData.end_coordinate,
                ...ok.data,
              });
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
  useEffect(() => {
    setIsLoading(true);
    GetKendaraanId(paramsData.vehicle_id)
      .then(vhIdData => {
        setVehicleById(vhIdData.data.data);
      })
      .catch(err => {
        console.log({iniError: err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const [vehicleById, setVehicleById] = useState({});
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Trip On',
        titleStyle: {
          color: 'white',
          ...Constanta({
            font: 'bold',
          }),
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => props.navigation.openDrawer(),
      }}>
      <View
        style={{
          flex: 1,
          // marginBottom: heightPercentageToDP('10%'),
        }}>
        <KeyboardAvoiding>
          <View
            style={{
              alignItems: 'center',
              paddingBottom: responsiveHeight(8),
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                ...Constanta({
                  font: 'semibold',
                }),
                fontSize: widthPercentageToDP('6%'),
                marginVertical: heightPercentageToDP('2%'),
              }}>
              Pratinjau Data
            </Text>

            {/* Tipe Kendaraan */}
            <View
              style={{
                marginTop: -heightPercentageToDP('1%'),
              }}>
              <View
                style={{
                  marginVertical: widthPercentageToDP('2%'),
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#BFC4F0',
                    width: widthPercentageToDP('90%'),
                    height: heightPercentageToDP('3%'),
                    borderRadius: 4,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#E3E5FD',
                  }}
                  onPress={() => {
                    setStateExpended({
                      ...stateExpanded,
                      keterangan_keberangkatan:
                        !stateExpanded.keterangan_keberangkatan,
                    });
                  }}>
                  <View
                    style={{
                      backgroundColor: '#BFC4F0',
                      width: widthPercentageToDP('6%'),
                      height: heightPercentageToDP('3.5%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                      left: -8,
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        ...Constanta({
                          font: 'semibold',
                        }),
                      }}>
                      1
                    </Text>
                  </View>
                  <View
                    style={{
                      width: widthPercentageToDP('70%'),
                    }}>
                    <Text
                      style={{
                        color: '#01796F',
                        ...Constanta({
                          font: 'semibold',
                        }),
                      }}>
                      Keterangan Keberangkatan
                    </Text>
                  </View>
                  <View>
                    {/* <IconExpand /> */}
                    {stateExpanded.keterangan_keberangkatan ? (
                      <IconExpandClose />
                    ) : (
                      <IconExpand />
                    )}
                    {/* // <IconExpandClose /> */}
                  </View>
                </TouchableOpacity>
                <Collapsible
                  collapsed={stateExpanded.keterangan_keberangkatan}
                  align="center">
                  <View
                    style={{
                      borderLeftWidth: 2,
                      borderColor: '#E2E2E2',
                      marginVertical: 12,
                      width: widthPercentageToDP('80%'),
                      marginHorizontal: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        marginLeft: widthPercentageToDP('4.8%'),
                      }}>
                      <Text
                        style={{
                          fontSize: widthPercentageToDP('4.5%'),
                          color: '#01796F',
                          ...Constanta({
                            font: 'semibold',
                          }),
                          marginBottom: widthPercentageToDP('1.5%'),
                        }}>
                        Tipe Kendaraan
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#CDD1E0',
                        paddingLeft: widthPercentageToDP('3.5%'),
                        borderRadius: widthPercentageToDP('1%'),
                        width: widthPercentageToDP('80%'),
                        marginLeft: widthPercentageToDP('10%'),
                        paddingVertical: heightPercentageToDP('1.5%'),
                      }}>
                      <Text
                        style={{
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        {vehicleById[0]?.type_vehicle.type_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        marginLeft: widthPercentageToDP('4.8%'),
                      }}>
                      <Text
                        style={{
                          fontSize: widthPercentageToDP('4.5%'),
                          color: '#01796F',
                          ...Constanta({
                            font: 'semibold',
                          }),
                          marginBottom: widthPercentageToDP('1.5%'),
                        }}>
                        Model Kendaraan
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#CDD1E0',
                        paddingLeft: widthPercentageToDP('3.5%'),
                        borderRadius: widthPercentageToDP('1%'),
                        width: widthPercentageToDP('80%'),
                        marginLeft: widthPercentageToDP('10%'),
                        paddingVertical: heightPercentageToDP('1.5%'),
                      }}>
                      <Text
                        style={{
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        {vehicleById[0]?.brand_vehicle.brand_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        marginLeft: widthPercentageToDP('4.8%'),
                      }}>
                      <Text
                        style={{
                          fontSize: widthPercentageToDP('4.5%'),
                          color: '#01796F',
                          ...Constanta({
                            font: 'semibold',
                          }),
                          marginBottom: widthPercentageToDP('1.5%'),
                        }}>
                        Nomor Registrasi
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#CDD1E0',
                        paddingLeft: widthPercentageToDP('3.5%'),
                        borderRadius: widthPercentageToDP('1%'),
                        width: widthPercentageToDP('80%'),
                        marginLeft: widthPercentageToDP('10%'),
                        paddingVertical: heightPercentageToDP('1.5%'),
                      }}>
                      <Text
                        style={{
                          ...Constanta({
                            font: 'regular',
                          }),
                        }}>
                        {vehicleById[0]?.no_vehicle}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: widthPercentageToDP('10%'),
                      }}>
                      <View
                        style={{
                          // width: widthPercentageToDP('90%'),
                          marginVertical: heightPercentageToDP('1%'),
                        }}>
                        <Text
                          style={{
                            color: '#01796F',
                            ...Constanta({
                              font: 'semibold',
                            }),
                            fontSize: widthPercentageToDP('4%'),
                          }}>
                          Titik Lokasi Keberangkatan{' '}
                          {/* {JSON.stringify(paramsData)} */}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#CDD1E0',
                          width: widthPercentageToDP('80%'),
                          height: heightPercentageToDP('6%'),
                          justifyContent: 'center',
                          borderRadius: 4,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: widthPercentageToDP('70%'),
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                ...Constanta({
                                  font: 'regular',
                                }),
                              }}>
                              {paramsData.awal}
                              {/* {paramsData.start_coordinate.latitude +
                                ',' +
                                paramsData.start_coordinate.longitude} */}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconLocation />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: widthPercentageToDP('10%'),
                      }}>
                      <View
                        style={{
                          // width: widthPercentageToDP('90%'),
                          marginVertical: heightPercentageToDP('1%'),
                        }}>
                        <Text
                          style={{
                            color: '#01796F',
                            ...Constanta({
                              font: 'semibold',
                            }),
                            fontSize: widthPercentageToDP('4%'),
                          }}>
                          Titik Lokasi Tujuan
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#CDD1E0',
                          width: widthPercentageToDP('80%'),
                          height: heightPercentageToDP('6%'),
                          justifyContent: 'center',
                          borderRadius: 4,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: widthPercentageToDP('70%'),
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                ...Constanta({
                                  font: 'regular',
                                }),
                              }}>
                              {paramsData.tujuans}
                              {/* {paramsData.end_coordinate.latitude +
                                ',' +
                                paramsData.end_coordinate.longitude} */}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconLocation />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: widthPercentageToDP('10%'),
                      }}>
                      <View
                        style={{
                          width: widthPercentageToDP('80%'),
                          marginVertical: heightPercentageToDP('1%'),
                        }}>
                        <Text
                          style={{
                            color: '#01796F',
                            ...Constanta({
                              font: 'semibold',
                            }),
                            fontSize: widthPercentageToDP('4%'),
                          }}>
                          Tanggal Keberangkatan
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#CDD1E0',
                          width: widthPercentageToDP('80%'),
                          height: heightPercentageToDP('6%'),
                          justifyContent: 'center',
                          borderRadius: 4,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: widthPercentageToDP('70%'),
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                ...Constanta({
                                  font: 'regular',
                                }),
                              }}>
                              {paramsData.departure_date}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#01796F',
                                ...Constanta({
                                  font: 'bold',
                                }),
                                position: 'absolute',
                              }}>
                              {moment().format('D')}
                            </Text>
                            <IconCalendar width={25} height={25} />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: widthPercentageToDP('10%'),
                      }}>
                      <View
                        style={{
                          width: widthPercentageToDP('80%'),
                          marginVertical: heightPercentageToDP('1%'),
                        }}>
                        <Text
                          style={{
                            color: '#01796F',
                            ...Constanta({
                              font: 'semibold',
                            }),
                            fontSize: widthPercentageToDP('4%'),
                          }}>
                          Waktu Keberangkatan
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#CDD1E0',
                          width: widthPercentageToDP('80%'),
                          height: heightPercentageToDP('6%'),
                          justifyContent: 'center',
                          borderRadius: 4,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: widthPercentageToDP('70%'),
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                ...Constanta({
                                  font: 'regular',
                                }),
                              }}>
                              {paramsData.departure_time}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconJam width={25} height={25} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Collapsible>
              </View>
              {/* Bagian Penumpang */}
              {paramsData.penumpangs.map((dataPenum, ind) => (
                <View key={'data-penumpang' + ind + new Date()}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: '#BFC4F0',
                      width: widthPercentageToDP('90%'),
                      height: heightPercentageToDP('3%'),
                      borderRadius: 4,
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      backgroundColor: '#E3E5FD',
                    }}
                    onPress={() => {
                      setStateExpended({
                        ...stateExpanded,
                        penumpang: !stateExpanded.penumpang,
                      });
                    }}>
                    <View
                      style={{
                        backgroundColor: '#BFC4F0',
                        width: widthPercentageToDP('6%'),
                        height: heightPercentageToDP('3.5%'),
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: -8,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          color: '#01796F',
                          ...Constanta({
                            font: 'semibold',
                          }),
                        }}>
                        {ind + 2}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: widthPercentageToDP('70%'),
                      }}>
                      <Text
                        style={{
                          color: '#01796F',
                          ...Constanta({
                            font: 'semibold',
                          }),
                        }}>
                        Penumpang {ind + 1}
                      </Text>
                    </View>
                    <View>
                      {/* <IconExpand /> */}
                      {stateExpanded.penumpang ? (
                        <IconExpandClose />
                      ) : (
                        <IconExpand />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Collapsible
                    collapsed={stateExpanded.penumpang}
                    align="center">
                    <View
                      style={{
                        borderLeftWidth: 2,
                        borderColor: '#E2E2E2',
                        // marginLeft: 10,
                        marginVertical: 10,
                        width: widthPercentageToDP('80%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          marginLeft: widthPercentageToDP('4.8%'),
                        }}>
                        <Text
                          style={{
                            fontSize: widthPercentageToDP('4.5%'),
                            color: '#01796F',
                            ...Constanta({
                              font: 'semibold',
                            }),
                            marginBottom: widthPercentageToDP('1.5%'),
                          }}>
                          Nama Lengkap
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#CDD1E0',
                          paddingLeft: widthPercentageToDP('3.5%'),
                          borderRadius: widthPercentageToDP('1%'),
                          width: widthPercentageToDP('80%'),
                          marginLeft: widthPercentageToDP('10%'),
                          paddingVertical: heightPercentageToDP('1.5%'),
                        }}>
                        <Text
                          style={{
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          {dataPenum.name}
                        </Text>
                      </View>
                      {/* <View
                        style={{
                          alignSelf: 'flex-start',
                          marginLeft: widthPercentageToDP('4.8%'),
                        }}>
                        <Text
                          style={{
                            fontSize: widthPercentageToDP('4.5%'),
                            color: '#01796F',
                            ...Constanta({
                              font: 'semibold',
                            }),
                            marginBottom: widthPercentageToDP('1.5%'),
                          }}>
                          Kebangsaan
                        </Text>
                      </View> */}
                      {/* <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#CDD1E0',
                          paddingLeft: widthPercentageToDP('3.5%'),
                          borderRadius: widthPercentageToDP('1%'),
                          width: widthPercentageToDP('80%'),
                          marginLeft: widthPercentageToDP('10%'),
                          paddingVertical: heightPercentageToDP('1.5%'),
                        }}>
                        <Text
                          style={{
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          Indonesia
                        </Text>
                      </View> */}
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          marginLeft: widthPercentageToDP('4.8%'),
                        }}>
                        <Text
                          style={{
                            fontSize: widthPercentageToDP('4.5%'),
                            color: '#01796F',
                            ...Constanta({
                              font: 'semibold',
                            }),
                            marginBottom: widthPercentageToDP('1.5%'),
                          }}>
                          Nomor Induk Kewarganegaraan
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#CDD1E0',
                          paddingLeft: widthPercentageToDP('3.5%'),
                          borderRadius: widthPercentageToDP('1%'),
                          width: widthPercentageToDP('80%'),
                          marginLeft: widthPercentageToDP('10%'),
                          paddingVertical: heightPercentageToDP('1.5%'),
                        }}>
                        <Text
                          style={{
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          {dataPenum.nik}
                        </Text>
                      </View>
                    </View>
                  </Collapsible>
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: widthPercentageToDP('100%'),
                justifyContent: 'space-evenly',
                padding: 20,
                // marginBottom: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}
                style={{
                  borderColor: '#01796F',
                  borderWidth: 1,
                  width: widthPercentageToDP('40%'),
                  height: heightPercentageToDP('5%'),
                  borderRadius: 5,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconKembali />
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
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  submitTripOn();
                  // props.navigation.navigate('tripon.peta', {
                  //   koorA: paramsData.start_coordinate,
                  //   koorB: paramsData.end_coordinate,
                  // });
                  // console.log('nyoh', paramsData);
                }}
                style={{
                  width: widthPercentageToDP('40%'),
                  height: heightPercentageToDP('5%'),
                  borderRadius: 5,
                }}>
                <LinearGradient
                  start={{x: 1.0, y: 1.0}}
                  end={{x: 0.0, y: 0.4}}
                  locations={[0, 0.7]}
                  colors={['#1F5EBB', '#01796F']}
                  style={{
                    flex: 1,
                    borderRadius: 5,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TambahKendaraan />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      marginLeft: 10,
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Simpan Data
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoiding>
      </View>

      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: heightPercentageToDP('100%'),
            width: widthPercentageToDP('100%'),
            backgroundColor: '#2727278F',
            opacity: 10,
            justifyContent: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#01796F" />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                marginTop: 9,
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Harap Tunggu Sebentar
            </Text>
          </View>
        </View>
      )}
      <DialogContainer {...basicAlertProps} />
    </BaseContainer>
  );
};
