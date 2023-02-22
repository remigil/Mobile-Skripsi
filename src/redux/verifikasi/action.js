import RNSInfo from 'react-native-sensitive-info';
import {SINFO_SHARED_PREFERENCE_NAME, SINFO_KEYCHAIN_SERVICE} from '@env';
import {VERIF_DATA, VERIF_TAKE_OUT} from './type';

export const verifLogin = verifUser => async dispatch => {
  await RNSInfo.setItem('verifikasi', JSON.stringify({verifUser}), {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: VERIF_DATA, payload: {verifUser}});
};

export const verifTakeOut = () => async dispatch => {
  await RNSInfo.deleteItem('verifikasi', {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: VERIF_TAKE_OUT});
};
