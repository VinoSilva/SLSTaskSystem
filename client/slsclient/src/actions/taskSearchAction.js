
export const SEARCH_TASK_BEGIN = 'SEARCH_TASK_BEGIN';
export const SEARCH_TASK_SUCCESS = 'SEARCH_TASK_SUCCESS';
export const SEARCH_TASK_FAILED = 'SEARCH_TASK_FAILED';

export const searchTaskBegin = () => ({
    type: SEARCH_TASK_BEGIN
});

export const searchTaskSuccess = () => ({
    type: SEARCH_TASK_SUCCESS
});

export const searchTaskFailed = () => ({
    type: SEARCH_TASK_FAILED
});