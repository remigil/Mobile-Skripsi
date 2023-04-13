// import moment from 'moment';
// import React, {Component, useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   SafeAreaView,
//   FlatList,
//   ImageBackground,
//   Image,
//   TextInput,
// } from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {ActivityIndicator, Divider, Searchbar} from 'react-native-paper';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveScreenWidth,
// } from 'react-native-responsive-dimensions';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {PusatBantuan} from '..';
// import {
//   Bg_CC,
//   Bg_K31,
//   CloseModalize,
//   IconCari,
//   IconCariPeta,
//   IconSearch,
//   IconSearchFaq,
//   Kapolri,
// } from '../../../assets/Assets';
// import {BaseContainer, TouchableGradient} from '../../../component';
// import Constanta from '../../../lib/Constanta';
// import {GetFAQ} from '../../../repositories/sidebar';

// export default props => {
//   const [dataParams, setDataParams] = useState({
//     limit: 10,
//     page: 1,
//   });
//   const [dataRiwayat, setRiwayat] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefresh, setIsRefresh] = useState(false);
//   const [totalPage, setTotalPage] = useState(null);
//   const [total, setTotal] = useState(null);
//   const [searchFilter, setSearchFilter] = useState('');

//   const isNext = (currentPage, isNext) => {
//     if (currentPage != 0 && currentPage <= totalPage) {
//       setIsRefresh(true);
//       console.log({...dataParams, page: currentPage});
//       setDataParams({...dataParams, page: currentPage});
//     }
//   };
//   useEffect(() => {
//     if (isRefresh) {
//       GetFAQ({page: dataParams.page})
//         .then(data => {
//           console.log({data: data.data});
//           setTotalPage(data.data.total_page);
//           setRiwayat(prev => [...prev, ...data.data.rows]);
//         })
//         .catch(() => {})
//         .finally(() => {
//           setIsLoading(false);
//           setIsRefresh(false);
//         });
//     }
//   }, [isRefresh]);
//   useEffect(() => {
//     setIsLoading(true);
//     GetFAQ()
//       .then(data => {
//         console.log({data: data});
//         setTotalPage(data.data.total_page);
//         setRiwayat(data.data.rows);
//       })
//       .catch(() => {})
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     setIsLoading(true);
//     GetFAQ({
//       page: 1,
//       search: searchFilter,
//     })
//       .then(data => {
//         console.log({data: data});
//         setTotalPage(data.data.total_page);
//         setRiwayat(data.data.rows);
//         setTotal(data.data.total);
//       })
//       .catch(() => {})
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [searchFilter]);

//   return (
//     <BaseContainer
//       withActionBar={true}
//       actionBarProps={{
//         title: 'FAQ',
//         backIconStyle: true,
//         titleStyle: {
//           color: '#FFF',

//           backgrounColor: '#FCFDFF',
//           textAlign: 'center',
//         },
//         onBackPressed: () => {
//           props.navigation.goBack('Home');
//         },
//       }}>
//       <ImageBackground
//         style={{
//           flex: 1,
//         }}
//         source={require('../../../assets/sidebar/faq/logo k3i.png')}>
//         {/* <View
//           style={{
//             flex: 1,
//             // marginHorizontal: widthPercentageToDP('8%'),
//             // alignItems: 'center',
//           }}> */}
//         <View
//           style={{
//             marginTop: responsiveHeight(1),
//             flexDirection: 'row',
//             alignItems: 'center',
//             // justifyContent: 'center',
//             marginHorizontal: responsiveScreenWidth(4),
//             borderWidth: 1,
//             borderColor: '#DADADA',
//             padding: 3,
//             borderRadius: widthPercentageToDP('2%'),
//           }}>
//           <View>
//             <IconCariPeta width={30} height={30} />
//           </View>
//           <View
//             style={{
//               alignItems: 'center',
//               // backgroundColor: 'red',
//             }}>
//             <TextInput
//               placeholder="Cari"
//               style={{
//                 width: responsiveScreenWidth(90),
//                 ...Constanta({
//                   font: 'regular',
//                 }),
//                 fontSize: responsiveFontSize(2),
//                 height: responsiveHeight(5),
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 // backgroundColor: 'red',
//               }}
//               onChangeText={value => {
//                 // console.log({value});
//                 setSearchFilter(value);
//               }}
//             />
//           </View>
//         </View>

//         {isLoading ? (
//           <View
//             style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <ActivityIndicator color="blue" />
//           </View>
//         ) : (
//           <>
//             {searchFilter.length ? (
//               <View>
//                 <Text
//                   style={{
//                     color: '#01796F',
//                     marginHorizontal: 12,
//                     marginTop: responsiveHeight(2),
//                     marginBottom: 10,
//                     ...Constanta({
//                       font: 'regular',
//                     }),
//                   }}>
//                   Hasil Pencarian ({total})
//                 </Text>
//                 <Divider
//                   style={{
//                     marginHorizontal: 12,
//                   }}
//                 />
//               </View>
//             ) : (
//               <View>
//                 <Text
//                   style={{
//                     color: '#01796F',
//                     marginHorizontal: 12,
//                     marginTop: responsiveHeight(2),
//                     marginBottom: 10,
//                     ...Constanta({
//                       font: 'regular',
//                     }),
//                   }}>
//                   Apa ada yang bisa kami bantu ?
//                 </Text>
//                 <Divider
//                   style={{
//                     marginHorizontal: 12,
//                   }}
//                 />
//               </View>
//             )}
//             {dataRiwayat.length ? (
//               <FlatList
//                 key={'flatlistIncident'}
//                 contentContainerStyle={{
//                   marginTop: 5,
//                   paddingBottom: widthPercentageToDP('15%'),
//                 }}
//                 keyExtractor={(item, index) => item.id}
//                 ItemSeparatorComponent={() => (
//                   <View
//                     style={
//                       {
//                         // borderBottomColor: '#aaa',
//                         // borderBottomWidth: 0.5,
//                       }
//                     }
//                   />
//                 )}
//                 renderItem={({item}) => (
//                   <TouchableOpacity
//                     onPress={() => {
//                       props.navigation.navigate('PusatBantuan');
//                     }}
//                     key={item.id + '-' + new Date().getMilliseconds()}
//                     style={{
//                       width: widthPercentageToDP('100%'),
//                     }}>
//                     <View style={styles.item}>
//                       <Text style={styles.title}>{item.question}</Text>
//                       <Divider />
//                     </View>
//                   </TouchableOpacity>
//                 )}
//                 data={dataRiwayat}
//                 onEndReached={() => {
//                   if (totalPage > dataParams.page) {
//                     setDataParams({
//                       ...dataParams,
//                       page: dataParams.page + 1,
//                     });
//                     isNext(dataParams.page + 1, true);
//                   }
//                 }}
//                 onEndReachedThreshold={0.001}
//                 ListFooterComponent={() =>
//                   isRefresh && (
//                     <View
//                       style={{
//                         alignSelf: 'center',
//                         alignItems: 'center',
//                         zIndex: 9999,
//                       }}>
//                       <ActivityIndicator size="large" />
//                     </View>
//                   )
//                 }
//                 initialNumToRender={10}
//               />
//             ) : (
//               <View
//                 style={{
//                   flex: 1,
//                   // backgroundColor: '#62FF2A',
//                   // height: widthPercentageToDP('100%'),
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 {/* <IconLaporanEmptyState /> */}
//                 <IconSearchFaq />
//                 <Text
//                   style={{
//                     ...Constanta({
//                       font: 'regular',
//                     }),
//                     color: '#AEAEAE',
//                     fontSize: responsiveFontSize(2),
//                     marginTop: responsiveHeight(3),
//                   }}>
//                   Hasil Pencarian Tidak Dapat Ditemukan
//                 </Text>
//               </View>
//             )}
//           </>
//         )}
//         {/* </View> */}
//       </ImageBackground>
//     </BaseContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 12,
//   },
//   item: {
//     marginVertical: 5,
//     marginHorizontal: 12,
//   },
//   title: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#4E4E4E',
//     paddingBottom: 9,
//     ...Constanta({
//       font: 'regular',
//     }),
//   },
// });
