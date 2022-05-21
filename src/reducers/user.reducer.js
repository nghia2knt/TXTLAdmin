import { ACTION_TYPES } from "../actions/user.action";

const initialState = {
  userDetail: null,
  email: null,
  role: null,
  status: null,
  token: null,
  iat: null,
  exp: null,
  userList: [],
  userEdit: null,
  loading: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        email: action.payload.email,
        role: action.payload.role,
        status: action.payload.status,
        token: action.payload.token,
        iat: action.payload.iat,
        exp: action.payload.exp,
      };

    case ACTION_TYPES.SELF:
      return {
        ...state,
        userDetail: action.payload,
      };

      case ACTION_TYPES.GET_USERS:
        return {
          ...state,
          userList: action.payload,
        };
        case ACTION_TYPES.GET_USER:
          return {
            ...state,
            userEdit: action.payload,
          };
    case ACTION_TYPES.LOGOUT:
      return { ...initialState };
      
    case ACTION_TYPES.LOADING_TRUE:{
        return {
          ...state,
        loading: true
        }
      }
    case ACTION_TYPES.LOADING_FALSE:{
        return {
          ...state,
        loading: false
        }
      }
    default:
      return state;
  }
};
