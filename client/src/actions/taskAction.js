import * as api from "../api/index";
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";

export const getTaskList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REQUEST });
    const { data } = await api.getTasks();
    if (data) {
      dispatch({ type: FETCH_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const { data: taskInfo } = await api.postTask(task);

    dispatch({ type: CREATE, payload: taskInfo });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const { data: updatedTaskInfo } = await api.updateTask(task._id, task);
    dispatch({ type: UPDATE, payload: updatedTaskInfo });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
