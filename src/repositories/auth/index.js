import {
  APICONFIG,
  APIResponse,
  APISender,
  APISenderBasic,
  API_PASSWORD_VALUE,
  API_PHONE_VALUE,
  API_email,
  API_person_name,
  API_id_google,
  ContentType,
  httpMethod,
  SinfoAttr,
} from '../config';
import Sinfo from 'react-native-sensitive-info';

export const AuthLogin = async (no_hp, password) => {
  try {
    let formData = new FormData();
    formData.append('no_hp', no_hp);
    formData.append('password', password);
    await Sinfo.setItem(API_PHONE_VALUE, no_hp, {
      ...SinfoAttr,
    });
    await Sinfo.setItem(API_PASSWORD_VALUE, password, {
      ...SinfoAttr,
    });

    return await APISenderBasic(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.LOGIN,
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
export const LoginGoogle = async () => {
  try {
    return await APISenderBasic(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.LOGIN_GOOGLE,
      httpMethod.POST,
      null,
      null,
      ContentType.json,
      res => res,
    );
  } catch (e) {
    console.log(e.message);
    return APIResponse;
  }
};
// export const LoginGoogle = async (email, person_name, id_google) => {
//   try {
//     let formData = new FormData();
//     formData.append('email', email);
//     formData.append('name', person_name);
//     formData.append('uid', id_google);
//     await Sinfo.setItem(API_email, email, {
//       ...SinfoAttr,
//     });
//     await Sinfo.setItem(API_person_name, person_name, {
//       ...SinfoAttr,
//     });
//     await Sinfo.setItem(API_id_google, id_google, {
//       ...SinfoAttr,
//     });

//     return await APISenderBasic(
//       APICONFIG.BASE_URL + APICONFIG.AUTH_URL. LOGIN_GOOGLE,
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

export const AuthRegister = async (no_hp, password, nama, email) => {
  try {
    // console.log(formData, 'formdata');
    let formData = new FormData();
    // console.log(formData, 'formdata');
    formData.append('no_hp', no_hp);
    formData.append('password', password);
    formData.append('person_name', nama);
    formData.append('email', email);
    // formData.append('nik', nik);

    return await APISenderBasic(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.REGISTER,
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

export const ForgetPassword = async email => {
  try {
    let formData = new FormData();
    formData.append('email', email);

    return await APISenderBasic(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.FORGOT,
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

export const GetProfileData = async () => {
  try {
    let getProfileData = await APISender(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.PROFILE,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
    );
    // console.log({getProfileData});
    return getProfileData;
  } catch (e) {
    return APIResponse;
  }
};

export const TokenVerifikasi = async ({no_hp, token}) => {
  try {
    let formData = new FormData();
    // console.log(formData, 'formdata');
    formData.append('no_hp', no_hp);
    formData.append('token', token);

    let tokenVerifikasi = await APISender(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.VALIDATE_REGISTER,
      httpMethod.POST,
      formData,
      null,
      ContentType.formData,
      res => res,
    );
    // console.log({getProfileData});
    return tokenVerifikasi;
  } catch (e) {
    return APIResponse;
  }
};

export const TokenForgotVerif = async ({email, token}) => {
  try {
    let formData = new FormData();
    // console.log(formData, 'formdata');
    formData.append('email', email);
    formData.append('token', token);

    let tokenVerifikasi = await APISender(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.VALIDATE_FORGOT,
      httpMethod.POST,
      formData,
      null,
      ContentType.formData,
      res => res,
    );
    // console.log({getProfileData});
    return tokenVerifikasi;
  } catch (e) {
    return APIResponse;
  }
};

export const ResendForgetPass = async email => {
  try {
    let formData = new FormData();
    formData.append('email', email);

    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.RESEND_FORGOT_PASS,
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

export const ChangePassword = async (email, password) => {
  try {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    let changePass = await APISender(
      APICONFIG.BASE_URL + APICONFIG.AUTH_URL.CHANGE_PASS,
      httpMethod.PUT,
      formData,
      null,
      ContentType.formData,
      res => res,
    );
    return changePass;
  } catch (e) {
    return APIResponse;
  }
};
