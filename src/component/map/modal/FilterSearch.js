import React, {createRef, forwardRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import {Divider} from 'react-native-paper';
import {
  CloseModalize,
  Etle,
  Hotel,
  IconRumahMakan,
  RumahSakit,
  Spbu,
} from '../../../assets/Assets';
import {useNavigation} from '@react-navigation/native';
import {Portal} from 'react-native-portalize';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Constanta from '../../../lib/Constanta';

export default forwardRef(({filterMenu, processFilter, ...props}, ref) => {
  const modalizeRef = createRef(Modalize);
  const navigation = useNavigation();
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const [listFilterMenu, setListFilterMenu] = useState(filterMenu);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const lokasitersimpan = [
    {
      id: '1',
      lokasi: 'Jakart ...',
      icon: <Etle />,
    },
    {
      id: '2',
      lokasi: 'Aromap ...',
      icon: <IconRumahMakan />,
    },
    {
      id: '3',
      lokasi: 'SPBU 3 ...',
      icon: <Spbu />,
    },
    {
      id: '4',
      lokasi: 'Jakart ....',
      icon: <RumahSakit />,
    },
    {
      id: '5',
      lokasi: 'Js Luw ...',
      icon: <Hotel />,
    },
    {
      id: '6',
      lokasi: 'Js Luw ...',
      icon: <Hotel />,
    },
    {
      id: '7',
      lokasi: 'Js Luw ...',
      icon: <Hotel />,
    },
    {
      id: '8',
      lokasi: 'Js Luw ...',
      icon: <Hotel />,
    },
  ];
  return (
    <>
      <Portal>
        <Modalize
          ref={combinedRef}
          withHandle={true}
          modalHeight={heightPercentageToDP('70%')}
          handlePosition="inside"
          handleStyle={{
            backgroundColor: '#135AAC',
            marginTop: 5,
          }}
          childrenStyle={{
            // borderTopLeftRadius: 12,
            // borderTopRightRadius: 12,
            overflow: 'hidden',
            marginTop: heightPercentageToDP('1%'),
          }}
          HeaderComponent={
            <View
              style={{
                paddingHorizontal: widthPercentageToDP('2%'),
                paddingTop: widthPercentageToDP('3%'),
                marginTop: 4,
                marginHorizontal: widthPercentageToDP('1%'),
              }}>
              {Platform.OS == 'android' ? (
                <Pressable
                  onPress={() => {
                    combinedRef.current.close();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <CloseModalize width={25} height={25} />
                </Pressable>
              ) : (
                <></>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: heightPercentageToDP('1.5%'),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Tersimpan
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('lokasitersimpan')}>
                  <Text
                    style={{
                      color: '#1E3B84',
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>
              <Divider />
            </View>
          }>
          {/* <TabView 
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={{
              marginHorizontal: widthPercentageToDP('2%'),
              height: heightPercentageToDP('18.3%'),
              overflow: 'hidden',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              // backgroundColor: 'red',
              // marginVertical: 10,
            }}
            renderTabBar={props => (
              <TabBar
                {...props}
                labelStyle={{
                  color: '#01796F',
                }}
                style={{
                  backgroundColor: 'white',
                }}
                indicatorStyle={{
                  backgroundColor: '#01796F',
                  height: 1,
                }}
              />
            )}
            initialLayout={{width: layout.width}}
            // sceneContainerStyle={{top: 0}}
          /> */}
          <View
            style={{
              marginLeft: widthPercentageToDP('3%'),
              paddingBottom: heightPercentageToDP('2%'),
              marginTop: heightPercentageToDP('1%'),
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
                {lokasitersimpan.map((item, index) => (
                  <View
                    key={index}
                    style={{marginHorizontal: widthPercentageToDP('2.1%')}}>
                    <View>{item.icon}</View>
                    <Text style={{textAlign: 'center', lineHeight: 20}}>
                      {item.lokasi}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <LinearGradient
            start={{x: 1.0, y: 1.0}}
            end={{x: 0.0, y: 0.4}}
            locations={[0, 0.7]}
            colors={['#1B64D2', '#386BF6']}
            style={{
              height: heightPercentageToDP('9%'),
              justifyContent: 'center',

              borderBottomWidth: 0.5,
              borderBottomColor: '#DFDFDF',
              elevation: 8,
              // marginTop: 15,
            }}>
            <View
              style={{
                marginHorizontal: 15,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: 'white',
                  fontSize: responsiveFontSize(3),
                  ...Constanta({
                    font: 'semibold',
                  }),
                }}>
                Filter Titik Sebaran
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '300',
                    fontSize: responsiveFontSize(1.8),
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Pilih untuk mendapatkan titik sebaran tertentu
                </Text>
                <View style={{}}>
                  <Text
                    style={{
                      color: 'white',
                      ...Constanta({
                        font: 'semibold',
                      }),
                    }}>
                    Reset
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={{
              height: heightPercentageToDP('55%'),
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
              }}>
              {listFilterMenu
                .sort((a, b) => a.id - b.id)
                .map((filterData, index) => (
                  <Pressable
                    key={
                      filterData.id +
                      'filterData' +
                      new Date().getMilliseconds()
                    }
                    onPress={() => {
                      setListFilterMenu(filter => {
                        return [
                          ...filter.filter(
                            dataFil => dataFil.id != filterData.id,
                          ),
                          {
                            ...filterData,
                            value: !filterData.value,
                          },
                        ];
                        //   return filter;
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      backgroundColor: filterData.value
                        ? '#D9E2EF'
                        : '#E8E8E833',
                      //   paddingHorizontal: 25,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: filterData.value ? '#01796F' : '#6D768780',
                      marginVertical: 10,
                      width: widthPercentageToDP('47%'),
                    }}>
                    <Text
                      style={{
                        color: filterData.value ? '#01796F' : '#6D7687',
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '400',
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}>
                      {filterData.title}
                    </Text>
                  </Pressable>
                ))}
            </View>

            {listFilterMenu.filter(e => e.value == true).length ? (
              //   <TouchableOpacity
              //     onPress={() => {
              // let getListActive = listFilterMenu
              //   .filter(e => e.value == true)
              //   .map(e => e.filter);
              // processFilter && processFilter(getListActive.join(','));
              //     }}
              //     style={{
              // alignItems: 'center',
              // backgroundColor: '#E7E7E7',
              // marginHorizontal: 10,
              // paddingVertical: 15,
              // marginVertical: 15,
              // borderRadius: 10,
              //     }}>
              //     <Text
              //       style={{
              //         color: '#8F8F8F',
              //       }}>
              //       Terapkan Filter Data
              //     </Text>
              //   </TouchableOpacity>
              <Pressable
                onPress={() => {
                  let getListActive = listFilterMenu
                    .filter(e => e.value == true)
                    .map(e => e.filter);
                  processFilter && processFilter(getListActive.join(','));
                  combinedRef.current.close();
                }}
                style={{
                  width: widthPercentageToDP('95%'),
                  height: heightPercentageToDP('5%'),
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  //   alignItems: 'center',
                  //   alignItems: 'center',
                }}>
                <LinearGradient
                  start={{x: 1.0, y: 1.0}}
                  end={{x: 0.0, y: 0.4}}
                  locations={[0, 0.7]}
                  colors={['#F8C92C', '#01796F']}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    // flexDirection: 'row',
                    // alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Terapkan Filter
                  </Text>
                </LinearGradient>
              </Pressable>
            ) : (
              <Pressable
                // onPress={() => {
                //   let getListActive = listFilterMenu
                //     .filter(e => e.value == true)
                //     .map(e => e.filter);
                //   processFilter && processFilter(getListActive.join(','));
                // }}
                style={{
                  width: widthPercentageToDP('95%'),
                  height: heightPercentageToDP('5%'),
                  borderRadius: 10,
                  alignItems: 'center',
                  backgroundColor: '#E7E7E7',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: '#8F8F8F',
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Terapkan Filter
                </Text>
              </Pressable>
            )}
            {/* <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#E7E7E7',
            marginHorizontal: 10,
            paddingVertical: 10,
            // marginVertical: 15,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#8F8F8F',
            }}>
            Terapkan Filter
          </Text>
        </TouchableOpacity> */}
          </ScrollView>
        </Modalize>
      </Portal>
    </>
  );
});
