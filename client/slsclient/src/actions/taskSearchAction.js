import axios from 'axios';


export const SEARCH_TASK_BEGIN = 'SEARCH_TASK_BEGIN';
export const SEARCH_TASK_SUCCESS = 'SEARCH_TASK_SUCCESS';
export const SEARCH_TASK_FAILED = 'SEARCH_TASK_FAILED';


export const searchTaskBegin = () => ({
    type: SEARCH_TASK_BEGIN
});

export const searchTaskSuccess = (task) => ({
    type: SEARCH_TASK_SUCCESS,
    payload: {
        task
    }
});

export const searchTaskFailed = (error) => ({
    type: SEARCH_TASK_FAILED,
    payload: {
        error
    }
});

export const getTask = ({name})=>{
    return dispatch => {
        dispatch(searchTaskBegin());

        axios.post('https://localhost:4000/task/find/',{
            name
        })
        .then((res)=>{

            dispatch(searchTaskSuccess(res.data));
        })
        .catch((err)=>{
            console.log(err);
            dispatch(searchTaskFailed(err));
        })

        //FETCH

        // let bodyData =  {
        //     name
        // }

        // fetch("https://localhost:4000/task/find/",{
        //     method: 'post',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify(bodyData)
        // })
        // .then((res)=>{
        //     return res.json();
        // })
        // .then((data)=>{
        //     dispatch(searchTaskSuccess(data));
        // })
        // .catch((err)=>{
        //     console.log(err);
        //     dispatch(searchTaskFailed(err));
        // })
    }
}