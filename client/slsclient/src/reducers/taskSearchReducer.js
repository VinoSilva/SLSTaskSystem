import {
    searchTaskBegin,
    searchTaskSuccess,
    searchTaskFailed,
    SEARCH_TASK_BEGIN,
    SEARCH_TASK_SUCCESS,
    SEARCH_TASK_FAILED
} from '../actions/taskSearchAction';

const initialState = {
    task: null,
    error: null,
    loading: false
}

export default function searchTaskReducer(state = initialState,action){

    switch(action.type){
        case SEARCH_TASK_BEGIN:
            return {
                ...state,
                loading: true
            }
        case SEARCH_TASK_SUCCESS:
            return {
                ...state,
                loading:false,
                error: null
            }
        case SEARCH_TASK_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}