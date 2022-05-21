import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { carReducer } from "./car.reducer";
import { brandReducer } from "./brand.reducer";
import { invoicesReducer } from "./invoices.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  car: carReducer,
  brand: brandReducer,
  invoices: invoicesReducer
});
