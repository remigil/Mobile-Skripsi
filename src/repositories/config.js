import axios from 'axios';
import Config from 'react-native-config';
import Sinfo from 'react-native-sensitive-info';
import {
  // API_BASE_URL,
  SINFO_SHARED_PREFERENCE_NAME,
  // API_BASE_URL_FILTER,
  API_BASE_URL_TRACK,
  SINFO_KEYCHAIN_SERVICE,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

export const SinfoAttr = {
  sharedPreferencesName: SINFO_SHARED_PREFERENCE_NAME,
  keychainService: SINFO_KEYCHAIN_SERVICE,
};

export const APICONFIG = {
  BASE_URL: 'http://108.136.137.131:3001/v1',
  BASE_URL_TRACK: API_BASE_URL_TRACK,
  AUTH_URL: {
    LOGIN: '/auth-society/login-mobile',
    REGISTER: '/auth-society/register',
    SOCIETY: '/society',
    VALIDATE: '/auth-society/validate_login',
    VALIDATE_REGISTER: '/auth-society/validate_register',
    PROFILE: '/society/logged-user-mobile',
    FORGOT: '/forgot-password/sendtoken',
    VALIDATE_FORGOT: '/forgot-password/validate_token_password',
    RESEND_FORGOT_PASS: '/forgot-password/resend_token_password',
    CHANGE_PASS: '/forgot-password/change_password',
  },
  DIRECTION_ROUTES: '/gmaps-api/direction-custom',
  REVERSE_GOOGLE: '/gmaps-api/reverse-geocode',
  GOOGLE_PLACE: '/gmaps-api/place',
  // CCTV: '/cctv',
  POLDA: '/polda',
  FILTER_SEARCH: '/filter-search',
  NEARBY_GOOGLE: '/gmaps-api/near-by-places',
  TRIPON_URL: {
    GET_MY_VEHICLE: '/public_vehicle/getbysocietyId',
    ADD_VEHICLE: '/public_vehicle/add',
    GET_VEHICLE: '/public_vehicle',
    VEHICLE_TYPE: '/type_vehicle',
    GET_VEHICLE_ID: '/public_vehicle/getId/',
    DELETE_VEHICLE: '/public_vehicle/delete',
    ADD_TRIPON: '/ngawas/add',
    GET_MY_TRIPON: '/ngawas/getbysocietyId',
    SCHEDULE: '/ngawas/schedule',
    HISTORY: '/ngawas/history',
    CHECK_MY_TRIPON: '/ngawas/cekngawas',
  },
  BERITA: '/news',
  // BERITA_STAKEHOLDER: '/news/newsbycategory/',
  // CATEGORY_NEWS: '/category_news',
  GOOGLE_PLACE_PHOTO: '/gmaps-api/placePhotoGoogle',
  PANIC_BUTTON: '/panic-button-umum/add',
  SOSIAL_MEDIA: '/sosmed',
  // PANDUA: '/panduan',
  // FAQ: '/faq',
  WEBVIEW: '/link',
  // STAKEHOLDER: '/stackholder',
  SIDEBAR_URL: {
    GET_SOCIETY: '/society/getbysocietyid',
    SCAN_KTP: '/society/scanktp',
    EDIT_VEHICLE: '/public_vehicle/edit/:',
    EDIT_PHOTO_PROFIL: '/society/editprofil',
  },
  STATISTIK: {
    KECELAKAAN: '/home-statistik/kecelakaan',
    PELANGGARAN: '/home-statistik/pelanggaran',
    SIM: '/home-statistik/sim',
    KENDARAAN: '/home-statistik/kendaraan',
  },
  KEWILAYAHAN: {
    POLDA: '/polda',
    POLRES: '/polres/getPolda/',
    SAMSAT: '/samsat/getPolda/',
    SATPAS: '/satpas/getPolda/',
  },
};

export const ContentType = {
  formData: 'multipart/form-data',
  // urlEncoded: 'application/x-www-form-urlencoded',
  urlEncoded: 'application/json',
  json: 'application/json',
};

export const APIResponse = {
  status: 503,
  success: false,
  message: 'Something went wrong, please try again.',
  data: null,
};

export const httpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  PATCH: 'PATCH',
};

export const API_AUTH_KEY = 'apiAuth';
export const API_PHONE_VALUE = 'no_hp';
export const API_PASSWORD_VALUE = 'password';
export const API_USERNAME = 'person_name';
export const API_EMAIL = 'email';
export const API_NIK = 'nik';

const generateAccessToken = async (attempt, token = null) => {
  const existingToken = await AsyncStorage.getItem(API_AUTH_KEY);
  const no_hp = await Sinfo.getItem(API_PHONE_VALUE, {...SinfoAttr});
  const password = await Sinfo.getItem(API_PASSWORD_VALUE, {...SinfoAttr});

  if (token != null) return token;
  if (
    existingToken !== null &&
    existingToken !== 'null' &&
    existingToken !== ''
  ) {
    let res = await axios({
      url: APICONFIG.BASE_URL + APICONFIG.AUTH_URL.VALIDATE,
      headers: {
        // 'Content-Type': ContentType.urlEncoded,
        Authorization: `${existingToken}`,
      },
      method: 'POST',
    });
    // if (Config.ENV === 'development') console.log({res});
    if (res?.data?.data?.success) {
      return existingToken;
    } else {
      // console.log({res: res.data}, existingToken);
      // console.log('error kesini');
      await Sinfo.deleteItem(API_AUTH_KEY, {...SinfoAttr});
      await AsyncStorage.removeItem(API_AUTH_KEY);
      return await generateAccessToken(attempt);
    }
  } else {
    if (attempt <= 0) return existingToken;

    try {
      let formData = new FormData();

      formData.append('no_hp', no_hp);
      formData.append('password', password);
      // console.log('no_hp', no_hp, 'password', password);
      const opts = {
        url: APICONFIG.BASE_URL + APICONFIG.AUTH_URL.LOGIN,
        data: formData,
        headers: {
          'Content-Type': ContentType.formData,
        },
        method: 'POST',
      };

      const res = await axios(opts);
      if (res?.data?.isSuccess) {
        token = await Sinfo.setItem(API_AUTH_KEY, res?.data?.data.accessToken, {
          ...SinfoAttr,
        });
        await AsyncStorage.setItem(API_AUTH_KEY, res?.data?.data.accessToken);
        return res?.data?.data.accessToken;
      } else {
        return await generateAccessToken(attempt - 1);
      }
    } catch (e) {
      return await generateAccessToken(attempt - 1);
    }
  }
};

export const APISender = async (
  url = null,
  method = 'GET',
  data = null,
  params = null,
  contentType = ContentType.urlEncoded,
  onError = null,
) => {
  const res = APIResponse;

  const accessToken = await generateAccessToken(5);
  // console.log(accessToken);
  let forIOS = {};
  if (Platform.OS == 'android') {
    forIOS = {'Content-Type': contentType};
  } else {
    if (method == 'POST') {
      forIOS = {
        'Content-Type': contentType,
      };
    } else {
      forIOS = {};
    }
  }
  const opts = {
    url,
    data,
    params,
    headers: {
      Authorization: accessToken,
      ...forIOS,
      // 'Content-Type': contentType,
    },
    method,
  };
  // console.log({opts});
  try {
    const apiRes = await axios({
      withCredentials: true,
      // timeout: 10000,
      // timeoutErrorMessage: 'Request has been timeout, please try again later.',
      ...opts,
    });
    // console.log({apiRes}, {url}, 'data terbaru');
    res.status = apiRes?.data?.statusCode ?? 503;
    res.success = apiRes?.data?.isSuccess ?? false;
    res.message = apiRes?.data?.responseMessage
      ? apiRes?.data?.responseMessage
      : apiRes?.data?.error ?? 'Something went wrong, please try again.';
    res.data = apiRes?.data?.data ?? null;
    // if (Config.ENV === 'development') console.log({opts, res});
    if (!res.success && typeof onError === 'function') return onError(res);
    return res;
  } catch (e) {
    // console.log(e.message, 'ini bukan');
    res.status = 503;
    res.success = false;
    res.message = e.message;
    res.data = e;
    // if (Config.ENV === 'development') console.log({opts, res});
    if (onError && typeof onError === 'function') return onError(res);
    return res;
  }
};

export const APISenderBasic = async (
  url = null,
  method = 'GET',
  data = null,
  params = null,
  contentType = ContentType.urlEncoded,
  onError = null,
) => {
  const res = APIResponse;
  // const accessToken = await generateAccessToken(5);
  const opts = {
    url,
    data,
    params,
    headers: {
      // Authorization: `Bearer ${accessToken}`,
      'Content-Type': contentType,
    },
    method,
  };

  try {
    const apiRes = await axios({
      withCredentials: true,
      // timeout: 10000,
      // timeoutErrorMessage: 'Request has been timeout, please try again later.',
      ...opts,
    });
    if (apiRes.data.isSuccess) {
      res.status = apiRes?.data?.statusCode ?? 503;
      res.success = apiRes?.data?.isSuccess ?? false;
      res.message = apiRes?.data?.responseMessage
        ? apiRes?.data?.responseMessage
        : apiRes?.data?.error ?? 'Something went wrong, please try again.';
      res.data = apiRes?.data?.data ?? null;
    } else {
      // console.log(apiRes.data.data.accessToken);
      await AsyncStorage.setItem(API_AUTH_KEY, apiRes.data.data.accessToken);
      res.status = apiRes.data.isSuccess;
      res.success = false;
      res.message = apiRes.data.responseMessage;
      res.data = null;
    }
    if (!res.success && typeof onError === 'function') return onError(res);
    return res;
  } catch ({e}) {
    if (onError && typeof onError === 'function') return onError(res);
    return res;
  }
};
