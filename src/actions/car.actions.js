import apiService from "../services/api.service";
import { onLoadingFalse } from "./user.action";

export const ACTION_TYPES = {
  GET_ALL_CAR_LIST_BY_FILTER: "GET ALL CAR LIST BY FILTER",
  GET_ALL_CAR_LIST: "GET ALL CAR LIST",
  GET_CAR:"GET_CAR",
  CREATE_CAR: "CREATE_CAR",
  UPLOAD_FILE: "UPLOAD_FILE"
};

export const getAllCarList = () => (dispatch) => {
  apiService
    .cars()
    .carList("?page=1&size=999")
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_CAR_LIST,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const getAllCarListByFilter = (filter) => (dispatch) => {
  apiService
    .cars()
    .carList("?page=1&size=999" + filter)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_CAR_LIST_BY_FILTER,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const getCar = (id) => (dispatch) => {
  apiService
    .cars()
    .getCar(id)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_CAR,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const editCar = (id,requestBody) => (dispatch) => {
  apiService
    .cars()
    .editCar(id,requestBody)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_CAR,
        payload: response.data.data,
      });
      window.location.href='/Cars/'+id

    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const changeImage = (id,requestBody,requestBase) => (dispatch) => {
  apiService
    .storage()
    .uploadFile(requestBody)
    .then((response) => {
      requestBase.image = response.data
      dispatch(editCar(id,requestBase))
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const uploadFile= (requestBody) => (dispatch) => {
  apiService
    .storage()
    .uploadFile(requestBody)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_FILE,
        payload: response.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};


export const createNewCar= (requestBody) => (dispatch) => {
  apiService
    .cars()
    .createCar(requestBody)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.CREATE_CAR,
        payload: response.data.data,
      });
      window.location.href='/CarList'
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};