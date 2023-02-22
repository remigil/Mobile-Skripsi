import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './auth';
import {persistStore, persistCombineReducers} from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import {SINFO_SHARED_PREFERENCE_NAME, SINFO_KEYCHAIN_SERVICE} from '@env';
import {createLogger} from 'redux-logger';
import {locationReducer} from './location.js/reducer';
import {trackReducer} from './tracking';
import {pointingReducer} from './pointing';
import {verifikasiReducer} from './verifikasi/reducer';

const storage = createSensitiveStorage({
  keychainService: SINFO_KEYCHAIN_SERVICE,
  sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
});

const config = {
  key: 'root',
  storage,
};
const reducer = persistCombineReducers(config, {
  auth: authReducer,
  trackData: trackReducer,
  locationData: locationReducer,
  pointingData: pointingReducer,
  verifUserData: verifikasiReducer,
});

export default () => {
  const store = createStore(reducer, applyMiddleware(thunk, createLogger()));
  const persistor = persistStore(store);
  return {store, persistor};
};
