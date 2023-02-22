import {
  APICONFIG,
  APIResponse,
  ContentType,
  httpMethod,
  APISender,
} from '../config';

export const GetNearByGoogle = async (filter = {}) => {
  try {
    let getProfile = await APISender(
      APICONFIG.BASE_URL + APICONFIG.NEARBY_GOOGLE,
      httpMethod.GET,
      null,
      filter,
      ContentType.json,
    );
    return getProfile;
  } catch (e) {
    return APIResponse;
  }
};
export const GetFilterSearch = async (filter = {}) => {
  try {
    let getProfile = await APISender(
      APICONFIG.BASE_URL + APICONFIG.FILTER_SEARCH,
      httpMethod.GET,
      null,
      filter,
      ContentType.json,
    );
    // console.log(getProfile, 'profile');
    return getProfile;
  } catch (e) {
    return APIResponse;
  }
};
export const GetGooglePlace = async (filter = {}) => {
  try {
    let getProfile = await APISender(
      APICONFIG.BASE_URL + APICONFIG.GOOGLE_PLACE,
      httpMethod.GET,
      null,
      filter,
      ContentType.json,
    );
    return getProfile;
  } catch (e) {
    return APIResponse;
  }
};
export const GetDirectionMaps = async (filter = {}) => {
  try {
    let getProfile = await APISender(
      APICONFIG.BASE_URL + APICONFIG.DIRECTION_ROUTES,
      httpMethod.GET,
      null,
      filter,

      ContentType.json,
    );
    return getProfile;
  } catch (e) {
    return APIResponse;
  }
};

export const GetPhotoPlaceReference = async photo_reference => {
  try {
    let getProfile = await APISender(
      APICONFIG.BASE_URL +
        APICONFIG.GOOGLE_PLACE_PHOTO +
        '?photo_reference=' +
        photo_reference,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
    );
    return getProfile;
  } catch (e) {
    return APIResponse;
  }
};

export const ReverseGeoCode = async ({latitude, longitude}) => {
  try {
    let formData = new FormData();
    formData.append('lat', latitude);
    formData.append('lng', longitude);

    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.REVERSE_GOOGLE,
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
// export const GetProfile = async (filter = {}) => {
//   try {
//     let getProfile = await APISender(
//       APICONFIG.BASE_URL + APICONFIG.PROFILE_OFFICER_TRACK,
//       httpMethod.GET,
//       null,
//       filter,
//       ContentType.json,
//     );
//     return getProfile;
//   } catch (e) {
//     return APIResponse;
//   }
// };
