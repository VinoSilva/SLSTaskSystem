import {
    SEARCH_TASK_BEGIN,
    SEARCH_TASK_SUCCESS,
    SEARCH_TASK_FAILED
} from '../actions/taskSearchAction';


const initialState = {

}

export default function searchTaskReducer(state = initialState,action){

    switch(action.type){
        case SEARCH_TASK_BEGIN:
        break;
        case SEARCH_TASK_SUCCESS:
        break;
        case SEARCH_TASK_FAILED:
        break;
        default:
        break;
    }
}