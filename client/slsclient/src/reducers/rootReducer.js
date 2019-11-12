import {combineReducers} from "redux";

import taskReducer from './taskReducer';
import taskFormReducer from './taskFormReducer';

export default combineReducers({
    taskReducer,
    taskFormReducer
});