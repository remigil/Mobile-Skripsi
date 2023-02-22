import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  // Permission,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MapView from 'react-native-map-clustering';
import MapCustomTile, {
  MODE_ESRI_HYBRID,
  MODE_ESRI_SATELLITE,
  MODE_ORS_ROADS,
} from '../../lib/MapCustomTile';

export const VARIABLE_MAPVIEW = {
  ref: null,
  mapType: MODE_ORS_ROADS.id,
  mapMode: MODE_ORS_ROADS,
  containerStyle: {
    width: Dimensions.get('window').width,
    height: heightPercentageToDP('105%'),
    flex: 1,
  },
  //   provider: null,
  initialRegion: {
    latitude: -6.117664,
    longitude: 106.906349,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
  zoomControlEnabled: false,
  zoomEnabled: true,
  maxZoomLevel: 19,
  maxZoom: 15,
  zoomTapEnabled: false,
  onLongPress: null,
  onPress: null,
  clusteringEnabled: false,
  pitchEnabled: true,
  rotateEnabled: false,
  animationEnabled: false,
  onRegionChangeComplete: null,
};

export default (
  props = {
    ...VARIABLE_MAPVIEW,
    ...props,
  },
) => {
  return (
    <MapView
      ref={props.ref}
      region={props.initialRegion}
      mapType={props.mapType}
      onPress={event => props.onPress && props.onPress(event)}
      style={{
        ...props.containerStyle,
      }}
      provider={props.provider}
      //   initialRegion={this.state.region}
      zoomControlEnabled={props.zoomControlEnabled}
      zoomEnabled={props.zoomEnabled}
      maxZoomLevel={props.maxZoomLevel}
      maxZoom={props.maxZoom}
      zoomTapEnabled={props.zoomTapEnabled}
      //   onLongPress={this._getAddressFromLatLng}
      clusteringEnabled={props.clusteringEnabled}
      pitchEnabled={props.pitchEnabled}
      rotateEnabled={props.rotateEnabled}
      animationEnabled={props.animationEnabled}
      onRegionChangeComplete={event =>
        props.onRegionChangeComplete && props.onRegionChangeComplete(event)
      }
      showsUserLocation={true}>
      {props.children}
      <MapCustomTile mode={props.mapMode} />
    </MapView>
  );
};
