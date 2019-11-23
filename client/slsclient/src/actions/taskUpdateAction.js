import axios from 'axios';

export const UPDATE_TASK_BEGIN = 'UPDATE_TASK_BEGIN';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';


export const updateTaskBegin = () => ({
    type: UPDATE_TASK_BEGIN
})

export const updateTaskSuccess = (task) => ({
    type: UPDATE_TASK_SUCCESS,
    payload: {task}
})

export const updateTaskFailure = (error) => ({
    type: UPDATE_TASK_FAILED,
    payload: error
})

export const updateTask = (task) =>{
    return dispatch => {

        dispatch(updateTaskBegin());

        
        axios.patch('http://localhost:4000/task/',task)
        .then((res)=>{


            dispatch(updateTaskSuccess(res.data.task))
        })
        .catch((err)=>{
            console.log(err);
            console.log('Failed update task');
            dispatch(updateTaskFailure(err));
        });

    }
}