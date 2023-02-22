import {VERIF_DATA, VERIF_TAKE_OUT} from './type';
const initState = {
  verifikasi: null,
  error: null,
};

export function verifikasiReducer(state = initState, action) {
  switch (action.type) {
    case VERIF_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case VERIF_TAKE_OUT: {
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
