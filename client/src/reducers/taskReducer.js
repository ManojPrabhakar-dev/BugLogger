import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";

export const taskReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { loading: true, tasks: [] };
    case FETCH_SUCCESS:
      return { loading: false, tasks: action.payload };
    case FETCH_FAIL:
      return { loading: false, error: action.payload };
    case CREATE:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};
