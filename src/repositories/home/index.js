import {
  APICONFIG,
  APIResponse,
  ContentType,
  httpMethod,
  APISender,
} from '../config';

export const SubmitPanicButton = async ({
  categori,
  status = 0,
  coordinate,
  description,
  foto,
}) => {
  try {
    let formData = new FormData();
    formData.append('categori', categori);
    formData.append('status', status);
    formData.append('coordinate', JSON.stringify(coordinate));
    formData.append('description', description);
    formData.append('foto', {
      ...foto,
      name: foto?.fileName,
    });
    return await APISender(
      APICONFIG.BASE_URL + APICONFIG.PANIC_BUTTON,
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

export const GetKecelakaan = async () => {
  try {
    let getKecelakaan = await APISender(
      APICONFIG.BASE_URL + APICONFIG.STATISTIK.KECELAKAAN,
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

export const GetPelanggaran = async () => {
  try {
    let getPelanggaran = await APISender(
      APICONFIG.BASE_URL + APICONFIG.STATISTIK.PELANGGARAN,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getPelanggaran;
  } catch (error) {
    return APIResponse;
  }
};

export const GetSim = async () => {
  try {
    let getSim = await APISender(
      APICONFIG.BASE_URL + APICONFIG.STATISTIK.SIM,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getSim;
  } catch (error) {
    return APIResponse;
  }
};

export const GetRanmor = async () => {
  try {
    let getRanmor = await APISender(
      APICONFIG.BASE_URL + APICONFIG.STATISTIK.KENDARAAN,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getRanmor;
  } catch (error) {
    return APIResponse;
  }
};

export const GetBerita = async filter => {
  try {
    let getBerita = await APISender(
      APICONFIG.BASE_URL + APICONFIG.BERITA,
      httpMethod.GET,
      null,
      filter,
      ContentType.formData,
      res => res,
    );
    return getBerita;
  } catch (error) {
    return APIResponse;
  }
};

export const GetSosmed = async () => {
  try {
    let getSosmed = await APISender(
      APICONFIG.BASE_URL + APICONFIG.SOSIAL_MEDIA,
      httpMethod.GET,
      null,
      null,
      ContentType.formData,
      res => res,
    );
    return getSosmed;
  } catch (error) {
    return APIResponse;
  }
};

export const GetLinkWebview = async () => {
  try {
    let getLinkWebView = await APISender(
      APICONFIG.BASE_URL + APICONFIG.WEBVIEW,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getLinkWebView;
  } catch (error) {
    return APIResponse;
  }
};
