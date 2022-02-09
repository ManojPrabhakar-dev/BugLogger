import * as api from "../api/index";
import { GET_USERS } from "../constants/actionTypes";

export const getUserList = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    if (data) {
      dispatch({ type: GET_USERS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
};
