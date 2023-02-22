import {POINTING_AKTIF, POINTING_NONAKTIF} from './type';
const initState = {
  pointing: null,
  error: null,
};

export function pointingReducer(state = initState, action) {
  switch (action.type) {
    case POINTING_AKTIF: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case POINTING_NONAKTIF: {
      return {
        ...state,
        pointing: null,
      };
    }

    default: {
      return state;
    }
  }
}
