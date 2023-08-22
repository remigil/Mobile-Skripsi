import Sinfo from 'react-native-sensitive-info';
import {
  APICONFIG,
  APIResponse,
  APISender,
  ContentType,
  httpMethod,
} from '../config';

export const AddVehicle = async ({no_vehicle, brand_id, type_id}) => {
  try {
    let formData = new FormData();
    formData.append('no_vehicle', no_vehicle);
    formData.append('brand_id', brand_id);
    formData.append('type_id', type_id);
    // console.log({no_vehicle, brand_id, type_id});
    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.ADD_VEHICLE,
      httpMethod.POST,
      formData,
      null,
      ContentType.formData,
      res => res,
    );
  } catch (e) {
    console.log(e.message);
    return APIResponse;
  }
};

export const GetJenisMerk = async () => {
  try {
    // console.log({url: APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.VEHICLE_TYPE});
    let getListVehicle = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.VEHICLE_TYPE,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      // res=>res
    );
    // console.log({getListVehicle});
    return getListVehicle;
  } catch (error) {
    return APIResponse;
  }
};
export const GetKendaraan = async () => {
  try {
    let getListVehicle = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.GET_MY_VEHICLE,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    // console.log({getListVehicle});
    return getListVehicle;
  } catch (error) {
    return APIResponse;
  }
};

export const GetKendaraanId = async id => {
  try {
    let getVehicleId = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.GET_VEHICLE_ID + id,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
    );
    return getVehicleId;
  } catch (e) {
    return APIResponse;
  }
};

export const DeleteKendaraan = async id => {
  try {
    let formData = new FormData();
    formData.append('id', id);
    let getListVehicle = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.DELETE_VEHICLE,
      httpMethod.DELETE,
      formData,

      null,
      ContentType.formData,
      res => res,
    );
    // console.log({getListVehicle});
    return getListVehicle;
  } catch (error) {
    return APIResponse;
  }
};

export const AddNgawas = async data => {
  try {
    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.ADD_TRIPON,
      httpMethod.POST,
      data,
      null,
      ContentType.json,
      res => res,
    );
  } catch (e) {
    console.log(e.message);
    return APIResponse;
  }
};
export const NgawasUpdate = async data => {
  try {
    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.SCHEDULE_TO_HISTORY,
      httpMethod.PUT,
      data,
      null,
      ContentType.json,
      res => res,
    );
  } catch (e) {
    console.log(e.message);
    return APIResponse;
  }
};

export const GetNgawaS = async () => {
  try {
    let getListVehicle = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.SCHEDULE,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    // console.log({getListVehicle});
    return getListVehicle;
  } catch (error) {
    return APIResponse;
  }
};

export const GetNgawasHistory = async () => {
  try {
    let getListVehicle = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.HISTORY,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    // console.log({getListVehicle});
    return getListVehicle;
  } catch (error) {
    return APIResponse;
  }
};

export const CheckMyNgawas = async () => {
  try {
    let getListVehicle = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.CHECK_MY_TRIPON,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    // console.log({getListVehicle});
    return getListVehicle;
  } catch (error) {
    return APIResponse;
  }
};
