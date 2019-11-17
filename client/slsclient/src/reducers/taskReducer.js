import {
    FETCH_TASK_BEGIN,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAILURE,
} from '../actions/taskRequestAction';

import {
    CHANGEPAGE,
    GET_PAGE_SUCCESSFUL
} from '../actions/taskPageAction';

const initialState = {
    currentPage: 0,
    totalPages: 0,
    tasksPerPage: 20,
    count: 0,
    tasks: []
};

export default function taskReducer(state = initialState,action){

    let currentPage = 0;

    switch(action.type){

        case FETCH_TASK_BEGIN:
            break;
        case FETCH_TASK_SUCCESS:
            break;
        case FETCH_TASK_FAILURE:
            break;
        case CHANGEPAGE:
            
            currentPage = action.payload.currentPage;

            return {
                ...state,
                currentPage,
            };
        case GET_PAGE_SUCCESSFUL:
            
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
                 currentPage
             };
        default:
            return state;
    }
}
