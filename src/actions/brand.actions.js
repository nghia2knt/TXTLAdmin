import apiService from "../services/api.service";
import { onLoadingFalse } from "./user.action";

export const ACTION_TYPES = {
  GET_BRAND_LIST: "GET BRAND LIST",
};

export const getAllBrandList = () => (dispatch) => {
  apiService
    .brands()
    .brandList()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_BRAND_LIST,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const createBrand = (requestBody) => (dispatch) => {
  apiService
    .brands()
    .createBrand(requestBody)
    .then((response) => {
      dispatch(getAllBrandList())
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

