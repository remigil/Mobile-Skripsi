import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CloseModalize, IconLocation, IconSearch} from '../../../assets/Assets';
import {BaseContainer} from '../../../component';
import MapView, {Marker} from 'react-native-maps';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {animateToCamera} from '../../../component/map/FitZoomToMarker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Portal} from 'react-native-portalize';
import Constanta from '../../../lib/Constanta';
import {ReverseGeoCode} from '../../../repositories/map';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = parseFloat(0.0922);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default props => {
  const {params: paramsData} = props.route;
  // console.log({paramsData});
  const modalizeRef = useRef(null);
  const googlePlace = useRef(null);
  const mapRef = useRef(null);
  const handleOpen = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };
  const [searchPlace, setSearchPlace] = useState({
    latitude: null,
    longitude: null,
  });

  // const pointingData = useSelector(state => state.pointingData);
  useEffect(() => {
    handleOpen();
  }, []);

  const dispatch = useDispatch();

  const [mapType, setMapType] = useState('standard');
  const [openHandleHeight, setOpenHandleHeight] = useState(false);
  const [handleHeight, setHandleHeight] = useState(responsiveHeight(30));
  const [querySearchPlace, setQuerySearchPlace] = useState({});

  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [address, setAddress] = useState(null);

  const getAlamat = useEffect(() => {
    if (isSearch) {
      ReverseGeoCode(searchPlace)
        .then(addressData => {
          // console.log({address});
          if (addressData.success) {
            setAddress(addressData.message);
          }
        })
        .catch(() => {})
        .finally(() => {
          setIsSearch(false);
          setIsLoading(false);
        });
    }
  }, [isSearch]);
  const [marking, setMarking] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setHandleHeight(responsiveHeight(100));
      },
    );

    return () => {
      // keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Peta',
        backIconStyle: true,
        titleStyle: {
          color: '#FFF',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          // props.navigation.navigate('tripon.pratinjau');
          props.navigation.goBack();
        },
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <MapView
          ref={mapRef}
          // provider={
          //   Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          // }
          mapType={mapType}
          zoomEnabled={true}
          onPress={async e => {
            setSearchPlace({
              latitude: parseFloat(e.nativeEvent.coordinate.latitude),
              longitude: parseFloat(e.nativeEvent.coordinate.longitude),
            });
            setIsSearch(true);
            setIsLoading(true);
            setMarking(true);
          }}
          region={{
            latitude: -6.595038,
            longitude: 106.816635,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          style={{
            flex: 1,
          }}>
          {marking && (
            <Marker
              coordinate={{
                latitude: searchPlace.latitude,
                longitude: searchPlace.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            />
          )}
        </MapView>
        <Portal>
          <Modalize
            ref={modalizeRef}
            withHandle={false}
            alwaysOpen={handleHeight}
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
                  {paramsData.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: widthPercentageToDP('1%'),
                    alignItems: 'center',
                    paddingHorizontal: widthPercentageToDP('2%'),
                    borderRadius: 4,
                    marginTop: widthPercentageToDP('2%'),
                  }}>
                  <GooglePlacesAutocomplete
                    minLength={2}
                    ref={googlePlace}
                    enablePoweredByContainer={false}
                    styles={{
                      container: {
                        justifyContent: 'center',
                      },
                      textInputContainer: {
                        backgroundColor: '#fff',

                        borderWidth: 0.7,
                        borderRadius: 10,

                        borderColor: '#808080',
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 2,
                        height: widthPercentageToDP('10%'),
                      },
                      textInput: {
                        color: '#000',
                        fontSize: 16,
                        height: widthPercentageToDP('8%'),
                        margin: 5,
                      },
                      separator: {
                        height: 0.5,
                        backgroundColor: '#c8c7cc',
                      },
                    }}
                    renderLeftButton={() => {
                      return (
                        <View
                          style={{
                            marginLeft: 5,
                          }}>
                          <IconSearch
                            width={widthPercentageToDP('7%')}
                            height={widthPercentageToDP('7%')}
                          />
                        </View>
                      );
                    }}
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
                          <View style={{marginLeft: 10}}>
                            <Text>{description}</Text>
                          </View>
                        </View>
                      );
                    }}
                    onPress={(data, details = null) => {
                      // console.log({data, details});
                      setAddress(data.description);
                      // console.log('ini detail', data.description);
                      let latLon = [];
                      setSearchPlace({
                        latitude: details?.geometry?.location.lat,
                        longitude: details?.geometry?.location.lng,
                      });
                      latLon.push({
                        latitude: parseFloat(details?.geometry?.location.lat),
                        longitude: parseFloat(details?.geometry?.location.lng),
                      });
                      animateToCamera(mapRef, latLon);
                      // setDescription(data.description);

                      setHandleHeight(responsiveHeight(38));

                      setQuerySearchPlace(data);
                      setMarking(true);
                    }}
                    query={{
                      key: 'AIzaSyAk5aBw69zZTlOgfVL5PMkKyhRlx1F30UI',
                      language: 'en',
                    }}
                  />
                </View>
              </View>
            }
            modalStyle={{
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              // marginBottom: responsiveHeight(7),
            }}>
            <View
              style={{
                marginHorizontal: 15,
                flex: 1,
                borderColor: '#D0E3FF',
                backgroundColor: '#D0E3FF',
                borderWidth: 1,
                flexDirection: 'row',
                borderRadius: 10,
                paddingHorizontal: widthPercentageToDP('2%'),
              }}>
              <View
                style={{
                  paddingVertical: widthPercentageToDP('3%'),
                }}>
                <IconLocation width={30} height={30} />
              </View>
              <View
                style={{
                  padding: widthPercentageToDP('2%'),
                }}>
                <Text
                  style={{
                    color: '#4E4E4E',
                    ...Constanta({
                      font: 'bold',
                    }),
                    fontSize: widthPercentageToDP('5%'),
                  }}>
                  {/* Titik Lokasi Tujuan */}
                  {paramsData.title}
                  {/* {JSON.stringify(searchPlace)} */}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: widthPercentageToDP('80%'),
                  }}>
                  {searchPlace.latitude == null ? (
                    <Text>Lokasi belum dipilih</Text>
                  ) : (
                    <>
                      {isLoading ? (
                        <ActivityIndicator />
                      ) : (
                        <Text
                          style={{
                            fontSize: widthPercentageToDP('4%'),
                            flex: 1,
                            flexWrap: 'wrap',
                            ...Constanta({
                              font: 'regular',
                            }),
                          }}>
                          {address ? address : ''}
                          {/* {searchPlace.latitude + ',' + searchPlace.longitude} */}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              </View>
            </View>
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: widthPercentageToDP('90%'),
                height: 46,
                backgroundColor: '#01796F',
                marginHorizontal: widthPercentageToDP('5%'),
                borderRadius: 5,
                marginTop: 20,
              }}
              onPress={() => {
                console.log({
                  // [paramsData.code]: searchPlace,
                  [paramsData.code]: address,
                });
                // props.navigation.navigate('tripon.tanggalKeberangkatan');
                props.navigation.navigate({
                  name: 'tripon.tanggalKeberangkatan',
                  params: {
                    [paramsData.code]: searchPlace,
                    [paramsData.code + 'ss']: address,
                  },
                  merge: true,
                });
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  ...Constanta({
                    font: 'semibold',
                  }),
                }}>
                Tetapkan
              </Text>
            </Pressable>
          </Modalize>
        </Portal>
      </View>
    </BaseContainer>
  );
};
const s = StyleSheet.create({
  content: {
    alignItems: 'center',
  },

  content__icon: {
    width: 32,
    height: 32,
    marginBottom: 20,
  },
});
