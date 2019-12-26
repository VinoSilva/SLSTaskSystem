
import {
    CREATE_SOCKET_BEGIN,
    CREATE_SOCKET_SUCCESS,
    CREATE_SOCKET_FAILED
} from "../actions/socketCreateAction";

const initialState = {
    loading: false,
    error: null,
    socket: null
};

export default function socketCreateReducer(state=initialState,action){
    switch(action.type){
        case CREATE_SOCKET_BEGIN:
            return {
                ...state,
                loading: true
            };
        break;
        case CREATE_SOCKET_SUCCESS:
            
            return {
                ...state,
                loading: false,
                socket: action.payload.socket,
                error: null
            };
            break;
            case CREATE_SOCKET_FAILED:
                return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
        break;
    }
}