import {LOCATION_AKTIF, LOCATION_NONAKTIF} from './type';
const initState = {
  location: null,
  error: null,
};

export function locationReducer(state = initState, action) {
  switch (action.type) {
    case LOCATION_AKTIF: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOCATION_NONAKTIF: {
      return {
        ...state,
        track: null,
      };
    }

    default: {
      return state;
    }
  }
}
