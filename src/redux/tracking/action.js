import RNSInfo from 'react-native-sensitive-info';
import {SINFO_SHARED_PREFERENCE_NAME, SINFO_KEYCHAIN_SERVICE} from '@env';
import {TRACK_AKTIF, TRACK_NONAKTIF} from './type';

export const trackAktif = track => async dispatch => {
  await RNSInfo.setItem('track', JSON.stringify({track}), {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: TRACK_AKTIF, payload: {track}});
};

export const trackNonAktif = () => async dispatch => {
  await RNSInfo.deleteItem('track', {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: TRACK_NONAKTIF});
};
