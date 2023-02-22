import {AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER} from './type';
const initState = {
  userData: null,
  error: null,
};

export function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case AUTH_REGISTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case AUTH_LOGOUT: {
      return null;
    }
    case AUTH_ERROR: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
