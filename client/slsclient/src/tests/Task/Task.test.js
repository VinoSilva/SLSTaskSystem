import React from "react";
import ReactDOM from "react-dom";
import Task from "../../Components/Task";

import { mount } from "enzyme";

import renderer from "react-test-renderer";

import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/rootReducer'; 

let store;

describe("Task component", () => {
  
  beforeEach(() => {
    store = createStore(rootReducer,applyMiddleware(thunk)); 
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    const render = ReactDOM.render(<Provider store = {store}> <Task /> </Provider>,  div);
    
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Task matches the snapshot", () => {
    const tree = renderer.create(<Provider store = {store}> <Task /> </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Task Component should have a div with id "taskList"', () => {
    const wrapper = mount(<Provider store = {store}><Task /></Provider>);
    
    const taskList = wrapper.find("#taskList");
    expect(taskList).toBeTruthy();
    expect(taskList.type()).toBe("div");
  });

  it('Task Component should have a button with id "addTaskBtn"', () => {
    const wrapper = mount(<Provider store = {store}><Task /></Provider>);

    const addTaskBtn = wrapper.find("#addTaskBtn");
    expect(addTaskBtn).toBeTruthy();
    expect(addTaskBtn.type()).toBe("button");
  });

  it('Task Component should have a button with id "addTaskBtn"', () => {
    const wrapper = mount(<Provider store = {store}><Task /></Provider>);

    const addTaskBtn = wrapper.find("#addTaskBtn");
    addTaskBtn.simulate('click');

    const addTaskForm = wrapper.find('#addTaskForm');

    expect(addTaskForm).toBeTruthy();

    expect(addTaskForm.type()).toBe("div");
  });
});
