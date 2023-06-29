import moment from 'moment';
import React, {Component, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
import {
  ChevronNext,
  IconNextBerita,
  Kapolri,
  NotifRed,
  NotifWhite,
} from '../../assets/Assets';

import {BaseContainer} from '../../component';
import Constanta from '../../lib/Constanta';
import {GetBerita} from '../../repositories/home';

export default props => {
  // const [beritaBaru, setBeritaBaru] = useState([]);
  // const [beritaKemarin, setBeritaKemarin] = useState([]);
  const [listBerita, setBerita] = useState([]);
  const [dataParams, setDataParams] = useState({
    limit: 5,
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const isNext = (currentPage, isNext) => {
    if (currentPage != 0 && currentPage <= totalPage) {
      setIsRefresh(true);
      console.log('kesini');
      // setDataParams({...dataParams, page: currentPage});
      console.log({...dataParams, page: currentPage});
      setDataParams({...dataParams, page: currentPage});
    }
  };
  const getDataBerita = (filter = dataParams) => {
    GetBerita(filter)
      .then(data => {
        console.log({data});
        let listData = data.data.datanya;
        setTotalPage(data.data.total_page);
        // setRiwayat(data.data.rows);
        setBerita(prev => {
          // if (prev.length) {
          let arrayList = [...prev];
          console.log(listData.length);
          for (const iterator of listData) {
            let dataList = arrayList.filter(e => e.date === iterator.date);
            let dataListNull = arrayList.filter(e => e.date !== iterator.date);
            if (dataList.length) {
              arrayList = [
                ...dataListNull,
                {
                  date: dataList[0].date,
                  data: [...dataList[0].data],
                },
              ];
              // console.log(dataList, 'ada');
            } else {
              arrayList.push(iterator);
              // arrayList = [...arrayList, iterator];
            }
          }
          console.log(arrayList.length);
          return arrayList;
        });
        // let list = [];
        // for (const iterator of succ.data.datanya) {
        //   list.push(...iterator.data);
        // }
        // console.log('berita nih', list);
        // setBeritaBaru(list);
        // setBeritaKemarin(succ.data.datanya[1].data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefresh(false);
      });
  };
  // useEffect(() => {
  //   getDataBerita();
  // }, []);
  useEffect(() => {
    setIsLoading(true);
    getDataBerita();
  }, []);
  useEffect(() => {
    if (isRefresh) {
      getDataBerita(dataParams);
    }
  }, [isRefresh]);
  return (
    <BaseContainer
      //
      withActionBar={true}
      actionBarProps={{
        title: 'BERITA TERKINI',
        backIconStyle: true,
        titleStyle: {
          color: '#01796F',
          ...Constanta({
            font: 'semibold',
          }),
          color: 'white',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.goBack();
        },
        rightIconStyle: false,
      }}>
      <FlatList
        key={'flatlistIncident'}
        contentContainerStyle={{
          paddingBottom: widthPercentageToDP('15%'),
          alignItems: 'center',
        }}
        // keyExtractor={(item, index) =>
        //   `${item.date.toString() + new Date().getMilliseconds()}`
        // }
        renderItem={({item}) => (
          <View>
            <View
              style={{
                alignItems: 'center',
                marginVertical: widthPercentageToDP('5%'),
              }}>
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: widthPercentageToDP('4%'),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                {/* {item.date} */}
                {moment(item.date).format('dddd, DD MMMM YYYY')}
              </Text>
            </View>

            {item.data && (
              <FlatList
                // key={item.date.toString() + new Date().getMilliseconds()}
                contentContainerStyle={{
                  paddingBottom: widthPercentageToDP('15%'),
                  alignItems: 'center',
                }}
                renderItem={({item: item2}) => (
                  <View key={item2.id}>
                    <Pressable
                      style={{
                        backgroundColor: 'white',
                        marginHorizontal: widthPercentageToDP('5%'),
                        borderRadius: 10,
                        marginVertical: heightPercentageToDP('1%'),
                        paddingVertical: heightPercentageToDP('.6%'),
                        flexDirection: 'row',
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,

                        // flexWrap: 'wrap',
                      }}
                      onPress={() => {
                        props.navigation.navigate('beritakorlantas', item2);
                      }}>
                      <View
                        style={{
                          marginHorizontal: 5,
                        }}>
                        {item2.picture != null && item2.picture != '' ? (
                          <Image
                            source={{
                              uri:
                                'http://108.136.137.131:3001/uploads/news/' +
                                item2.picture,
                            }}
                            style={{
                              borderRadius: 9,
                              width: responsiveWidth(26),
                              height: responsiveWidth(26),
                            }}
                            resizeMode={'cover'}
                          />
                        ) : (
                          <Image
                            source={Kapolri}
                            style={{borderRadius: 9}}
                            resizeMode={'cover'}
                          />
                        )}

                        {/* <Image
                          source={Kapolri}
                          style={{borderRadius: 9}}
                          resizeMode={'cover'}
                        /> */}
                      </View>
                      <View
                        style={{
                          // paddingVertical:12
                          // paddingVertical: 12,
                          // overflow: 'scroll',
                          marginHorizontal: 3,
                          width: widthPercentageToDP('58%'),
                          // flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            ...Constanta({
                              font: 'bold',
                            }),
                            fontSize: responsiveFontSize(1.8),
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {item2.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.2),
                            color: 'black',
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          {item2.date}
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.3),
                            marginTop: responsiveHeight(1.3),
                            marginRight: responsiveWidth(4),
                            color: 'black',
                            textAlign: 'justify',
                            lineHeight: responsiveHeight(1.8),
                          }}
                          numberOfLines={4}
                          ellipsizeMode="tail">
                          {item2.content}
                        </Text>
                      </View>
                    </Pressable>
                    <View
                      style={{
                        position: 'absolute',
                        right: responsiveWidth(1.5),
                        top: 0,
                        bottom: 0,
                        justifyContent: 'center',
                      }}>
                      <IconNextBerita />
                    </View>
                  </View>
                )}
                data={item.data}
                onEndReached={e => {
                  // console.log({
                  //   nahi: e,
                  //   itemDate: item.date,
                  //   check: listBerita[listBerita.length - 1].date,
                  // });
                  if (
                    totalPage > dataParams.page &&
                    item.date === listBerita[listBerita.length - 1].date
                  ) {
                    setDataParams({
                      ...dataParams,
                      page: dataParams.page + 1,
                    });
                    isNext(dataParams.page + 1, true);
                  }
                }}
                onEndReachedThreshold={0.001}
                ListFooterComponent={() =>
                  isRefresh && (
                    <View
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                      }}>
                      <ActivityIndicator size="large" />
                    </View>
                  )
                }
                initialNumToRender={10}
              />
            )}
          </View>
        )}
        data={listBerita}
      />
    </BaseContainer>
  );
};
