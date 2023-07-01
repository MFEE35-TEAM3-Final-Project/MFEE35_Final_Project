import { combineReducers } from "redux";
import adminReducer from "./adminAuth";
import userReducers from "./userAuth";

const allReducers = combineReducers({
  admin: adminReducer,
  user: userReducers
});

export default allReducers;
