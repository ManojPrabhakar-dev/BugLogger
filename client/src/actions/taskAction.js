import * as api from "../api/index";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export const getTaskList = () => async (dispatch) => {
  try {
    const { data } = await api.getTasks();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
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

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const { data: updatedTaskInfo } = await api.updateTask(id, task);
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
