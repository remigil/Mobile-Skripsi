import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class Location {
  static getCurrentLocation = (
    enableHighAccuracy = true,
    watch = {
      forceRequestLocation: true,
      forceLocationManager: false,
      showLocationDialog: false,
      useSignificantChanges: false,
      enableHighAccuracy: true,
    },
  ) =>
    new Promise((resolve, reject) => {
      let AndroidPerms = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ];
      let IOSPerms = [
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
      ];

      requestMultiple(Platform.OS == 'android' ? AndroidPerms : IOSPerms)
        .then(checkPerms => {
          let isPermsGranted = false;
          Object.keys(checkPerms).forEach(k => {
            if (!isPermsGranted)
              isPermsGranted = checkPerms[k] == RESULTS.GRANTED;
          });

          if (isPermsGranted) {
            Geolocation.getCurrentPosition(
              position => {
                resolve(position);
              },
              error => {
                reject(error);
              },
              {
                enableHighAccuracy: enableHighAccuracy,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 2000,
                forceRequestLocation: watch.forceRequestLocation,
                forceLocationManager: watch.forceLocationManager,
                showLocationDialog: watch.showLocationDialog,
                useSignificantChanges: watch.useSignificantChanges,
              },
            );
          } else {
            reject({message: 'Permission not granted!'});
          }
        })
        .catch(error => reject(error));
    });
  static getWatchId = (
    watch = {
      forceRequestLocation: true,
      forceLocationManager: false,
      showLocationDialog: false,
      useSignificantChanges: false,
      enableHighAccuracy: true,
    },
  ) => {
    new Promise((resolve, reject) => {
      Geolocation.watchPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: watch.enableHighAccuracy,
          distanceFilter: 0,
          interval: 5000,
          fastestInterval: 2000,
          forceRequestLocation: watch.forceRequestLocation,
          forceLocationManager: watch.forceLocationManager,
          showLocationDialog: watch.showLocationDialog,
          useSignificantChanges: watch.useSignificantChanges,
        },
      );
    });
  };
}

export default Location;
