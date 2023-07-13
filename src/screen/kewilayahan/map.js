import React, {useEffect, useRef, useState} from 'react';
import getDirections from 'react-native-google-maps-directions';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Marker} from 'react-native-maps';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ChevronUp, ChevronDown} from '../../assets/Assets';
import {BaseContainer, DialogContainer} from '../../component';
import {ActivityIndicator, Divider} from 'react-native-paper';

import Permission from '../../lib/permission';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-map-clustering';
import Constanta from '../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {List} from 'react-native-paper';
import {
  GetPolresPerPolda,
  GetSamsatPerPolda,
  GetSatpastPerPolda,
} from '../../repositories/kewilayahan';
import {Haversine} from '../../constant/URL_EMBED';
import {BasicAlertProps} from '../../component/container/dialogContainer';
// import {fitZoomToMarkers} from '../../component/map/FitZoomToMarkers';

export default props => {
  const getCurrentLocation = () => {
    Permission.requestAll()
      .then(res => {
        Geolocation.getCurrentPosition(
          position => {
            let useLatlon = [];
            let _currLatLng = {};
            _currLatLng.latitude = position.coords.latitude;
            _currLatLng.longitude = position.coords.longitude;
            useLatlon.push(_currLatLng);
            setUserLocation(_currLatLng);
            // fitZoomToMarkers(mapRef, useLatlon);
            // animateToCamera(mapRef, useLatlon);
          },
          error => {
            console.log('get_position_error' + error.message);
          },
          {enableHighAccuracy: true, timeout: 20000},
        );
      })
      .catch(res => console.log(res));
  };
  const [expanded, setExpanded] = useState(true);
  const [expandedPolres, setExpandedPolres] = useState(true);
  const [expandedSamsat, setExpandedSamsat] = useState(false);
  const [expandedSatpas, setExpandedSatpas] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const handlePressPolres = () => setExpandedPolres(!expandedPolres);
  const handlePressSamsat = () => setExpandedSamsat(!expandedSamsat);
  const handlePressSatpas = () => setExpandedSatpas(!expandedSatpas);
  const [trackUser, setTrackUser] = useState([]);
  const socketRef = useRef();
  const [isTrack, setIsTrack] = useState(false);
  const mapRef = useRef(MapView);
  const modalizeRef = useRef(null);
  const modalizeCCTV = useRef(null);
  const modalizeFasum = useRef(null);
  const modalizeDirection = useRef(null);
  const modalizeSamsat = useRef(null);
  const modalizePolres = useRef(null);
  const modalizeSimkel = useRef(null);
  const modalizePolda = useRef(null);
  const modalizeTrouble = useRef(null);
  const googlePlace = useRef(null);
  const [placeId, setPlaceId] = useState(null);
  // const modalizeShare = useRef(null);
  const [cctv, setCctv] = useState([]);
  const [placeDirection, setPlaceDirection] = useState(false);
  const [processFilterMaps, setProcessFilterMaps] = useState(true);
  const [filterFieldReq, setFilterFieldReq] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [searchPlace, setSearchPlace] = useState({
    lat: null,
    lon: null,
  });
  const [querySearchPlace, setQuerySearchPlace] = useState({});
  const [cctvDetailClick, setCctvDetailClick] = useState({});
  const [samsatDetailClick, setSamsatDetailClick] = useState({});
  const [polresDetailClick, setPolresDetailClick] = useState({});
  const [simkelDetailClick, setSimkelDetailClick] = useState({});
  const [troubleDetailClick, setTroubleClick] = useState({});
  const [poldaDetailClick, setPoldaDetailClick] = useState({});
  const [fasum, setFasum] = useState([]);
  const [polres, setPolres] = useState([]);
  const [polda, setPolda] = useState([]);
  const [samsat, setSamsat] = useState([]);
  const [simkeliling, setSimKeliling] = useState([]);
  const [etle, setEtle] = useState([]);
  const [troublespot, setTroublespot] = useState([]);
  const [fasumDetailClick, setFasumDetailClick] = useState({});
  const [isLoadPhoto, setIsLoadPhoto] = useState(false);
  const initStates = {
    actionBar: {
      title: 'Main Menu',
      titleStyle: {color: '#aaa'},
      onBackPressed: () => {
        // setBasicAlertProp({
        //   ...basicAlertProp,
        //   visible: true,
        //   title: 'Confirmation',
        //   message: 'Are you sure wanna logout?',
        //   onClose: closeBasicAlert,
        //   onOK: () => dispatch(authLogout()),
        //   isOKOnly: false,
        // });
      },
    },
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };

  const [actionBarData, setActionBarData] = useState(initStates.actionBar);
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initStates.basicAlertProps,
  });
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
  const [photoData, setPhotoData] = useState([]);
  const [photoReference, setPhotoReference] = useState('');

  const [mapType, setMapType] = useState('standard');

  const {width, height} = Dimensions.get('window');
  const [listPolres, setListPolres] = useState([]);
  const [listSamsat, setListSamsat] = useState([]);
  const [listSatpas, setListSatpas] = useState([]);
  const fitZoomToMarkers = (
    map = null,
    markers = [],
    justUserLocationMarker = false,
    edgePadding = {
      top: 310,
      right: 100,
      bottom: 95,
      left: 50,
    },
  ) => {
    let latlng = [];
    try {
      if (markers.length > 0 && !justUserLocationMarker) {
        markers.forEach((m, i) => {
          latlng.push({latitude: m.latitude, longitude: m.longitude});
        });
      }

      map?.current?.fitToCoordinates(latlng, {
        edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
        animated: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (props.route.params.id && isLoading) {
      GetPolresPerPolda(props.route.params.id)
        .then(dataPolres => {
          setListPolres(dataPolres.data.data);
          console.log('polres', dataPolres.data.data);
          let poldaData = [];
          for (const ee of dataPolres.data.data) {
            if (ee != undefined) {
              if (ee.latitude && ee.longitude && ee) {
                poldaData.push({
                  latitude: parseFloat(ee.latitude),
                  longitude: parseFloat(ee.longitude),
                });
              }
            }
          }

          mapRef?.current?.fitToCoordinates(poldaData, {
            edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
            animated: true,
          });
          // console.log({aaa});
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [props.route.params.id, isLoading]);

  useEffect(() => {
    if (props.route.params.id && isLoading) {
      GetSamsatPerPolda(props.route.params.id)
        .then(dataSamsat => {
          console.log(dataSamsat, 'ini data samsat yaaaa');
          setListSamsat(dataSamsat.data.data);
          // let samsatData = dataSamsat.data.data.map(ee => ({
          //   latitude: parseFloat(ee.samsat_lat),
          //   longitude: parseFloat(ee.samsat_lng),
          // }));
          let samsatData = dataSamsat.data.data.map(ee => {
            if (ee.samsat_lat && ee.samsat_lng) {
              return {
                latitude: parseFloat(ee.samsat_lat),
                longitude: parseFloat(ee.samsat_lng),
              };
            }
          });

          mapRef?.current?.fitToCoordinates(samsatData, {
            edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
            animated: true,
          });
          // console.log({aaa}, 'iniii apaa yaa');
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [props.route.params.id, isLoading]);

  useEffect(() => {
    if (props.route.params.id && isLoading) {
      GetSatpastPerPolda(props.route.params.id)
        .then(dataSatpas => {
          console.log(dataSatpas, 'ini data satpas yaaaa');
          setListSatpas(dataSatpas.data.data);
          let satpasData = dataSatpas.data.data.map(ee => ({
            latitude: parseFloat(ee.satpas_lat),
            longitude: parseFloat(ee.satpas_lng),
          }));
          //   console.log(poldaData);
          // fitZoomToMarkers(mapRef, poldaData);
          let aaa = mapRef?.current?.fitToCoordinates(satpasData, {
            edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
            // animated: true,
          });
          // console.log({aaa}, 'iniii apaa yaa');
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [props.route.params.id, isLoading]);

  console.log(props.route.params);
  return (
    <BaseContainer
      {...props}
      withActionBar={true}
      actionBarProps={{
        title: 'Detail Polda',
        backIconStyle: true,
        containerStyle: {
          paddingVertical: heightPercentageToDP('1%'),
        },
        titleStyle: {
          color: '#fff',
          textAlign: 'center',
          ...Constanta({font: 'bold'}),
        },
        onBackPressed: () => {
          props.navigation.goBack();
        },
      }}>
      <View
        style={{
          flex: 1,
          marginBottom: responsiveHeight(9),
        }}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              height: heightPercentageToDP('100%'),
              width: widthPercentageToDP('100%'),
              backgroundColor: '#2727278F',
              opacity: 10,
              justifyContent: 'center',
              zIndex: 999999,
            }}>
            {/* <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor={'#ededed'}
          /> */}
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#01796F" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  marginTop: 9,
                }}>
                Harap Tunggu Sebentar
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: responsiveHeight(3),
              marginHorizontal: responsiveWidth(5),
            }}>
            <View>
              <Image
                style={{
                  width: responsiveWidth(15),
                  height: responsiveHeight(10),
                }}
                source={{uri: props.route.params?.picture}}
              />
            </View>
            <View
              style={{
                marginLeft: responsiveWidth(3),
              }}>
              <Text
                style={{
                  ...Constanta({font: 'regular'}),
                  fontSize: responsiveFontSize(3),
                  color: 'black',
                }}>
                Polda{' '}
                <Text
                  style={{
                    ...Constanta({font: 'bold'}),
                  }}>
                  {props.route.params?.name_polda}
                </Text>
              </Text>
              <Text
                style={{
                  width: responsiveWidth(70),
                  ...Constanta({
                    font: 'regular',
                  }),
                  marginTop: responsiveHeight(1),
                  fontSize: responsiveFontSize(1.6),
                }}>
                {props.route.params?.address}
              </Text>
            </View>
          </View>
          <MapView
            key={placeDirection ? 'inimaps1' : 'inimaps2'}
            ref={mapRef}
            mapType={mapType}
            showsTraffic={true}
            // zoomEnabled={true}
            // onMapReady={() => {
            //   getDataListPolda();
            // }}
            initialRegion={{
              latitude: -6.595038,
              longitude: 106.816635,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            style={{
              //   flex: 1,
              width: responsiveWidth(100),
              height: responsiveHeight(50),
              color: 'red',
            }}>
            {listPolres?.length ? (
              listPolres.map(list => (
                <Marker
                  key={list.id}
                  coordinate={{
                    latitude: parseFloat(list.latitude),
                    longitude: parseFloat(list.longitude),
                  }}
                  // title={list.name_polres}
                  onPress={() => {
                    // alert('test');
                    setBasicAlertProps({
                      ...basicAlertProps,
                      basicAlertVisible: true,
                      basicAlertImage: true,
                      withTitle: false,
                      basicAlertImageSource: require('../../assets/gambarPolres.jpeg'),
                      tempat: list.name_polres,
                      address: list.address,
                      iconClose: () => {
                        closeBasicAlert();
                      },
                      basicAlertShowButton: false,
                      detailPlace: true,
                      distance: true,
                      haversine: Haversine({
                        lat1: userLocation.latitude,
                        lon1: userLocation.longitude,
                        lat2: parseFloat(list.latitude),
                        lon2: parseFloat(list.longitude),
                      }).toFixed(2),
                      // basicAlertBtnOkText: 'OK',
                    });
                  }}
                />
              ))
            ) : (
              <></>
            )}
            {/* <Geojson
              geojson={BatasAceh}
              strokeColor="red"
              fillColor="rgba(5, 0, 0, 0.1)"
              strokeWidth={1}
            /> */}
          </MapView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#E3E3E3',
                height: responsiveHeight(3),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveHeight(1),
                    backgroundColor: '#34CE43',
                    borderRadius: responsiveWidth(2),
                  }}></View>
                <View
                  style={{
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text
                    style={{
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Lancar
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveHeight(1),
                    backgroundColor: '#01796F',
                    borderRadius: responsiveWidth(2),
                  }}></View>
                <View
                  style={{
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text
                    style={{
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Ramai
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveHeight(1),
                    backgroundColor: '#FF9F2E',
                    borderRadius: responsiveWidth(2),
                  }}></View>
                <View
                  style={{
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text
                    style={{
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Padat
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveHeight(1),
                    backgroundColor: '#FF0000',
                    borderRadius: responsiveWidth(2),
                  }}></View>
                <View
                  style={{
                    marginLeft: responsiveWidth(1.5),
                  }}>
                  <Text
                    style={{
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    Macet
                  </Text>
                </View>
              </View>
            </View>
            <List.Section>
              <List.Accordion
                title="Lokasi Polres"
                theme={{colors: {background: 'white'}}}
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#CDD1E0',
                  borderRadius: 10,
                }}
                expanded={expandedPolres}
                titleStyle={{
                  // ...styleData.titlePlaceholder,
                  ...Constanta({
                    font: 'regular',
                  }),
                  //   borderBottomWidth: 0.5,
                }}
                onPress={handlePressPolres}
                right={() => {
                  if (expandedPolres) {
                    return <ChevronUp width={20} height={20} />;
                  } else {
                    return <ChevronDown width={20} height={20} />;
                  }
                }}>
                {listPolres?.length ? (
                  listPolres.map(list => (
                    <List.Item
                      key={list.id}
                      titleStyle={{
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}
                      title={
                        <View
                          style={{
                            paddingBottom: 10,
                            borderBottomWidth: 0.2,
                            borderBottomColor: '#BEBEBE',
                            width: responsiveWidth(90),
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View>
                              <Text
                                style={{
                                  ...Constanta({font: 'bold'}),
                                  fontSize: responsiveFontSize(2.5),
                                  color: '#454545',
                                  width: responsiveWidth(60),
                                }}>
                                {list.name_polres}
                              </Text>
                              <Text
                                style={{
                                  ...Constanta({font: 'regular'}),
                                  width: responsiveWidth(60),
                                  fontSize: responsiveFontSize(1.6),
                                }}>
                                {list.address}
                              </Text>
                            </View>
                            <View
                              style={{
                                // backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {/* lat2: parseFloat(list.latitude),
                                  lon2: parseFloat(list.longitude), */}
                              <TouchableOpacity
                                onPress={() => {
                                  const data = {
                                    source: {
                                      latitude: userLocation.latitude,
                                      longitude: userLocation.longitude,
                                    },
                                    destination: {
                                      latitude: parseFloat(list.latitude),
                                      longitude: parseFloat(list.longitude),
                                    },
                                  };

                                  getDirections(data);
                                }}>
                                <Image
                                  source={require('../../assets/icon_map.png')}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              //   backgroundColor: 'red',
                              marginTop: responsiveWidth(2),
                            }}>
                            <View
                              style={{
                                // marginTop: responsiveWidth(3),
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View>
                                <Image
                                  source={require('../../assets/icon_pin_point.png')}
                                />
                              </View>
                              <View
                                style={{
                                  // alignSelf: 'center',
                                  // justifyContent: 'center',
                                  // alignItems: 'center',
                                  marginLeft: responsiveWidth(2),
                                }}>
                                <Text
                                  style={{
                                    ...Constanta({font: 'regular'}),
                                    color: '#01796F',
                                    fontSize: responsiveFontSize(1.8),
                                  }}>
                                  Jarak Dengan lokasi anda sekarang
                                </Text>
                              </View>
                            </View>
                            <View>
                              <Text
                                style={{
                                  ...Constanta({font: 'regular'}),
                                  color: '#01796F',
                                  fontSize: responsiveFontSize(1.8),
                                }}>
                                {Haversine({
                                  lat1: userLocation.latitude,
                                  lon1: userLocation.longitude,
                                  lat2: parseFloat(list.latitude),
                                  lon2: parseFloat(list.longitude),
                                }).toFixed(2)}{' '}
                                KM
                              </Text>
                            </View>
                          </View>
                        </View>
                      }
                    />
                  ))
                ) : (
                  <></>
                )}
              </List.Accordion>
              <List.Accordion
                title="Lokasi Satpas"
                theme={{colors: {background: 'white'}}}
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#CDD1E0',
                  borderRadius: 10,
                }}
                expanded={expandedSatpas}
                titleStyle={{
                  // ...styleData.titlePlaceholder,
                  ...Constanta({
                    font: 'regular',
                  }),
                  //   borderBottomWidth: 0.5,
                }}
                onPress={handlePressSatpas}
                right={() => {
                  if (!expandedSatpas) {
                    return <ChevronUp width={20} height={20} />;
                  } else {
                    return <ChevronDown width={20} height={20} />;
                  }
                }}>
                {listSatpas?.length ? (
                  listSatpas.map(list => (
                    <List.Item
                      key={list.id}
                      titleStyle={{
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}
                      title={
                        <View
                          style={{
                            paddingBottom: 10,
                            borderBottomWidth: 0.2,
                            borderBottomColor: '#BEBEBE',
                            width: responsiveWidth(90),
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View>
                              <Text
                                style={{
                                  ...Constanta({font: 'bold'}),
                                  fontSize: responsiveFontSize(2.5),
                                  color: '#454545',
                                  width: responsiveWidth(60),
                                }}>
                                {list.name_satpas}
                              </Text>
                              <Text
                                style={{
                                  ...Constanta({font: 'regular'}),
                                  width: responsiveWidth(60),
                                  fontSize: responsiveFontSize(1.6),
                                }}>
                                {list.address}
                              </Text>
                            </View>
                            <View
                              style={{
                                // backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {/* lat2: parseFloat(list.latitude),
                                  lon2: parseFloat(list.longitude), */}
                              <TouchableOpacity
                                onPress={() => {
                                  const data = {
                                    source: {
                                      latitude: userLocation.latitude,
                                      longitude: userLocation.longitude,
                                    },
                                    destination: {
                                      latitude: parseFloat(list.satpas_lat),
                                      longitude: parseFloat(list.satpas_lng),
                                    },
                                  };

                                  getDirections(data);
                                }}>
                                <Image
                                  source={require('../../assets/icon_map.png')}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          {/* <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              //   backgroundColor: 'red',
                              marginTop: responsiveWidth(2),
                            }}>
                            <View
                              style={{
                                // marginTop: responsiveWidth(3),
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View>
                                <Image
                                  source={require('../../assets/icon_pin_point.png')}
                                />
                              </View>
                              <View
                                style={{
                                  // alignSelf: 'center',
                                  // justifyContent: 'center',
                                  // alignItems: 'center',
                                  marginLeft: responsiveWidth(2),
                                }}>
                                <Text
                                  style={{
                                    ...Constanta({font: 'regular'}),
                                    color: '#01796F',
                                    fontSize: responsiveFontSize(1.8),
                                  }}>
                                  Jarak Dengan lokasi anda sekarang
                                </Text>
                              </View>
                            </View>
                            <View>
                              <Text
                                style={{
                                  ...Constanta({font: 'regular'}),
                                  color: '#01796F',
                                  fontSize: responsiveFontSize(1.8),
                                }}>
                                {Haversine({
                                  lat1: userLocation.latitude,
                                  lon1: userLocation.longitude,
                                  lat2: parseFloat(list.satpas_lat),
                                  lon2: parseFloat(list.satpas_lng),
                                }).toFixed(2)}{' '}
                                KM
                              </Text>
                            </View>
                          </View> */}
                        </View>
                      }
                    />
                  ))
                ) : (
                  <></>
                )}
              </List.Accordion>

              <List.Accordion
                title="Lokasi Samsat"
                theme={{colors: {background: 'white'}}}
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#CDD1E0',
                  borderRadius: 10,
                }}
                expanded={expandedSamsat}
                titleStyle={{
                  // ...styleData.titlePlaceholder,
                  ...Constanta({
                    font: 'regular',
                  }),
                  //   borderBottomWidth: 0.5,
                }}
                onPress={handlePressSamsat}
                right={() => {
                  if (!expandedSamsat) {
                    return <ChevronUp width={20} height={20} />;
                  } else {
                    return <ChevronDown width={20} height={20} />;
                  }
                }}>
                {listSamsat?.length ? (
                  listSamsat.map(list => (
                    <List.Item
                      key={list.id}
                      titleStyle={{
                        ...Constanta({
                          font: 'regular',
                        }),
                      }}
                      title={
                        <View
                          style={{
                            paddingBottom: 10,
                            borderBottomWidth: 0.2,
                            borderBottomColor: '#BEBEBE',
                            width: responsiveWidth(90),
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View>
                              <Text
                                style={{
                                  ...Constanta({font: 'bold'}),
                                  fontSize: responsiveFontSize(2.5),
                                  color: '#454545',
                                  width: responsiveWidth(60),
                                }}>
                                {list.name_samsat}
                              </Text>
                              <Text
                                style={{
                                  ...Constanta({font: 'regular'}),
                                  width: responsiveWidth(60),
                                  fontSize: responsiveFontSize(1.6),
                                }}>
                                {list.address}
                              </Text>
                            </View>
                            {/* <View
                              style={{
                                // backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  const data = {
                                    source: {
                                      latitude: userLocation.latitude,
                                      longitude: userLocation.longitude,
                                    },
                                    destination: {
                                      latitude: parseFloat(list.samsat_lat),
                                      longitude: parseFloat(list.samsat_lng),
                                    },
                                  };

                                  getDirections(data);
                                }}>
                                <Image
                                  source={require('../../assets/icon_map.png')}
                                />
                              </TouchableOpacity>
                            </View> */}
                          </View>
                          {/* <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              //   backgroundColor: 'red',
                              marginTop: responsiveWidth(2),
                            }}>
                            <View
                              style={{
                                // marginTop: responsiveWidth(3),
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View>
                                <Image
                                  source={require('../../assets/icon_pin_point.png')}
                                />
                              </View>
                              <View
                                style={{
                                  // alignSelf: 'center',
                                  // justifyContent: 'center',
                                  // alignItems: 'center',
                                  marginLeft: responsiveWidth(2),
                                }}>
                                <Text
                                  style={{
                                    ...Constanta({font: 'regular'}),
                                    color: '#01796F',
                                    fontSize: responsiveFontSize(1.8),
                                  }}>
                                  Jarak Dengan lokasi anda sekarang
                                </Text>
                              </View>
                            </View>
                            <View>
                              <Text
                                style={{
                                  ...Constanta({font: 'regular'}),
                                  color: '#01796F',
                                  fontSize: responsiveFontSize(1.8),
                                }}>
                                {Haversine({
                                  lat1: userLocation.latitude,
                                  lon1: userLocation.longitude,
                                  lat2: parseFloat(list.samsat_lat),
                                  lon2: parseFloat(list.samsat_lng),
                                }).toFixed(2)}{' '}
                                KM
                              </Text>
                            </View>
                          </View> */}
                        </View>
                      }
                    />
                  ))
                ) : (
                  <></>
                )}
              </List.Accordion>
            </List.Section>
          </View>
        </ScrollView>
        <DialogContainer {...basicAlertProps} />
      </View>
    </BaseContainer>
  );
};
