import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
import {IconBackBerita, IconNextBerita, Kapolri} from '../../../assets/Assets';
import Constanta from '../../../lib/Constanta';
import {
  GetBangsat,
  GetCategoryBerita,
  GetBeritaStakeholder,
} from '../../../repositories/berita';
import {GetBerita} from '../../../repositories/home';

export default ({...props}) => {
  const [berita, setBerita] = useState([]);
  // const [idBerita, setIdBerita] = useState([]);
  // const [indexBerita, setIndexBerita] = useState(0);
  // console.log('plisss', indexBerita);
  // console.log('plisss ini berita', berita);
  const listBerita = useRef();

  const navigation = useNavigation();

  const DATA = [
    {
      id: '1',
      title:
        '[Seputar Lantas] Bagaimana saya bisa melaporkan Kecelakaan yang baru saja terjadi ?',
      onPress: () => {
        props.navigation.navigate('PusatBantuan');
      },
    },
  ];

  useEffect(() => {
    GetBerita()
      .then(succ => {
        let list = [];
        for (const iterator of succ.data.datanya) {
          list.push(...iterator.data);
        }
        // console.log('berita nihhhh woyyy', succ.data.datanya);
        setBerita(list);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {});
  }, []);

  const [beritaStakeHolder, setBeritaStakeHolder] = useState([]);
  useEffect(() => {
    GetBeritaStakeholder()
      .then(item => {
        console.log('ini berita stakeholder', item);
        setBeritaStakeHolder(item);
      })
      .catch(err => {
        // console.log({err});
      })
      .finally(() => {});
  }, []);

  if (berita.length) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          backgroundColor: '#F4F4F4',
          marginBottom: responsiveHeight(1.3),
        }}>
        <FlatList
          pagingEnabled={true}
          data={berita}
          ref={listBerita}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: widthPercentageToDP('5%'),
          }}
          style={{
            width: widthPercentageToDP('91%'),
            marginHorizontal: responsiveWidth(2),
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderRadius: 6,
              }}
            />
          )}
          horizontal={true}
          // scrollEnabled={false}
          pinchGestureEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.id}
              style={{
                width: widthPercentageToDP('37%'),
                marginHorizontal: responsiveWidth(2),
                // height: responsiveHeight(15.5),
                // flexDirection: 'row',
                backgroundColor: 'white',
                paddingVertical: responsiveHeight(0.7),
                borderRadius: 10,
                elevation: 5,
              }}
              onPress={() => {
                navigation.navigate('beritakorlantas', item);
              }}>
              <View
                style={{
                  marginHorizontal: 5,
                }}>
                {item.picture != null && item.picture != '' ? (
                  <Image
                    source={{
                      uri:
                        'http://108.136.137.131:3001/uploads/news/' +
                        item.picture,
                    }}
                    style={{
                      borderRadius: 9,
                      width: responsiveWidth(34),
                      height: responsiveWidth(27),
                    }}
                    resizeMode={'cover'}
                  />
                ) : (
                  <Image
                    source={Kapolri}
                    style={{
                      borderRadius: 9,
                      width: responsiveWidth(27),
                      height: responsiveHeight(14),
                    }}
                    resizeMode={'cover'}
                  />
                )}
              </View>
              <View
                style={{
                  marginHorizontal: responsiveWidth(2),
                  width: responsiveWidth(52),
                  marginVertical: responsiveHeight(1),
                }}>
                <Text
                  style={{
                    color: 'black',
                    ...Constanta({
                      font: 'semibold',
                    }),
                    fontSize: responsiveFontSize(1.4),
                    width: responsiveWidth(32),
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    color: 'black',
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  {moment(item.date).format('LL')}
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    marginTop: responsiveHeight(1),
                    marginRight: responsiveWidth(4),
                    color: 'black',
                    textAlign: 'justify',
                    lineHeight: responsiveHeight(1.8),
                    ...Constanta({
                      font: 'regular',
                    }),
                    width: responsiveWidth(32),
                  }}
                  numberOfLines={4}
                  ellipsizeMode="tail">
                  {item.content}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: responsiveHeight(1),
                }}>
                <Text
                  style={{
                    ...Constanta({
                      font: 'bold',
                    }),
                    color: '#0D67F0',
                    textAlign: 'center',
                  }}>
                  Selengkapnya
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: responsiveWidth(90),
          height: responsiveHeight(15.5),
          flexDirection: 'row',
          backgroundColor: '#F6F6F64D',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: heightPercentageToDP('0.6'),
          borderRadius: 10,
          marginLeft: widthPercentageToDP('5%'),
        }}>
        <Text
          style={{
            color: 'black',
            ...Constanta({
              font: 'regular',
            }),
          }}>
          Belum Ada Berita Terkini
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4E4E4E',
    paddingBottom: 9,
  },
});
