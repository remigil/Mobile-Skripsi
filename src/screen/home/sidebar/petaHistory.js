import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, Image, Text} from 'react-native';
import {BaseContainer} from '../../../component';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {IconDestinasi} from '../../../assets/Assets';
import Constanta from '../../../lib/Constanta';
import {fitZoomToMarkers} from '../../../component/map/FitZoomToMarker';
import Geolocation from 'react-native-geolocation-service';
import Permission from '../../../lib/permission';
import {GetFilterSearch} from '../../../repositories/map';
import Restareadetail from '../../../component/map/modal/restareadetail';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = Math.fround(0.0922);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default props => {
  const {params: paramsData} = props.route;
  console.log('param', paramsData);
  const mapRef = useRef(MapView);
  const modalizeRef = useRef();
  const handleOpen = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };

  useEffect(() => {
    handleOpen();
  }, []);

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const [filterFieldReq, setFilterFieldReq] = useState('rest_area');
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [searchPlace, setSearchPlace] = useState({
    lat: null,
    lon: null,
  });
  const [restArea, setRestArea] = useState([]);

  useEffect(() => {
    GetFilterSearch({
      filter: filterFieldReq,
      coordinate: `${userLocation.latitude},${userLocation.longitude}`,
      radius: 2000,
      type: 'mosque,school,cafe,hospital,lodging,restaurant,tourist_attraction,fire_station,shopping_mall',
    })
      .then(async data => {
        // console.log(data);
        let LatLon = [];
        if (data?.data?.rest_area?.length) {
          data?.data?.rest_area.forEach(restAreaData => {
            LatLon.push({
              latitude: parseFloat(restAreaData.fasum_lat),
              longitude: parseFloat(restAreaData.fasum_lng),
            });
          });
          setRestArea(data?.data?.rest_area);
        } else {
          setRestArea([]);
        }
        // fitZoomToMarkers(mapRef, LatLon);
        // console.log({filterDatanya: data});
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => {});
  }, []);

  const modalizeRestArea = useRef(null);
  const [restAreaDetailClick, setRestAreaDetailClick] = useState({});
  const [placeDirection, setPlaceDirection] = useState(false);

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Map Bogor Ngawas',
        backIconStyle: true,
        titleStyle: {
          color: 'white',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
          ...Constanta({
            font: 'bold',
          }),
        },
        onBackPressed: () => {
          props.navigation.jumpTo('historyngawas');
          //   props.navigation.goBack();
        },
      }}>
      <View
        style={{
          flex: 1,
        }}>
        {/* <Text>{JSON.stringify(paramsData.koorA)}</Text> */}
        <View
          style={{
            flex: 1,
          }}>
          <MapView
            style={StyleSheet.absoluteFill}
            // initialRegion={fromCoords}
            onMapReady={() => {
              fitZoomToMarkers(mapRef, paramsData.route);
            }}
            ref={mapRef}>
            <Marker coordinate={paramsData.route[0]} />
            <Marker coordinate={paramsData.route[paramsData.route.length - 1]}>
              <View>
                <IconDestinasi />
              </View>
            </Marker>
            <Polyline
              coordinates={paramsData.route}
              strokeColor={'blue'}
              // strokeColors={'red'}
              // style={stylePolyline}
              strokeWidth={4}
            />
            {restArea.map(restAreaData => (
              <Marker
                coordinate={{
                  latitude: parseFloat(restAreaData.fasum_lat),
                  longitude: parseFloat(restAreaData.fasum_lng),
                }}
                onPress={() => {
                  setRestAreaDetailClick(restAreaData);
                  modalizeRestArea.current.open();
                  handleClose();
                }}
                pinColor={'#01796F'}
                key={'user-restarea-marker' + restAreaData.id + new Date()}>
                <Image
                  style={{
                    height: responsiveHeight(6),
                    width: responsiveWidth(7),
                  }}
                  resizeMode="contain"
                  source={require('../../../assets/peta/rest_area.png')}
                />
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
                  origin={paramsData.route[0]}
                  mode="DRIVING"
                  destination={{
                    latitude: searchPlace.lat,
                    longitude: searchPlace.lon,
                  }}
                  language="en"
                  strokeWidth={5}
                  strokeColor="#000000"
                  apikey={'AIzaSyAEY9jbE_zL8SV7c6meCf7-lV3JLcbKnlY'}
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
        </View>
        <View
          style={{
            position: 'absolute',
            padding: 10,
            backgroundColor: '#fff',
            justifyContent: 'center',
            flex: 1,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(5),
          }}>
          <Text
            style={{
              ...Constanta({
                font: 'bold',
              }),
              color: '#4e4e4e',
            }}>
            Estismasi Perjalanan
          </Text>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...Constanta({
                  font: 'semibold',
                }),
                color: '#32CD32',
              }}>
              {paramsData.duration}
              <Text
                style={{
                  ...Constanta({
                    font: 'semibold',
                  }),
                  color: '#4E4E4E',
                }}>
                ({paramsData.distance})
              </Text>
            </Text>
          </View>
        </View>

        <Restareadetail
          ref={modalizeRestArea}
          restAreaDetail={{
            restAreaDetail: restAreaDetailClick,
          }}
          direction={coordinate => {
            setSearchPlace({
              lat: coordinate.latitude,
              lon: coordinate.longitude,
            });

            setPlaceDirection(true);
          }}
        />
        {/* <Portal>
<Modalize
ref={modalizeRef}
withHandle={false}
alwaysOpen={responsiveHeight(15)}
HeaderComponent={
  <View
    style={{
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingVertical: widthPercentageToDP('3%'),
    }}>
    <Text
      style={{
        color: '#4E4E4E',
        fontSize: widthPercentageToDP('5%'),
        ...Constanta({
          font: 'bold',
        }),
      }}>
      Estismasi Perjalanan
    </Text>
  </View>
}
modalStyle={{
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
}}>
<View
  style={{
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(5),
  }}>
  <Text
    style={{
      fontSize: responsiveFontSize(2.6),
      ...Constanta({
        font: 'semibold',
      }),
      color: '#32CD32',
    }}>
    {paramsData.duration}
    <Text
      style={{
        fontSize: responsiveFontSize(2.6),
        ...Constanta({
          font: 'semibold',
        }),
        color: '#4E4E4E',
      }}>
      {' '}
      ({paramsData.distance})
    </Text>
  </Text>
</View>
</Modalize>
</Portal> */}
      </View>
    </BaseContainer>
  );
};
