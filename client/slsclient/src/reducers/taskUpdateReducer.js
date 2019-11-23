
import {
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_BEGIN,
    UPDATE_TASK_FAILED,
} from "../actions/taskUpdateAction";

const initialState = {
    loading: false,
    error: null,
    task: null
}

export default function taskUpdateReducer(state = initialState,action){

    switch(action.type){
        case UPDATE_TASK_FAILED : 
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case UPDATE_TASK_SUCCESS : 

            return {
                ...state,
                loading: false,
                error: null,
                task: action.payload.task
            }
            break;
            case UPDATE_TASK_BEGIN : 
            return {
                ...state,
                loading: true,
                error: null
            }
        break;
        default:
            return state;
    }

}