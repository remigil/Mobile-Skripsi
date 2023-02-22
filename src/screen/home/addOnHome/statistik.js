import React, {useEffect, useState} from 'react';
import {forwardRef} from 'react';
import {Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {IconNaik, IconStabil, IconTurun} from '../../../assets/Assets';
import Constanta from '../../../lib/Constanta';
import {
  GetKecelakaan,
  GetPelanggaran,
  GetRanmor,
  GetSim,
} from '../../../repositories/home';

export default ({...props}) => {
  const [kecelakaan, setKecelakaan] = useState({});
  const [pelanggaran, setPelanggaran] = useState({});
  const [sim, setSim] = useState({});
  const [ranmor, setRanmor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState('');
  const initState = {
    filterStatistik: [
      {
        id: 1,
        title: 'Kecelakaan',
        indicator: 'kecelakaan',
      },
      {
        id: 2,
        title: 'Pelanggaran',
        indicator: 'pelanggaran',
      },
      {
        id: 4,
        title: 'Turjawali',
        indicator: 'sim',
      },
      {
        id: 3,
        title: 'Kendaraan',
        indicator: 'kendaraan',
      },
    ],
    filterStatistikIndicator: {
      kecelakaan: false,
      pelanggaran: false,
      kendaraan: false,
      sim: false,
    },
  };
  const [indikatorStatistik, setIndikatorStatistik] = useState(
    initState.filterStatistikIndicator,
  );

  const Insiden = [
    {
      id: '1',
      angka: (
        <>
          {isLoading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <>
              {indikatorStatistik.kecelakaan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {kecelakaan?.laka_perhari}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.pelanggaran ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {pelanggaran.pelanggaran_perhari}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.sim ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {sim.sim_perhari}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.kendaraan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {ranmor.ranmor_perhari}
                </Text>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ),
      waktu: (
        <>
          {indikatorStatistik.kecelakaan || indikatorStatistik.pelanggaran ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Insiden/per
              {
                <Text
                  style={{
                    color: '#FF9292',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  hari
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}

          {indikatorStatistik.kendaraan ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Unit/per
              {
                <Text
                  style={{
                    color: '#FF9292',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  hari
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
          {indikatorStatistik.sim ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              SIM/per
              {
                <Text
                  style={{
                    color: '#FF9292',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  hari
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
        </>
      ),
      icon: <IconNaik />,
    },
    {
      id: '2',
      angka: (
        <>
          {isLoading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <>
              {indikatorStatistik.kecelakaan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {kecelakaan?.laka_perminggu}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.pelanggaran ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {pelanggaran.pelanggaran_perminggu}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.sim ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {sim.sim_perminggu}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.kendaraan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {ranmor.ranmor_perminggu}
                </Text>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ),
      waktu: (
        <>
          {indikatorStatistik.kecelakaan || indikatorStatistik.pelanggaran ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Insiden/per
              {
                <Text
                  style={{
                    color: '#77ADFF',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  minggu
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}

          {indikatorStatistik.kendaraan ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Unit/per
              {
                <Text
                  style={{
                    color: '#77ADFF',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  minggu
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
          {indikatorStatistik.sim ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              SIM/per
              {
                <Text
                  style={{
                    color: '#77ADFF',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  minggu
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
        </>
      ),
      icon: <IconTurun />,
    },
    {
      id: '3',
      angka: (
        <>
          {isLoading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <>
              {indikatorStatistik.kecelakaan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {kecelakaan?.laka_perbulan}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.pelanggaran ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {pelanggaran.pelanggaran_perbulan}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.sim ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {sim.sim_perbulan}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.kendaraan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {ranmor.ranmor_perbulan}
                </Text>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ),
      waktu: (
        <>
          {indikatorStatistik.kecelakaan || indikatorStatistik.pelanggaran ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Insiden/per
              {
                <Text
                  style={{
                    color: '#FFFFFF',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  bulan
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}

          {indikatorStatistik.kendaraan ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Unit/per
              {
                <Text
                  style={{
                    color: '#FFFFFF',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  bulan
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
          {indikatorStatistik.sim ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              SIM/per
              {
                <Text
                  style={{
                    color: '#FFFFFF',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  bulan
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
        </>
      ),
      icon: <IconStabil />,
    },
    {
      id: '4',
      angka: (
        <>
          {isLoading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color="white" />
            </View>
          ) : (
            <>
              {indikatorStatistik.kecelakaan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {kecelakaan?.laka_pertahun}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.pelanggaran ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {pelanggaran.pelanggaran_pertahun}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.sim ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {sim.sim_pertahun}
                </Text>
              ) : (
                <></>
              )}
              {indikatorStatistik.kendaraan ? (
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: responsiveFontSize(5.5),
                    ...Constanta({
                      font: 'semibold',
                    }),
                  }}>
                  {ranmor.ranmor_pertahun}
                </Text>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ),
      waktu: (
        <>
          {indikatorStatistik.kecelakaan || indikatorStatistik.pelanggaran ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Insiden/per
              {
                <Text
                  style={{
                    color: '#FF9292',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  tahun
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}

          {indikatorStatistik.kendaraan ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              Unit/per
              {
                <Text
                  style={{
                    color: '#FF9292',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  tahun
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
          {indikatorStatistik.sim ? (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: widthPercentageToDP('4%'),
                ...Constanta({
                  font: 'regular',
                }),
              }}>
              SIM/per
              {
                <Text
                  style={{
                    color: '#FF9292',
                    ...Constanta({
                      font: 'bold',
                    }),
                  }}>
                  tahun
                </Text>
              }
            </Text>
          ) : (
            <></>
          )}
        </>
      ),
      icon: <IconNaik />,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    indikatorStatistik.kecelakaan = true;
    GetKecelakaan()
      .then(succ => {
        setKecelakaan(succ.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GetPelanggaran()
      .then(succ => {
        setPelanggaran(succ.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GetSim()
      .then(succ => {
        setSim(succ.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GetRanmor()
      .then(succ => {
        setRanmor(succ.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '400',
              marginLeft: responsiveWidth(4),
              fontSize: responsiveFontSize(2.1),
              ...Constanta({
                font: 'regular',
              }),
            }}>
            Statistik Nasional
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 10,
              marginHorizontal: 2,
            }}>
            {initState.filterStatistik.map((statistik, index) => (
              <TouchableOpacity
                key={statistik.id}
                onPress={() => {
                  setIndikatorStatistik({
                    ...initState.filterStatistikIndicator,
                    [statistik.indicator]:
                      !indikatorStatistik[statistik.indicator],
                  });
                }}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: indikatorStatistik[statistik.indicator]
                      ? 'white'
                      : 'white',
                    paddingHorizontal: responsiveWidth(3),
                    paddingVertical: responsiveHeight(0.5),
                    borderRadius: 10,
                  },
                  indikatorStatistik[statistik.indicator]
                    ? {
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }
                    : {},
                ]}>
                <Text
                  style={[
                    {
                      color: indikatorStatistik[statistik.indicator]
                        ? '#CE2121'
                        : 'white',
                      ...Constanta({
                        font: 'regular',
                      }),
                      fontSize: responsiveFontSize(1.5),
                    },
                  ]}>
                  {statistik.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              marginHorizontal: responsiveWidth(4),
              paddingTop: 6,
            }}>
            {Insiden.map((item, index) => (
              <View
                key={index}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#E8E8E833',
                  justifyContent: 'center',
                  width: responsiveWidth(43),
                  height: responsiveHeight(11),
                  // paddingBottom: responsiveHeight(1.5),
                  paddingVertical: responsiveHeight(2),
                  borderRadius: 6,
                  marginVertical: responsiveHeight(1.5),
                  position: 'relative',
                }}>
                <View>{item.angka}</View>
                <View>{item.waktu}</View>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
