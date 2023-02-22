import {
  APICONFIG,
  APIResponse,
  ContentType,
  httpMethod,
  APISender,
} from '../config';

export const GetLinkStakeholder = async () => {
  try {
    let getLinkStakeholder = await APISender(
      APICONFIG.BASE_URL + APICONFIG.STAKEHOLDER,
      httpMethod.GET,
      null,
      null,
      ContentType.json,
      res => res,
    );
    return getLinkStakeholder;
  } catch (error) {
    return APIResponse;
  }
};


