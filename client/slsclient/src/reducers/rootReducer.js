import {combineReducers} from "redux";

import taskReducer from './taskReducer';
import taskFormReducer from './taskFormReducer';
import taskSearchReducer from './taskSearchReducer';
import taskUpdateReducer from './taskUpdateReducer';
import socketCreateReducer from './socketCreateReducer';

export default combineReducers({
    taskReducer,
    taskFormReducer,
    taskSearchReducer,
    taskUpdateReducer,
    socketCreateReducer
});