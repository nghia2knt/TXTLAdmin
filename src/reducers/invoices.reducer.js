import { ACTION_TYPES } from "../actions/invoices.actions";

const initialState = {
    error: null,
    time:null,
    duration:0,
    invoices: [],
    getInvoice:null,
    waitInvoice:0
};



export const invoicesReducer = (state = initialState, actions) => {
    switch (actions.type) {
      case ACTION_TYPES.NEW_SELECT:{
          return {
            ...state,
            time: actions.time,
            duration: actions.duration,
            error: actions.error
          };
      }
      case ACTION_TYPES.GET_INVOICES:{
        if (actions.error) {
          return {
            ...state,
            invoices: [],
            error: actions.error
          };
        }else{
            
          return {
            ...state,
            invoices: actions.payload,
            error: actions.error
          };
        }
          
      }
      case ACTION_TYPES.CREATE_INVOICE:{
        if (actions.error) {
          return {
            ...state,
            error: actions.error
          };
        }else{
            
          return {
            ...state,
            error: actions.error
          };
        }
          
      }
      case ACTION_TYPES.GET_INVOICE:{
        if (actions.error) {
          return {
            ...state,
            error: actions.error
          };
        }else{
            
          return {
            ...state,
            getInvoice: actions.payload,
            error: actions.error
          };
        }
          
      }
      case ACTION_TYPES.COUNT_WAIT_INVOICE:{
        if (actions.error) {
          return {
            ...state,
            error: actions.error
          };
        }else{
            
          return {
            ...state,
            waitInvoice: actions.payload,
            error: actions.error
          };
        }
          
      }
      default:
            return state;
      }
  };