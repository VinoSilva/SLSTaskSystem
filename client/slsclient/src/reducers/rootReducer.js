import {combineReducers} from "redux";

import taskReducer from './taskReducer';
import taskFormReducer from './taskFormReducer';
import taskSearchReducer from './taskSearchReducer';

export default combineReducers({
    taskReducer,
    taskFormReducer,
    taskSearchReducer
});