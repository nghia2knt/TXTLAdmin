import { ACTION_TYPES } from "../actions/car.actions";

const initialState = {
  listAllCars: null,
  listAllCarsByFilter: null,
  getCar: null,
  uploadFile: ''
};

export const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_CAR_LIST:
      return { ...state, listAllCars: action.payload };

    case ACTION_TYPES.GET_ALL_CAR_LIST_BY_FILTER:
      return { ...state, listAllCarsByFilter: action.payload };

    case ACTION_TYPES.GET_CAR:
      return { ...state, getCar: action.payload };

    case ACTION_TYPES.UPLOAD_FILE:
        return { ...state, uploadFile: action.payload };
    
    default:
      return state;
  }
};
