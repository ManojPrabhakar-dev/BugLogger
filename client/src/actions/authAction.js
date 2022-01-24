import * as api from "../api/index";
import { AUTH, LOGOUT } from "../constants/actionTypes";

export const signUp = (navigate, userData) => async (dispatch) => {
  const { data } = await api.signUp(userData);
  dispatch({ type: AUTH, payload: data });
  navigate("/");
};

export const signIn = (navigate, userData) => async (dispatch) => {
  const { data } = await api.signIn(userData);
  dispatch({ type: LOGOUT, payload: data });
  navigate("/");
};
