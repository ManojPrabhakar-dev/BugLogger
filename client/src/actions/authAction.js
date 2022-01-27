import * as api from "../api/index";
import { AUTH } from "../constants/actionTypes";

export const signUp = (navigate, userData) => async (dispatch) => {
  const { data } = await api.signUp(userData);
  dispatch({ type: AUTH, payload: data });
  navigate("/home");
};

export const signIn = (navigate, userData) => async (dispatch) => {
  const { data } = await api.signIn(userData);
  dispatch({ type: AUTH, payload: data });
  navigate("/home");
};
