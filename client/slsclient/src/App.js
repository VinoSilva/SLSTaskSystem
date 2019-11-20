import React from 'react';

import thunk from 'redux-thunk';

import { createStore,applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import { BrowserRouter,Switch, Route } from "react-router-dom";

import rootReducer from './reducers/rootReducer'; 

import Home from './Components/Home';
import TaskPage from './Components/TaskPage';
import PageNotFound from './Components/PageNotFound';

const store = createStore(rootReducer,applyMiddleware(thunk));

//Remove history,test-utils, and remove unnecessary npm

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
           <Switch>

             <Route exact path = "/" component = {Home} />
             <Route exact path="/Task/:id" component = {TaskPage}/>

             <Route path = "" component = {PageNotFound}/>

           </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
