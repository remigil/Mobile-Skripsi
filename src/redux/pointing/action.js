import RNSInfo from 'react-native-sensitive-info';
import {SINFO_SHARED_PREFERENCE_NAME, SINFO_KEYCHAIN_SERVICE} from '@env';
import {POINTING_AKTIF, POINTING_NONAKTIF} from './type';

export const pointingLocation = pointing => async dispatch => {
  await RNSInfo.setItem('pointing', JSON.stringify({pointing}), {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: POINTING_AKTIF, payload: {pointing}});
};

export const deletePointingLocation = () => async dispatch => {
  await RNSInfo.deleteItem('pointing', {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: POINTING_NONAKTIF});
};
