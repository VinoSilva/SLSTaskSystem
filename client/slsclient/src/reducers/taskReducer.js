import {} from "../actions/taskRequestAction";

import {
  CHANGE_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_BEGIN,
  GET_PAGE_FAILED
} from "../actions/taskPageAction";

const initialState = {
  currentPage: 0,
  totalPages: 0,
  tasksPerPage: 20,
  count: 0,
  tasks: [],
  loading: false
};

export default function taskReducer(state = initialState, action) {
  let currentPage = 0;

  switch (action.type) {
    case GET_PAGE_SUCCESS: {
      let totalPages = action.payload.totalPages;
      let count = action.payload.count;
      let tasksPerPage = action.payload.tasksPerPage;
      let tasks = action.payload.tasks;
      currentPage = action.payload.currentPage;

      return {
        ...state,
        totalPages,
        count,
        tasksPerPage,
        tasks,
        currentPage,
        loading: false,
        error: null
      };
    }
    case GET_PAGE_FAILED: {

      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
    case GET_PAGE_BEGIN: {

      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    default:
      return state;
  }
}
