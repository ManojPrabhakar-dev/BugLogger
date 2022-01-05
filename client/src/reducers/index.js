import { combineReducers } from "redux";

import { taskReducer } from "./taskReducer";
import authReducer from "./authReducer";

export const reducers = combineReducers({ taskReducer, authReducer });
