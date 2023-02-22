import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  Image,
  Platform,
} from 'react-native';
import {
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  IconFilterMap,
  IconCctv,
  IconSamsat,
  IconRumahMakan,
  IconTambah,
  IconLocation,
  CloseModalize,
  IconMin,
  IconPlus,
  IconCariPeta,
  IconTargetMap,
  IconLayerMap,
} from '../../assets/Assets';
import {BaseContainer, FilterSearch} from '../../component';
import {ActivityIndicator} from 'react-native-paper';
import Cctvdetail from '../../component/map/modal/cctvdetail';
import Troublespot from '../../component/map/modal/troublespot';
import {GetFilterSearch, GetPhotoPlaceReference} from '../../repositories/map';
import {
  animateToCamera,
  fitZoomToMarkers,
} from '../../component/map/FitZoomToMarker';

import moment from 'moment';
import Permission from '../../lib/permission';
import {BlurView} from '@react-native-community/blur';
import Fasumdetail from '../../component/map/modal/fasumdetail';
import Geolocation from 'react-native-geolocation-service';
import Directioninformation from '../../component/map/modal/directioninformation';
import {MODE_ORS_ROADS} from '../../lib/MapCustomTile';
import MapView from 'react-native-map-clustering';
import Samsat from '../../component/map/modal/samsat';
import Simkeldetail from '../../component/map/modal/simkeldetail';
import Poldadetail from '../../component/map/modal/poldadetail';
import Polresdetail from '../../component/map/modal/polresdetail';
import {APISender} from '../../repositories/config';
import {API_BASE_URL_TRACK} from '@env';
import Constanta from '../../lib/Constanta';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Etledetail from '../../component/map/modal/etledetail';
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
            animateToCamera(mapRef, useLatlon);
          },
          error => {
            console.log('get_position_error' + error.message);
          },
          {enableHighAccuracy: true, timeout: 20000},
        );
      })
      .catch(res => console.log(res));
  };

  // const getTrackingUser = () => {
  //   APISender(
  //     API_BASE_URL_TRACK +
  //       'track-location/getMe?date=' +
  //       moment().format('YYYY-MM-DD'),
  //     'get',
  //   )
  //     .then(track => {
  //       setTrackUser(track.data);
  //     })
  //     .catch(errTrack => {})
  //     .finally(() => {
  //       setIsTrack(false);
  //     });
  // };

  // useEffect(() => {
  //   if (isTrack) {
  //     getTrackingUser();
  //   }
  // }, [isTrack]);
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const initState = {
    filter: [
      {
        id: 1,
        title: 'Polda Terdekat',
        filter: 'polda',
        value: true,
      },
      {
        id: 2,
        title: 'Polres Terdekat',
        filter: 'polres',
        value: false,
      },
      {
        id: 3,
        title: 'CCTV Terdekat',
        filter: 'cctv',
        value: false,
      },
      {
        id: 4,
        title: 'ETLE Terdekat',
        filter: 'etle',
        value: false,
      },
      {
        id: 5,
        title: 'Fasum Terdekat',
        filter: 'fasum_khusus',
        value: false,
      },
      {
        id: 6,
        title: 'TroubleSpot',
        filter: 'troublespot',
        value: false,
      },
      {
        id: 7,
        title: 'SIM Keliling',
        filter: 'sim_keliling',
        value: false,
      },
      {
        id: 8,
        title: 'Samsat',
        filter: 'samsat',
        value: false,
      },
      {
        id: 10,
        title: 'Jalur Mudik',
        filter: 'renpam',
        value: false,
      },
    ],
    favorit: [
      {
        id: 1,
        icon: <IconCctv />,
        title: 'CCTV',
      },
      {
        id: 2,
        icon: <IconSamsat />,
        title: 'Samsat',
      },
      {
        id: 3,
        icon: <IconRumahMakan />,
        title: 'Rumah Makan',
      },
      {
        id: 4,
        icon: <IconTambah />,
        title: 'Tambah',
      },
    ],
    mapMode: MODE_ORS_ROADS,
  };

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
  const modalizeEtle = useRef(null);
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
  const [regionData, setRegionData] = useState({
    latitude: null,
    longitude: null,
    ltDelta: 40,
    lgDelta: 40,
  });
  const [searchPlace, setSearchPlace] = useState({
    lat: null,
    lon: null,
  });
  const [querySearchPlace, setQuerySearchPlace] = useState({});
  const [cctvDetailClick, setCctvDetailClick] = useState({});
  const [etleDetailClick, setEtleDetailClick] = useState({});
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
  const [renpam, setRenpam] = useState([]);
  const [zoom, setZoom] = useState(10);
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
  };
  useEffect(() => {
    if (processFilterMaps) {
      GetFilterSearch({
        filter: filterFieldReq,
        coordinate: `${userLocation.latitude},${userLocation.longitude}`,
        radius: 2000,
        type: 'mosque,school,cafe,hospital,lodging,restaurant,tourist_attraction,fire_station,shopping_mall',
      })
        .then(async data => {
          // console.log(data);
          let LatLon = [];
          if (data?.data?.cctv?.length) {
            data?.data?.cctv.forEach(cctvData => {
              LatLon.push({
                latitude: parseFloat(cctvData.lat_cctv),
                longitude: parseFloat(cctvData.lng_cctv),
              });
            });
            setCctv(data?.data?.cctv);
          } else {
            setCctv([]);
          }
          if (data?.data?.fasum_khusus?.length) {
            data?.data?.fasum_khusus.forEach(fasumData => {
              LatLon.push({
                latitude: parseFloat(fasumData.fasum_lat),
                longitude: parseFloat(fasumData.fasum_lng),
              });
            });
            setFasum(data?.data?.fasum_khusus);
          } else {
            setFasum([]);
          }
          if (data?.data?.polda?.length) {
            data?.data?.polda.forEach(poldaData => {
              LatLon.push({
                latitude: parseFloat(poldaData.latitude),
                longitude: parseFloat(poldaData.longitude),
              });
            });
            setPolda(data?.data?.polda);
          } else {
            setPolda([]);
          }
          if (data?.data?.polres?.length) {
            data?.data?.polres.forEach(polresData => {
              LatLon.push({
                latitude: parseFloat(polresData.latitude),
                longitude: parseFloat(polresData.longitude),
              });
            });
            setPolres(data?.data?.polres);
          } else {
            setPolres([]);
          }
          if (data?.data?.samsat?.length) {
            data?.data?.samsat.forEach(samsatData => {
              LatLon.push({
                latitude: parseFloat(samsatData.samsat_lat),
                longitude: parseFloat(samsatData.samsat_lng),
              });
            });
            setSamsat(data?.data?.samsat);
          } else {
            setSamsat([]);
          }
          if (data?.data?.sim_keliling?.length) {
            data?.data?.sim_keliling.forEach(simkelilingData => {
              LatLon.push({
                latitude: parseFloat(simkelilingData.latitude),
                longitude: parseFloat(simkelilingData.longitude),
              });
            });
            setSimKeliling(data?.data?.sim_keliling);
          } else {
            setSimKeliling([]);
          }
          if (data?.data?.etle?.length) {
            data?.data?.etle.forEach(etleData => {
              LatLon.push({
                latitude: parseFloat(etleData.lat_etle),
                longitude: parseFloat(etleData.lng_etle),
              });
            });
            setEtle(data?.data?.etle);
            // console.log(data?.data?.etle, 'ini data etlee');
          } else {
            setEtle([]);
          }
          if (data?.data?.troublespot?.length) {
            console.log('test');
            data?.data?.troublespot.forEach(troublespotData => {
              LatLon.push({
                latitude: parseFloat(troublespotData.latitude),
                longitude: parseFloat(troublespotData.longitude),
              });
            });
            setTroublespot(data?.data?.troublespot);
          } else {
            setTroublespot([]);
          }
          if (data?.data?.renpam?.length) {
            // console.log({
            //   test: 'kesini kok guys',
            //   list: data?.data?.renpam.length,
            //   route: data?.data?.renpam[0],
            // });

            setRenpam(data?.data?.renpam);
          } else {
            setRenpam([]);
          }

          // fitZoomToMarkers(mapRef, LatLon);
          // console.log({filterDatanya: data});
        })
        .catch(err => {
          alert(err.message);
        })
        .finally(() => {
          setProcessFilterMaps(false);
        });
    }
  }, [processFilterMaps]);
  const [actionBarData, setActionBarData] = useState(initStates.actionBar);
  const [photoData, setPhotoData] = useState([]);
  const [photoReference, setPhotoReference] = useState('');

  useEffect(() => {
    if (isLoadPhoto) {
      GetPhotoPlaceReference(photoReference)
        .then(photo => {
          setPhotoData(photo.data.data);
        })
        .catch(err => {
          console.log({err});
        })
        .finally(() => {
          setIsLoadPhoto(false);
        });
    }
  }, [isLoadPhoto]);
  const [mapType, setMapType] = useState('standard');

  return (
    <BaseContainer
      {...props}
      withActionBar={true}
      actionBarProps={{
        title: ' ',
        containerStyle: {
          paddingVertical: heightPercentageToDP('1%'),
        },
        titleStyle: {
          color: 'white',

          ...Constanta({font: 'bold'}),
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.openDrawer();
        },
      }}>
      <View
        style={{
          flex: 1,
          marginBottom: widthPercentageToDP('18%'),
        }}>
        <MapView
          key={placeDirection ? 'inimaps1' : 'inimaps2'}
          ref={mapRef}
          mapType={mapType}
          showsUserLocation
          // maxZoom={zoom}
          showsTraffic={true}
          zoomEnabled={true}
          // zoomControlEnabled={true}
          region={{
            latitude: -0.21973,
            longitude: 117.91602,
            latitudeDelta: regionData.ltDelta,
            longitudeDelta: regionData.lgDelta,
          }}
          style={{
            flex: 1,
          }}
          // initialCamera={{
          //   center: {
          //     latitude: -0.21973,
          //     longitude: 117.91602,
          //   },
          //   pitch: 45,
          //   heading: 90,
          //   altitude: 1000,
          //   zoom: zoom,
          // }}
        >
          {renpam.length ? (
            renpam.map(listRenpam => {
              if (listRenpam?.direction_route?.length) {
                return (
                  <>
                    <Marker
                      coordinate={{
                        latitude: listRenpam.direction_route[0].latitude,
                        longitude: listRenpam.direction_route[0].longitude,
                      }}
                    />
                    <Marker
                      coordinate={{
                        latitude:
                          listRenpam.direction_route[
                            listRenpam.direction_route.length - 1
                          ].latitude,
                        longitude:
                          listRenpam.direction_route[
                            listRenpam.direction_route.length - 1
                          ].longitude,
                      }}
                    />
                    <Polyline
                      key={listRenpam.id}
                      tappable={true}
                      coordinates={listRenpam.direction_route}
                      strokeColor={listRenpam.warnaRoute_renpam}
                      // strokeColors={strokeColors}
                      // style={stylePolyline}
                      strokeWidth={2}
                      // {...custompolyLine}
                      onPress={() => {
                        alert('ya');
                      }}
                      style={{
                        zIndex: 999,
                      }}
                    />
                  </>
                );
              }
              if (listRenpam?.direction_route_alter1?.length) {
                return (
                  <>
                    <Marker
                      coordinate={{
                        latitude: listRenpam.direction_route_alter1[0].latitude,
                        longitude:
                          listRenpam.direction_route_alter1[0].longitude,
                      }}
                    />
                    <Marker
                      coordinate={{
                        latitude:
                          listRenpam.direction_route_alter1[
                            listRenpam.direction_route_alter1.length - 1
                          ].latitude,
                        longitude:
                          listRenpam.direction_route_alter1[
                            listRenpam.direction_route_alter1.length - 1
                          ].longitude,
                      }}
                    />
                    <Polyline
                      key={listRenpam.id}
                      tappable={true}
                      coordinates={listRenpam.direction_route_alter1}
                      strokeColor={listRenpam.warnaRoute_renpam}
                      // strokeColors={strokeColors}
                      // style={stylePolyline}
                      strokeWidth={2}
                      // {...custompolyLine}
                      onPress={() => {
                        alert('ya');
                      }}
                      style={{
                        zIndex: 999,
                      }}
                    />
                  </>
                );
              }
              if (listRenpam?.direction_route_masyarakat?.length) {
                return (
                  <>
                    <Marker
                      coordinate={{
                        latitude:
                          listRenpam.direction_route_masyarakat[0].latitude,
                        longitude:
                          listRenpam.direction_route_masyarakat[0].longitude,
                      }}
                    />
                    <Marker
                      coordinate={{
                        latitude:
                          listRenpam.direction_route_masyarakat[
                            listRenpam.direction_route_masyarakat.length - 1
                          ].latitude,
                        longitude:
                          listRenpam.direction_route_masyarakat[
                            listRenpam.direction_route_masyarakat.length - 1
                          ].longitude,
                      }}
                    />
                    <Polyline
                      key={listRenpam.id}
                      tappable={true}
                      coordinates={listRenpam.direction_route_masyarakat}
                      strokeColor={listRenpam.warnaRoute_renpam}
                      // strokeColors={strokeColors}
                      // style={stylePolyline}
                      strokeWidth={2}
                      // {...custompolyLine}
                      onPress={() => {
                        alert('ya');
                      }}
                      style={{
                        zIndex: 999,
                      }}
                    />
                  </>
                );
              }
              if (listRenpam?.direction_route_alter2?.length) {
                return (
                  <>
                    <Marker
                      coordinate={{
                        latitude: listRenpam.direction_route_alter2[0].latitude,
                        longitude:
                          listRenpam.direction_route_alter2[0].longitude,
                      }}
                    />
                    <Marker
                      coordinate={{
                        latitude:
                          listRenpam.direction_route_alter2[
                            listRenpam.direction_route_alter2.length - 1
                          ].latitude,
                        longitude:
                          listRenpam.direction_route_alter2[
                            listRenpam.direction_route_alter2.length - 1
                          ].longitude,
                      }}
                    />
                    <Polyline
                      key={listRenpam.id}
                      tappable={true}
                      coordinates={listRenpam.direction_route_alter2}
                      strokeColor={listRenpam.warnaRoute_renpam}
                      // strokeColors={strokeColors}
                      // style={stylePolyline}
                      strokeWidth={2}
                      // {...custompolyLine}
                      onPress={() => {
                        alert('ya');
                      }}
                      style={{
                        zIndex: 999,
                      }}
                    />
                  </>
                );
              }
              if (listRenpam?.direction_route_umum?.length) {
                return (
                  <>
                    <Marker
                      coordinate={{
                        latitude: listRenpam.direction_route_umum[0].latitude,
                        longitude: listRenpam.direction_route_umum[0].longitude,
                      }}
                    />
                    <Marker
                      coordinate={{
                        latitude:
                          listRenpam.direction_route_umum[
                            listRenpam.direction_route_umum.length - 1
                          ].latitude,
                        longitude:
                          listRenpam.direction_route_umum[
                            listRenpam.direction_route_umum.length - 1
                          ].longitude,
                      }}
                    />
                    <Polyline
                      key={listRenpam.id}
                      tappable={true}
                      coordinates={listRenpam.direction_route_umum}
                      strokeColor={listRenpam.warnaRoute_renpam}
                      // strokeColors={strokeColors}
                      // style={stylePolyline}
                      strokeWidth={2}
                      // {...custompolyLine}
                      onPress={() => {
                        alert('ya');
                      }}
                    />
                  </>
                );
              }
            })
          ) : (
            <></>
          )}
          {cctv.map(cctvData => (
            <Marker
              coordinate={{
                latitude: parseFloat(cctvData.lat_cctv),
                longitude: parseFloat(cctvData.lng_cctv),
              }}
              onPress={() => {
                setCctvDetailClick(cctvData);
                modalizeCCTV.current.open();
              }}
              pinColor={'blue'}
              key={'user-cctv-marker' + cctvData.id + new Date()}>
              <Image
                style={{
                  height: responsiveHeight(6),
                  width: responsiveWidth(7),
                }}
                resizeMode="contain"
                source={require('../../assets/home/cctv.png')}
              />
            </Marker>
          ))}
          {polres?.map((polresData, ind) => (
            <Marker
              coordinate={{
                latitude: parseFloat(polresData.latitude),
                longitude: parseFloat(polresData.longitude),
              }}
              tracksViewChanges={false}
              onPress={() => {
                setPolresDetailClick(polresData);
                modalizePolres.current.open();
              }}
              key={'user-polres-marker' + ind + new Date()}>
              <Image
                style={{
                  height: responsiveHeight(6),
                  width: responsiveWidth(7),
                }}
                resizeMode="contain"
                source={require('../../assets/peta/detail/polres.png')}
              />
            </Marker>
          ))}
          {polda?.map((poldaData, ind) => (
            <Marker
              coordinate={{
                latitude: parseFloat(poldaData.latitude),
                longitude: parseFloat(poldaData.longitude),
              }}
              tracksViewChanges={false}
              onPress={() => {
                setPoldaDetailClick(poldaData);
                modalizePolda.current.open();
              }}
              key={'user-polda-marker' + ind + new Date()}>
              <Image
                resizeMode="cover"
                style={{
                  height: responsiveHeight(9),
                  width: responsiveWidth(12),
                }}
                source={require('../../assets/peta/detail/pin.png')}
                // source={{
                //   uri:
                //     `${API_BASE_URL_TRACK}uploads/polda/logo/` +
                //     poldaData.logo_polda,
                // }}
              />
            </Marker>
          ))}
          {samsat?.map((dataSamsat, ind) => (
            <Marker
              coordinate={{
                latitude: parseFloat(dataSamsat.samsat_lat),
                longitude: parseFloat(dataSamsat.samsat_lng),
              }}
              tracksViewChanges={false}
              onPress={() => {
                setSamsatDetailClick(samsatData);
                modalizeSamsat.current.open();
              }}
              pinColor={'blue'}
              key={'user-samsat-marker' + ind + new Date()}>
              <Image
                style={{
                  height: responsiveHeight(6),
                  width: responsiveWidth(7),
                }}
                resizeMode="contain"
                source={require('../../assets/peta/detail/samsat.png')}
              />
            </Marker>
          ))}
          {etle?.map((etleData, ind) => (
            <Marker
              coordinate={{
                latitude: parseFloat(etleData.lat_etle),
                longitude: parseFloat(etleData.lng_etle),
              }}
              tracksViewChanges={false}
              onPress={() => {
                setEtleDetailClick(etleData);
                modalizeEtle.current.open();
              }}
              pinColor={'blue'}
              key={'user-etle-marker' + ind + new Date()}>
              <Image
                style={{
                  height: responsiveHeight(6),
                  width: responsiveWidth(7),
                }}
                // style={{
                //   height: responsiveHeight(6),
                //   width: responsiveWidth(7),
                // }}
                resizeMode="contain"
                source={require('../../assets/peta/detail/etle.png')}
                // source={require('../../assets/peta/detail/pin.png')}
              />
            </Marker>
          ))}
          {simkeliling?.map((simkelilingData, ind) => (
            <Marker
              coordinate={{
                latitude: parseFloat(simkelilingData.latitude),
                longitude: parseFloat(simkelilingData.longitude),
              }}
              tracksViewChanges={false}
              onPress={() => {
                setSimkelDetailClick(simkelilingData);
                modalizeSimkel.current.open();
              }}
              pinColor={'blue'}
              key={'user-simkeliling-marker' + ind + new Date()}>
              <Image
                // style={{
                //   height: responsiveHeight(9),
                //   width: responsiveWidth(12),
                // }}
                style={{
                  height: responsiveHeight(6),
                  width: responsiveWidth(7),
                }}
                resizeMode="contain"
                source={require('../../assets/peta/detail/simkel.png')}
              />
            </Marker>
          ))}
          {troublespot?.map((troublespotData, ind) => (
            <Marker
              coordinate={{
                latitude: parseFloat(troublespotData.latitude),
                longitude: parseFloat(troublespotData.longitude),
              }}
              tracksViewChanges={false}
              onPress={() => {
                setTroubleClick(troublespotData);
                modalizeTrouble.current.open();
              }}
              pinColor={'blue'}
              key={'user-troublespot-marker' + ind + new Date()}>
              <Image
                resizeMode="cover"
                source={require('../../assets/peta/detail/troublespot.png')}
              />
            </Marker>
          ))}
          {fasum?.map(nearByData => (
            <Marker
              flat={false}
              coordinate={{
                latitude: parseFloat(nearByData.fasum_lat),
                longitude: parseFloat(nearByData.fasum_lng),
              }}
              onPress={() => {
                // console.log({nearByData: nearByData.photos});
                setPhotoData([]);
                if (nearByData.photos != undefined) {
                  setIsLoadPhoto(true);
                  setPhotoReference(nearByData.photos[0].photo_reference);
                }

                setFasumDetailClick(nearByData);
                modalizeFasum.current?.open();
              }}
              // title={nearByData.name}
              // pinColor={nearByData.icon_background_color}
              tracksViewChanges={false}
              key={'user-fasum-marker' + nearByData.id + new Date()}>
              <View
                style={{
                  // backgroundColor: nearByData.icon_background_color,
                  padding: 8,
                  borderRadius: widthPercentageToDP('25%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: responsiveHeight(10),
                    width: responsiveWidth(10),
                  }}
                  source={{
                    uri:
                      `${API_BASE_URL_TRACK}uploads/fasum_khusus/` +
                      nearByData.fasum_logo,
                  }}
                  // source={require('../../assets/peta/detail/troublespot.png')}
                />
              </View>
            </Marker>
          ))}

          {placeDirection && (
            <>
              {/* <Marker
                coordinate={{
                  latitude: searchPlace.lat,
                  longitude: searchPlace.lon,
                }}
              /> */}
              <MapViewDirections
                origin={userLocation}
                mode="DRIVING"
                destination={{
                  latitude: searchPlace.lat,
                  longitude: searchPlace.lon,
                }}
                language="en"
                strokeWidth={5}
                strokeColor="#00B0FF"
                apikey={'AIzaSyAk5aBw69zZTlOgfVL5PMkKyhRlx1F30UI'}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${
                      params.destination
                    }"${
                      params.waypoints.length
                        ? ' using waypoints: ' + params.waypoints.join(', ')
                        : ''
                    }`,
                  );
                }}
                resetOnChange={false}
                onReady={result => {
                  // console.log(result);
                  fitZoomToMarkers(mapRef, result.coordinates);
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR', {
                    errorMessage,
                  });
                }}
              />
            </>
          )}
        </MapView>

        <FilterSearch
          ref={modalizeRef}
          filterMenu={initState.filter}
          processFilter={filter => {
            setPlaceDirection(false);
            setFilterFieldReq(filter);
            setProcessFilterMaps(true);
          }}
          {...props}
        />

        <Fasumdetail
          ref={modalizeFasum}
          fasumDetail={{
            fasumDetail: fasumDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });
            setPlaceDirection(true);
          }}
          isLoadImage={isLoadPhoto}
          photoData={photoData}
        />

        <Directioninformation
          ref={modalizeDirection}
          placeId={placeId}
          direction={() => {
            setPlaceDirection(true);
            modalizeDirection?.current?.close();
          }}
        />

        <Samsat
          ref={modalizeSamsat}
          samsatDetail={{
            samsatDetail: samsatDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setPlaceDirection(true);
          }}
        />

        <Polresdetail
          ref={modalizePolres}
          polresDetail={{
            polresDetail: polresDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setPlaceDirection(true);
          }}
        />

        <Simkeldetail
          ref={modalizeSimkel}
          simkelDetail={{
            simkelDetail: simkelDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setPlaceDirection(true);
          }}
        />

        <Troublespot
          ref={modalizeTrouble}
          troublespotDetail={{
            troublespotDetail: troubleDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setPlaceDirection(true);
          }}
        />

        <Poldadetail
          ref={modalizePolda}
          poldaDetail={{
            poldaDetail: poldaDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setPlaceDirection(true);
          }}
        />

        <Cctvdetail
          ref={modalizeCCTV}
          cctvDetail={{
            cctvDetail: cctvDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setPlaceDirection(true);
          }}
        />

        <Etledetail
          ref={modalizeEtle}
          etleDetail={{
            etleDetail: etleDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setEtleDetailClick(true);
          }}
        />

        <GooglePlacesAutocomplete
          ref={googlePlace}
          enablePoweredByContainer={false}
          styles={{
            container: {
              position: 'absolute',
              top: 10,
              left: 20,
              right: 20,
              justifyContent: 'center',
            },
            textInputContainer: {
              backgroundColor: '#fff',
              // borderColor: 'grey',

              borderRadius: 6,
              width: widthPercentageToDP('90%'),
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 8,
              height: widthPercentageToDP('10%'),
              ...Constanta({
                font: 'regular',
              }),
            },
            textInput: {
              color: '#000',
              fontSize: 16,
              height: widthPercentageToDP('8%'),
              ...Constanta({
                font: 'regular',
              }),
              margin: 5,
            },
          }}
          renderLeftButton={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}>
              <IconCariPeta width={30} height={30} />
            </View>
          )}
          renderRightButton={() => {
            if (googlePlace.current?.getAddressText() != '') {
              return (
                <TouchableOpacity
                  onPress={() => {
                    // console.log(googlePlace.current.getAddressText());
                    googlePlace.current?.setAddressText('');
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}>
                  <CloseModalize width={30} height={30} />
                </TouchableOpacity>
              );
            } else {
              return <></>;
            }
          }}
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          fetchDetails={true}
          placeholder="Cari lokasi"
          renderRow={({description}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                }}>
                <View>
                  <IconLocation />
                </View>
                <View
                  style={{
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    {description}
                  </Text>
                </View>
              </View>
            );
          }}
          onPress={(data, details = null) => {
            // console.log('this is it', data);
            setPlaceId(data.place_id);
            let latLon = [];
            setSearchPlace({
              lat: details?.geometry?.location.lat,
              lon: details?.geometry?.location.lng,
            });
            latLon.push({
              latitude: parseFloat(details?.geometry?.location.lat),
              longitude: parseFloat(details?.geometry?.location.lng),
            });

            setQuerySearchPlace(data);
            // setPlaceDirection(true);
            modalizeDirection.current.open();
          }}
          query={{
            key: 'AIzaSyAk5aBw69zZTlOgfVL5PMkKyhRlx1F30UI',
            language: 'en',
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: heightPercentageToDP('15%'),
            right: widthPercentageToDP('2%'),
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => modalizeRef.current.open()}>
            <IconFilterMap width={60} height={60} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: heightPercentageToDP('25%'),
            right: widthPercentageToDP('5%'),
            backgroundColor: 'white',
            borderRadius: widthPercentageToDP('25%'),
            padding: 8,
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              animateToCamera(mapRef, [
                {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                },
              ]);
            }}>
            <IconTargetMap width={30} height={30} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            top: widthPercentageToDP('45%'),
            right: widthPercentageToDP('5%'),

            backgroundColor: '#ffffff',
            width: widthPercentageToDP('10%'),
            alignItems: 'center',

            justifyContent: 'space-around',
            borderRadius: 10,
            elevation: 20,
          }}>
          <TouchableOpacity
            style={{
              width: widthPercentageToDP('10%'),
              height: widthPercentageToDP('10%'),

              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (mapType == 'satellite') {
                setMapType('standard');
              } else {
                setMapType('satellite');
              }
            }}>
            <IconLayerMap height={25} width={25} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            top: widthPercentageToDP('20%'),
            right: widthPercentageToDP('5%'),

            backgroundColor: '#ffffff',
            width: widthPercentageToDP('10%'),
            height: widthPercentageToDP('20%'),
            alignItems: 'center',

            justifyContent: 'space-around',
            borderRadius: 10,
            elevation: 20,
          }}>
          <TouchableOpacity
            style={{
              width: widthPercentageToDP('10%'),
              height: widthPercentageToDP('10%'),

              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              mapRef.current.getCamera().then(cam => {
                console.log({cam}, mapRef);
                if (Platform.OS === 'ios') {
                  console.log('sini', mapRef.current);
                  setZoom(prev => prev + 10);
                } else {
                  if (cam.zoom) {
                    cam.zoom += 1;
                  } else {
                    cam.zoom = 1;
                  }

                  mapRef.current.animateCamera(
                    {
                      center: {
                        latitude: cam.center.latitude,
                        longitude: cam.center.longitude,
                      },
                      pitch: cam.pitch,
                      heading: cam.heading,
                      altitude: cam.altitude,

                      zoom: cam.zoom,
                    },
                    {duration: 450},
                  );
                }
              });
            }}>
            <IconPlus />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              mapRef.current.getCamera().then(cam => {
                //   cam.zoom -= 1;
                //   mapRef.current.animateCamera(cam);
                // });
                if (cam.zoom) {
                  cam.zoom -= 1;
                } else {
                  cam.zoom = 1;
                }

                mapRef.current.animateCamera(
                  {
                    center: {
                      latitude: cam.center.latitude,
                      longitude: cam.center.longitude,
                    },
                    pitch: cam.pitch,
                    heading: cam.heading,
                    altitude: cam.altitude,

                    zoom: cam.zoom,
                  },
                  {duration: 450},
                );
              });
            }}
            style={{
              width: widthPercentageToDP('10%'),
              height: widthPercentageToDP('10%'),

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconMin />
          </TouchableOpacity>
        </View>
      </View>

      {processFilterMaps ? (
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
          <BlurView
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
          />
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#003A91" />
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
    </BaseContainer>
  );
};
