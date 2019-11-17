export const FETCH_TASK_BEGIN = 'FETCH_TASK_BEGIN';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

export const ADD_TASK_BEGIN = 'ADD_TASK_BEGIN';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const SEARCH_TASK_FAILURE = 'SEARCH_TASK_FAILURE';

export const DELETE_TASK_BEGIN   = 'DELETE_TASK_BEGIN';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const UPDATE_TASK_BEGIN = 'UPDATE_TASK_BEGIN';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

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


export const addTaskBegin = () => ({
    type: ADD_TASK_BEGIN
})

export const addTaskSuccess = () => ({
    type: ADD_TASK_SUCCESS
})

export const addTaskFailure = (error) => ({
    type: ADD_TASK_FAILURE,
    payload: error
})

export const deleteTaskBegin = () => ({
    type: DELETE_TASK_BEGIN
});

export const deleteTaskSuccess = () => ({
    type: DELETE_TASK_SUCCESS
});

export const deleteTaskFailure = (error) => ({
    type: DELETE_TASK_FAILURE,
    payload: error
});

export const updateTaskBegin = () => ({
    type: UPDATE_TASK_BEGIN
})

export const updateTaskSuccess = () => ({
    type: UPDATE_TASK_SUCCESS
})

export const updateTaskFailure = (error) => ({
    type: UPDATE_TASK_FAILURE,
    payload: error
})