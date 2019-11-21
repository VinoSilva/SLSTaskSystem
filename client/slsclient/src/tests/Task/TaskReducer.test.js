import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/taskAddAction';
import taskReducer from '../../reducers/taskFormReducer';

// import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test task form reducer', () => {
    afterEach(()=>{
        // fetchMock.restore();
    });

    it('Store should dispatch SHOW_ADD_TASK type action',() => {
        const store = mockStore({
            taskReducer 
        });

        let expectedActions = [{
            type: "SHOW_ADD_TASK"
        }];

        store.dispatch(actions.showAddTask());

        expect(store.getActions()).toEqual(expectedActions);
    });
    
    it('Store should dispatch HIDE_ADD_TASK type action',() => {
        const store = mockStore({
            taskReducer 
        });

        let expectedActions = [{
            type: "HIDE_ADD_TASK"
        }];

        store.dispatch(actions.hideAddTask());

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('reducer should output isAddForm to true',()=>{
       
        const initialState = {
            isAddForm: false
        };

        expect(taskReducer(
            initialState,actions.showAddTask()
        ))
        .toEqual({
            isAddForm: true
        });
        
    });

    it('reducer should output isAddForm to false',()=>{
       
        const initialState = {
            isAddForm: true
        };

        expect(taskReducer(
            initialState,actions.hideAddTask()
        ))
        .toEqual({
            isAddForm: false
        });
        
    });
});