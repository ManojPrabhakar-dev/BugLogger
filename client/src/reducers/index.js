import { combineReducers } from "redux";

import { taskReducer } from "./taskReducer";
import authReducer from "./authReducer";
import { userReducer } from "./userReducer";

export const reducers = combineReducers({
  tasks: taskReducer,
  users: userReducer,
  auth: authReducer,
});
