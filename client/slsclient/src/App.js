import React, { Component } from "react";

import { connect } from "react-redux";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createSocket } from "./actions/socketCreateAction";

import Home from "./Components/Home";
import TaskPage from "./Components/TaskPage";
import PageNotFound from "./Components/PageNotFound";

const mapDispatchToProps = dispatch => {
  return {
    onCreateSocket: socket => {
      dispatch(createSocket(socket));
    }
  };
};

function mapStateToProps(state){
  return {
    
  }
}

export class App extends Component {
  componentDidMount() {
    this.props.onCreateSocket();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Task/:id" component={TaskPage} />

            <Route path="" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
