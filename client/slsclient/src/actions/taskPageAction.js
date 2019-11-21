import axios from 'axios';

export const CHANGE_PAGE = "CHANGE_PAGE";
export const GET_PAGE_BEGIN = "GET_PAGE_BEGIN";
export const GET_PAGE_SUCCESS = "GET_PAGE_SUCCESS";
export const GET_PAGE_FAILED = "GET_PAGE_FAILED";

export function changePage(){
    return {type: CHANGE_PAGE};
}

export function getPageSuccess(data){
    return {type: GET_PAGE_SUCCESS,
    payload: 
        data
    };
}

export function getPageFailed(error){
    return {
        type: GET_PAGE_FAILED,
        payload: {
            error
        }
    };
}

export function getPageBegin(page){
    return {
        type: GET_PAGE_BEGIN,
        payload: {
            page
        }
    };
}

export const getTaskPage = ({limit,skip}) => {
    return dispatch => {

        dispatch(getPageBegin(skip));

        axios.post('http://localhost:4000/task/page',{
            limit,
            skip
        })
        .then((res)=>{

            dispatch(getPageSuccess(res.data));
            
        })
        .catch((err)=>{
            console.log(err);
            dispatch(getPageFailed(err));
        });
    }
}