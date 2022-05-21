import jwtDecode from "jwt-decode";
import apiService from "../services/api.service";

export const ACTION_TYPES = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SELF: "SELF",
  GET_USERS: "GET_USERS",
  EDIT_PROFILE: "EDIT_PROFILE",
  GET_USER: "GET_USER",
  LOADING_TRUE: "LOADING_TRUE",
  LOADING_FALSE: "LOADING_FALSE",
};

export const login = (loginObject) => (dispatch) => {
  apiService
    .auth()
    .login(loginObject)
    .then((response) => {
      const decoded = jwtDecode(response.data.data);

      localStorage.setItem("token", response.data.data);

      dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: {
          email: decoded.sub,
          role: decoded.userRole,
          status: response.data.status,
          token: response.data.data,
          iat: decoded.iat,
          exp: decoded.exp,
        },
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
      dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: {
          email: null,
          role: null,
          status: "failed",
          token: null,
          iat: null,
          exp: null,
        },
      });
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const findSelf = () => (dispatch) => {
  apiService
    .user()
    .self()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.SELF,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const getUsers = (param) => (dispatch) => {
  apiService
    .user()
    .getUsers(param)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_USERS,
        payload: response.data.data,
      });
      
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const getUser = (id) => (dispatch) => {
  apiService
    .user()
    .getUser(id)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_USER,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const editUserProfile = (requestBody) => (dispatch) => {
  apiService
    .user()
    .editProfileUser(requestBody)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.EDIT_PROFILE,
        payload: response.data.data,
      });
      window.location.href='/Users/'+requestBody.id
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const changeAvatar = (id, requestBody) => (dispatch) => {
  apiService
    .user()
    .changeAvatar(id,requestBody)
    .then((response) => {
      dispatch({
        type:  ACTION_TYPES.GET_USER,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const activeUser = (id) => (dispatch) => {
  apiService
    .user()
    .activeUser(id)
    .then((response) => {
      dispatch({
        type:  ACTION_TYPES.GET_USER,
        payload: response.data.data,
      });
      alert("Kích hoạt tài khoản người dùng thành công.")
    })
    .catch((err) => {
      alert(err.response.data.message.toString())
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const onLoadingTrue = () => (dispatch) => {
  dispatch({
          type: ACTION_TYPES.LOADING_TRUE,
  });
};

export const onLoadingFalse = () => (dispatch) => {
  dispatch({
          type: ACTION_TYPES.LOADING_FALSE,
  });
};