import RNSInfo from 'react-native-sensitive-info';
import {SINFO_SHARED_PREFERENCE_NAME, SINFO_KEYCHAIN_SERVICE} from '@env';
import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_LOGIN_GOOGLE} from './type';

export const authLogin = userData => async dispatch => {
  await RNSInfo.setItem('userData', JSON.stringify({userData}), {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: AUTH_LOGIN, payload: {userData}});
};
export const authLoginGoogle = userData => async dispatch => {
  await RNSInfo.setItem('userData', JSON.stringify({userData}), {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: AUTH_LOGIN_GOOGLE, payload: {userData}});
};

export const AuthRegister = userData => async dispatch => {
  await RNSInfo.setItem('userData', JSON.stringify({userData}), {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: AUTH_REGISTER, payload: {userData}});
};

export const authLogout = () => async dispatch => {
  await RNSInfo.deleteItem('userData', {
    sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
    keychainService: SINFO_KEYCHAIN_SERVICE,
  });
  dispatch({type: AUTH_LOGOUT});
};
