import { SHOW_ADD_TASK,HIDE_ADD_TASK  } from "../actions/taskAddAction";
import { ADD_TASK_BEGIN,ADD_TASK_SUCCESS,ADD_TASK_FAILURE  } from "../actions/taskAddAction";

const initialState = {
  isAddForm: false,
  loading: false,
  error: null
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_TASK:
      return {
        ...state,
        isAddForm: true
    };
    case HIDE_ADD_TASK:
        return {
        ...state,
        isAddForm: false
      };
    case ADD_TASK_BEGIN:
        return {
        ...state,
        // isAddForm: false,
        loading: true,
        error: null
      };
    case ADD_TASK_SUCCESS:
        return {
        ...state,
        loading: false,
        error: null,
        isAddForm: false
      };
    case ADD_TASK_FAILURE:
        return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
     // ALWAYS have a default case in a reducer
      return state;
  }
}
