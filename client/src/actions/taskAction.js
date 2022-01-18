import * as api from "../api/index";
import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export const getTaskList = () => async (dispatch) => {
  const { data } = await api.getTasks();

  dispatch({ type: FETCH_ALL, payload: data });
};

export const createTask = (task) => async (dispatch) => {
  await api.postTask(task);

  dispatch({ type: CREATE, payload: task });
};
