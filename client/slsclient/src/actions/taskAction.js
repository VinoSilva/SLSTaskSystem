export const FETCH_TASK_BEGIN = 'FETCH_TASK_BEGIN';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

export const fetchTaskBegin = () => ({
    type: FETCH_TASK_BEGIN
});

export const fetchTaskSuccess = (tasks) => ({
    type: FETCH_TASK_SUCCESS,
    payload: {tasks}
});

export const fetchTaskFailure = (error) => ({
    type: FETCH_TASK_FAILURE,
    payload: error
});
