import {
  APICONFIG,
  APIResponse,
  ContentType,
  httpMethod,
  APISender,
} from '../config';

export const GetBerita = async () => {
  try {
    let getBerita = await APISender(
      APICONFIG.BASE_URL + APICONFIG.BERITA,
      httpMethod.GET,
      null,
      // berita,
      ContentType.json,
    );
    return getBerita;
  } catch (e) {
    return APIResponse;
  }
};

export const GetCategoryBerita = async () => {
  try {
    let getCategoryBerita = await APISender(
      APICONFIG.BASE_URL + APICONFIG.CATEGORY_NEWS,
      httpMethod.GET,
      null,
      // berita,
      ContentType.json,
    );
    return getCategoryBerita;
  } catch (e) {
    return APIResponse;
  }
};

export const GetBeritaStakeholder = async () => {
  try {
    // console.log(
    //   'id berita nihhh yaaaa',
    //   APICONFIG.BASE_URL + APICONFIG.BERITA_STAKEHOLDER + id,
    // );
    let getBeritaStakehoder = await APISender(
      APICONFIG.BASE_URL +
        APICONFIG.BERITA_STAKEHOLDER +
        'VTJGc2RHVmtYMTl6NjE5cEhXYUJDbUV5aTd0RFk0Q01leDVwbUZqT2IyRT0',
      httpMethod.GET,
      null,
      // null,
      ContentType.json,
      res => res,
    );
    return getBeritaStakehoder;
  } catch (error) {
    return APIResponse;
  }
};

// export const GetBangsat = async () => {
//   try {
//     // console.log(
//     //   'id berita nihhh yaaaa',
//     //   APICONFIG.BASE_URL + APICONFIG.BERITA_STAKEHOLDER + id,
//     // );
//     let getbangsat = await APISender(
//       APICONFIG.BASE_URL + APICONFIG.STACKHOLDER.BERITA_STAKEHOLDER,
//       httpMethod.GET,
//       null,
//       null,
//       ContentType.json,
//       res => res,
//     );
//     return getbangsat;
//   } catch (error) {
//     return APIResponse;
//   }
// };






