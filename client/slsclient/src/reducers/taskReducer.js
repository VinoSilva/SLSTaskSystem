import {
    FETCH_TASK_BEGIN,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAILURE,
} from '../actions/taskAction';

const initialState = {
    
};

export default function taskReducer(state = initialState,action){
    switch(action.type){

        case FETCH_TASK_BEGIN:
            break;
        case FETCH_TASK_SUCCESS:
            break;
        case FETCH_TASK_FAILURE:
            break;
        default:
            return state;
    }
}
