import axios from 'axios';

export const SHOW_ADD_TASK = "SHOW_ADD_TASK";
export const HIDE_ADD_TASK = "HIDE_ADD_TASK";

export const ADD_TASK_BEGIN = 'ADD_TASK_BEGIN';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export function showAddTask() {
  return { type: SHOW_ADD_TASK };
}

export function hideAddTask() {
  return { type: HIDE_ADD_TASK };
}

export const addTaskBegin = () => ({
  type: ADD_TASK_BEGIN
})

export const addTaskSuccess = (data) => ({
  type: ADD_TASK_SUCCESS,
  payload: data
})

export const addTaskFailure = (error) => ({
  type: ADD_TASK_FAILURE,
  payload: error
})

export const addTask = (task) => {
  return dispatch => {

    dispatch(addTaskBegin());

    axios.post('http://localhost:4000/task/',task)
    .then((res)=>{
      dispatch(addTaskSuccess(res.data));
    })
    .catch((err)=>{
      console.log(err);
      dispatch(addTaskFailure(err));
    });
  }
}