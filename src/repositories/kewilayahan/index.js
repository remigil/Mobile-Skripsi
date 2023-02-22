import {
  APICONFIG,
  APIResponse,
  ContentType,
  httpMethod,
  APISender,
} from '../config';

export const GetPolda = async () => {
  try {
    let getKecelakaan = await APISender(
      APICONFIG.BASE_URL + APICONFIG.KEWILAYAHAN.POLDA,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getKecelakaan;
  } catch (error) {
    return APIResponse;
  }
};
export const GetPolresPerPolda = async id => {
  try {
    let getKecelakaan = await APISender(
      APICONFIG.BASE_URL + APICONFIG.KEWILAYAHAN.POLRES + id,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getKecelakaan;
  } catch (error) {
    return APIResponse;
  }
};

export const GetSamsatPerPolda = async id => {
  try {
    let getKecelakaan = await APISender(
      APICONFIG.BASE_URL + APICONFIG.KEWILAYAHAN.SAMSAT + id,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getKecelakaan;
  } catch (error) {
    return APIResponse;
  }
};

export const GetSatpastPerPolda = async id => {
  try {
    let getKecelakaan = await APISender(
      APICONFIG.BASE_URL + APICONFIG.KEWILAYAHAN.SATPAS + id,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getKecelakaan;
  } catch (error) {
    return APIResponse;
  }
};
