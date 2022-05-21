import { ACTION_TYPES } from "../actions/brand.actions";

const initialState = {
  listAllBrands: [],
};

export const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_BRAND_LIST:
      return { ...state, listAllBrands: action.payload };

    default:
      return state;
  }
};
