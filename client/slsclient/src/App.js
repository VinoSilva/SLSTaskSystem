import React from 'react';

import thunk from 'redux-thunk';

import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer'; 

// const initialState = {
//     count: 0
// };

// //Redux passed a state of undefined, and the action was an object with a type property.
// function reducer(state = initialState,action){
    
//   console.log('reducer',state,action);
  
//   // switch(action.type){
//   //     case 'INCREMENT':
//   //         return {
//   //             count: state.count + 1
//   //         };
//   //     case 'DECREMENT':
//   //         return {
//   //             count: state.count -1
//   //         };
//   //     case 'RESET':
//   //         return {
//   //             count: 0
//   //         };
//   //     default:
//   //         return state;
//   // }
// }

// const store = createStore(reducer,applyMiddleware(thunk));

const store = createStore(rootReducer,applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello World</h1>
      </div>
    </Provider>
  );
}

export default App;
