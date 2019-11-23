import {combineReducers} from "redux";

import taskReducer from './taskReducer';
import taskFormReducer from './taskFormReducer';
import taskSearchReducer from './taskSearchReducer';
import taskUpdateReducer from './taskUpdateReducer';

export default combineReducers({
    taskReducer,
    taskFormReducer,
    taskSearchReducer,
    taskUpdateReducer
});