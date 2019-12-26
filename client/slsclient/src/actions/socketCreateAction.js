
import socketIOClient from 'socket.io-client';

export const CREATE_SOCKET_BEGIN = "CREATE_SOCKET_BEGIN";
export const CREATE_SOCKET_SUCCESS = "CREATE_SOCKET_SUCCESS";
export const CREATE_SOCKET_FAILED = "CREATE_SOCKET_FAILED";

export const createSocketBegin = ()=>({
    type: CREATE_SOCKET_BEGIN
});

export const createSocketSuccess = (socket) => ({
    type: CREATE_SOCKET_SUCCESS,
    payload: {socket}
});

export const createSocketFailure = (error)=> ({
    type: CREATE_SOCKET_FAILED,
    payload: error
});

export const createSocket = (socket) => {
    return dispatch => {

        dispatch(createSocketBegin());
        
        let socket = socketIOClient("http://localhost:4000",{rejectUnauthorized: false})
        
        if(socket!=null){
            dispatch(createSocketSuccess(socket));
        }
        else{
            dispatch(createSocketFailure("Socket initialization failed."));
        }
    }
}