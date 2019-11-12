import React from 'react';

import thunk from 'redux-thunk';

import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer'; 

import Task from './Components/Task';

const store = createStore(rootReducer,applyMiddleware(thunk));

//Remove history,test-utils, and remove unnecessary npm

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Task />
      </div>
    </Provider>
  );
}

export default App;
