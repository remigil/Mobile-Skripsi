import React, {useState} from 'react';
import {forwardRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  IconNaik,
  IconStabil,
  IconTurun,
} from '../../../assets/Assets';

export default forwardRef(({judul, ...props}, ref) => {
  const [berita, setBerita] = useState([]);
  const [filterFieldReq, setFilterFieldReq] = useState('');
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
        id: 3,
        title: 'Kendaraan',
        indicator: 'kendaraan',
      },
      {
        id: 4,
        title: 'Sim',
        indicator: 'sim',
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
      angka: '20',
      waktu: (
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: widthPercentageToDP('4%'),
          }}>
          Insiden/per
          {<Text style={{color: '#FF9292', fontWeight: 'bold'}}>hari</Text>}
        </Text>
      ),
      icon: <IconNaik />,
    },
    {
      id: '2',
      angka: '20',
      waktu: (
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: widthPercentageToDP('4%'),
          }}>
          Insiden/per
          {<Text style={{color: '#77ADFF', fontWeight: 'bold'}}>minggu</Text>}
        </Text>
      ),
      icon: <IconTurun />,
    },
    {
      id: '3',
      angka: '20',
      waktu: (
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: widthPercentageToDP('4%'),
          }}>
          Insiden/per
          {<Text style={{color: 'white', fontWeight: 'bold'}}>bulan</Text>}
        </Text>
      ),
      icon: <IconStabil />,
    },
    {
      id: '4',
      angka: '20',
      waktu: (
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: widthPercentageToDP('4%'),
          }}>
          Insiden/per
          {<Text style={{color: '#FF9292', fontWeight: 'bold'}}>tahun</Text>}
        </Text>
      ),
      icon: <IconNaik />,
    },
  ];

  // console.log({processFilterMaps});

  return (
    <ScrollView nestedScrollEnabled style={{}}>
      <View
        style={{
          flex: 1,
          // height: heightPercentageToDP('100%'),
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '400',
            marginLeft: widthPercentageToDP('4%'),
            fontSize: widthPercentageToDP('4.5%'),
          }}>
          {judul}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 10,
            marginHorizontal: 2,
          }}>
          {initState.filterStatistik.map((statistik, index) => (
            // <View
            //   key={statistik.id}
            //   style={{
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //   }}>

            // </View>
            <TouchableOpacity
              key={statistik.id}
              onPress={() => {
                // console.log(indikatorStatistik);
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
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  // marginHorizontal: 2,
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
            marginHorizontal: 10,
            paddingTop: 6,
            // flexGrow: 2,
          }}>
          {Insiden.map((item, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                backgroundColor: '#E8E8E833',
                justifyContent: 'center',
                alignItems: 'center',
                width: 152,
                paddingBottom: 10,
                // paddingVertical: 5,
                borderRadius: 10,
                marginVertical: 18,
                position: 'relative',
              }}>
              <View style={{top: -16, left: -12, position: 'absolute'}}>
                {item.icon}
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: widthPercentageToDP('13%'),
                }}>
                {item.angka}
              </Text>
              <View>{item.waktu}</View>
            </View>
          ))}
        </View>
        {/* <View
            style={{
              marginLeft: 25,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: widthPercentageToDP('4.5%'),
                color: 'white',
              }}>
              Berita Terkini
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: widthPercentageToDP('3.2%'),
                  marginRight: widthPercentageToDP('6%'),
                  paddingTop: heightPercentageToDP('.5%'),
                  color: '#FFFFFFCC',
                }}>
                Lihat semua
              </Text>
            </TouchableOpacity>
          </View> */}
        <SafeAreaView>
          {/* <View
              style={{
                backgroundColor: '#E8E8E833',
                marginHorizontal: 20,
                borderRadius: 10,
                marginVertical: 5,
                flexDirection: 'row',
                // flexWrap: 'wrap',
              }}>
              <View style={{}}>
                <Image
                  source={Kapolri}
                  style={{borderRadius: 6}}
                  resizeMode={'cover'}
                />
              </View>
              <View
                style={{
                  marginLeft: 7,
                  paddingVertical: 12,
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  Pelantikan KAKORLANTAS Baru{title}
                </Text>
                <Text style={{fontSize: 9, color: '#FFFFFF99'}}>
                  10 November 2021 {tanggal}
                </Text>
                <Text style={{fontSize: 9, marginTop: 16, color: 'white'}}>
                  Kapolri Jenderal Listyo Sigit Prabowo memimpin {`\n`}
                  pelantikan dan serah terima jabatan Kepala Korps{`\n`}Lalu
                  Lintas (Kakorlantas)Polri dari Irjen Pol Istiono kepada...
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: -2,
                }}>
                <IconNextBerita />
              </View>
            </View> */}
          {/* <View
            style={{
              backgroundColor: '#E8E8E833',
              marginHorizontal: 20,
              borderRadius: 10,
              marginVertical: 10,
              flexDirection: 'row',
              // flexWrap: 'wrap',
            }}>
            <View style={{}}>
              <Image
                source={Kapolri}
                style={{borderRadius: 6}}
                resizeMode={'cover'}
              />
            </View>
            <View
              style={{
                marginLeft: 7,
                paddingVertical: 12,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                Pelantikan KAKORLANTAS Baru
              </Text>
              <Text style={{fontSize: 9, color: '#FFFFFF99  '}}>
                10 November 2021
              </Text>
              <Text style={{fontSize: 9, marginTop: 16, color: 'white'}}>
                Kapolri Jenderal Listyo Sigit Prabowo memimpin {`\n`}pelantikan
                dan serah terima jabatan Kepala Korps{`\n`}Lalu Lintas
                (Kakorlantas)Polri dari Irjen Pol Istiono kepada...
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginLeft: -2,
              }}>
              <IconNextBerita />
            </View>
          </View> */}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
});
