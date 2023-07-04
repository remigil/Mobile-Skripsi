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
        title: 'Ngawas',
        indicator: 'Ngawas',
      },
      {
        id: 2,
        title: 'Akun',
        indicator: 'pelanggaran',
      },
      {
        id: 3,
        title: 'Informasi',
        indicator: 'kendaraan',
      },
      // {
      //   id: 4,
      //   title: 'Sim',
      //   indicator: 'sim',
      // },
    ],
    filterStatistikIndicator: {
      kecelakaan: false,
      pelanggaran: false,
      kendaraan: false,
      // sim: false,
    },
  };
  const [indikatorStatistik, setIndikatorStatistik] = useState(
    initState.filterStatistikIndicator,
  );

  const Insiden = [
    // {
    //   id: '1',
    //   angka: '20',
    //   waktu: (
    //     <Text
    //       style={{
    //         color: '#FFFFFF',
    //         fontSize: widthPercentageToDP('4%'),
    //       }}>
    //       Insiden/per
    //       {<Text style={{color: '#FF9292', fontWeight: 'bold'}}>hari</Text>}
    //     </Text>
    //   ),
    //   icon: <IconNaik />,
    // },
    // {
    //   id: '2',
    //   angka: '20',
    //   waktu: (
    //     <Text
    //       style={{
    //         color: '#FFFFFF',
    //         fontSize: widthPercentageToDP('4%'),
    //       }}>
    //       Insiden/per
    //       {<Text style={{color: '#77ADFF', fontWeight: 'bold'}}>minggu</Text>}
    //     </Text>
    //   ),
    //   icon: <IconTurun />,
    // },
    // {
    //   id: '3',
    //   angka: '20',
    //   waktu: (
    //     <Text
    //       style={{
    //         color: '#FFFFFF',
    //         fontSize: widthPercentageToDP('4%'),
    //       }}>
    //       Insiden/per
    //       {<Text style={{color: 'white', fontWeight: 'bold'}}>bulan</Text>}
    //     </Text>
    //   ),
    //   icon: <IconStabil />,
    // },
    // {
    //   id: '4',
    //   angka: '20',
    //   waktu: (
    //     <Text
    //       style={{
    //         color: '#FFFFFF',
    //         fontSize: widthPercentageToDP('4%'),
    //       }}>
    //       Insiden/per
    //       {<Text style={{color: '#FF9292', fontWeight: 'bold'}}>tahun</Text>}
    //     </Text>
    //   ),
    //   icon: <IconNaik />,
    // },
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
                      ? '#01796F'
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
        <SafeAreaView>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
});
