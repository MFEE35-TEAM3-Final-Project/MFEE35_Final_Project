import { combineReducers } from "redux";
import adminReducer from "./adminAuth";

const allReducers = combineReducers({
  admin: adminReducer
});

export default allReducers;
