import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export const taskReducer = (tasks = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...tasks, action.payload];
    default:
      return tasks;
  }
};
