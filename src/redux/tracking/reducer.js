import {TRACK_AKTIF, TRACK_NONAKTIF} from './type';
const initState = {
  track: null,
  error: null,
};

export function trackReducer(state = initState, action) {
  switch (action.type) {
    case TRACK_AKTIF: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case TRACK_NONAKTIF: {
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
