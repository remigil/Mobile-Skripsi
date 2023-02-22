import {Dimensions} from 'react-native';
export const fitZoomToMarkers = (
  map = null,
  markers = [],
  justUserLocationMarker = false,
  edgePadding = {
    top: 200,
    right: 100,
    bottom: 105,
    left: 50,
  },
) => {
  let latlng = [];

  if (markers.length > 0 && !justUserLocationMarker) {
    markers.forEach((m, i) => {
      latlng.push({latitude: m.latitude, longitude: m.longitude});
    });
  }

  map?.current?.fitToCoordinates(latlng, {
    edgePadding,
  });
};
export const animateToCamera = (
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

  if (markers.length > 0 && !justUserLocationMarker) {
    markers.forEach((m, i) => {
      latlng.push({latitude: m.latitude, longitude: m.longitude});
    });
  }

  map?.current?.animateCamera(
    {
      center: latlng[0],
      altitude: 0,
      heading: 0,
      zoom: 12,
    },
    // 0,
  );
};
