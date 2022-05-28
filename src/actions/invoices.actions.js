import apiService from "../services/api.service";
import { onLoadingFalse } from "./user.action";

export const ACTION_TYPES = {
    GET_INVOICES: "GET_INVOICES",
    UPDATE_STATUS: "UPDATE_STATUS",
    GET_INVOICE: "GET_INVOICE",
    COUNT_WAIT_INVOICE: "COUNT_WAIT_INVOICE"

};

export const getInvoices = (param) => (dispatch) => {
    apiService
      .invoices()
      .getInvoices(param)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.GET_INVOICES,
          payload: response.data.data,
        });

      })
      .catch((err) => {
        alert(err.response.data.message.toString())
      }).finally(()=>dispatch(onLoadingFalse()));
  };

  export const updateStatus = (id,requestBody) => (dispatch) => {
    apiService
      .invoices()
      .updateStatus(id,requestBody)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.UPDATE_STATUS,
          payload: response.data.data,
        });
        alert(response.data.message)
        window.location.href='/Invoices/'+id

      })
      .catch((err) => {
        alert(err.response.data.message.toString())
      }).finally(()=>dispatch(onLoadingFalse()));
  };

  export const getInvoice = (id) => (dispatch) => {
    apiService
      .invoices()
      .getInvoice(id)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.GET_INVOICE,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        alert(err.response.data.message.toString())
      }).finally(()=>dispatch(onLoadingFalse()));
  };

  export const countWaitInvoice = () => (dispatch) => {
    apiService
      .invoices()
      .countInvoice()
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.COUNT_WAIT_INVOICE,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        alert(err.response.data.message.toString())
      }).finally(()=>dispatch(onLoadingFalse()));
  };