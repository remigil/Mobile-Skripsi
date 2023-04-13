import {
  APICONFIG,
  APIResponse,
  APISender,
  ContentType,
  httpMethod,
} from '../config';

// export const GetKTP = async () => {
//   try {
//     let getKtp = await APISender(
//       APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.SCAN_KTP_ID,
//       httpMethod.GET,
//       null,
//       null,
//       ContentType.urlEncoded,
//       res => res,
//     );
//     // console.log({getListVehicle});
//     return getKtp;
//   } catch (error) {
//     return APIResponse;
//   }
// };

// export const GetFAQ = async (filter = {}) => {
//   try {
//     let getFaq = await APISender(
//       APICONFIG.BASE_URL + APICONFIG.FAQ,
//       httpMethod.GET,
//       null,
//       filter,
//       ContentType.formData,
//       // res => res,
//     );
//     // console.log({getListVehicle});
//     return getFaq;
//   } catch (e) {
//     return APIResponse;
//   }
// };

// export const ScanKtp = async ({ktp}) => {
//   try {
//     let formData = new FormData();
//     formData.append('foto', {
//       ...ktp,
//       name: ktp?.fileName,
//     });
//     // console.log(APICONFIG.BASE_URL + APICONFIG.PANIC_BUTTON);
//     return await APISender(
//       APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.SCAN_KTP,
//       httpMethod.POST,
//       formData,
//       null,
//       ContentType.formData,
//       res => res,
//     );
//   } catch (e) {
//     console.log(e.message);
//     return APIResponse;
//   }
// };

export const EditKendaraan = async ({id, no_vehicle, brand_id, type_id}) => {
  try {
    let formData = new FormData();
    console.log(id);
    formData.append('no_vehicle', no_vehicle);
    formData.append('brand_id', brand_id);
    formData.append('type_id', type_id);
    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.EDIT_VEHICLE + id,
      httpMethod.PUT,
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

export const KendaraanId = async id => {
  try {
    console.log(id);
    let getKendaraanId = await APISender(
      APICONFIG.BASE_URL + APICONFIG.TRIPON_URL.GET_VEHICLE_ID + id,
      httpMethod.GET,
      null,
      null,
      ContentType.formData,
    );
    return getKendaraanId;
  } catch (e) {
    return APIResponse;
  }
};

export const GetFotoProfil = async () => {
  try {
    let getFoto = await APISender(
      APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.GET_SOCIETY,
      httpMethod.GET,
      null,
      null,
      ContentType.urlEncoded,
      res => res,
    );
    return getFoto;
  } catch (error) {
    return APIResponse;
  }
};

// export const SubmitKTP = async dataaa => {
//   console.log('ktp nih ihh', dataaa);
//   try {
//     // const formData = new FormData();
//     // let namaKTP = ktp.fileName;
//     // let uri = ktp.uri;
//     // let type = ktp.type;
//     // formData.append('ktp', {
//     //   // namaKTP,
//     //   uri,
//     //   // type,
//     // });
//     // // console.log(
//     // //   'Edit Profil nihh',
//     // //   APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.EDIT_PHOTO_PROFIL,
//     // // );
//     return await APISender(
//       APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.SCAN_KTP,
//       httpMethod.POST,
//       dataaa.fileName,
//       null,
//       ContentType.formData,
//       res => res,
//     );
//   } catch (e) {
//     console.log(e.message);
//     return APIResponse;
//   }
// };

export const ScanKTP = async ({foto}) => {
  console.log('scannn nih ihh', foto);
  try {
    const formData = new FormData();
    let name = foto.fileName;
    // let uri = foto.uri;
    let type = foto.type;
    formData.append('foto', {
      name,
      // uri,
      type,
    });
    console.log('form data yaa', formData);
    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.SCAN_KTP,
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

export const SubmitProfil = async ({foto}) => {
  console.log('foto nih ihh', foto);
  try {
    const formData = new FormData();
    let name = foto.fileName;
    let uri = foto.uri;
    let type = foto.type;
    formData.append('foto', {
      name,
      uri,
      type,
    });
    console.log('form data yaa', formData);
    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.SIDEBAR_URL.EDIT_PHOTO_PROFIL,
      httpMethod.PUT,
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
