import { SHOWADDTASK, HIDEADDTASK } from "../actions/taskAddAction";

const initialState = {
  isAddForm: false
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SHOWADDTASK:
      return {
        ...state,
        isAddForm: true
    };
    case HIDEADDTASK:
        return {
        ...state,
        isAddForm: false
      };
    default:
     // ALWAYS have a default case in a reducer
      return state;
  }
}
