import RNSInfo from 'react-native-sensitive-info';
import {SINFO_SHARED_PREFERENCE_NAME, SINFO_KEYCHAIN_SERVICE} from '@env';
import {LOCATION_AKTIF, LOCATION_NONAKTIF} from './type';

export const locationAktif = location => async dispatch => {
  await RNSInfo.setItem('location', JSON.stringify({location}), {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: LOCATION_AKTIF, payload: {location}});
};

export const locationNonAktif = () => async dispatch => {
  await RNSInfo.deleteItem('location', {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: LOCATION_NONAKTIF});
};
