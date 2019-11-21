import React, { Component } from "react";
import { connect } from "react-redux";
import { showAddTask, hideAddTask } from "../actions/taskAddAction";
import { getPageSuccess } from '../actions/taskPageAction';

import TaskForm from "./TaskForm";
import TaskPaginate from './TaskPaginate';
import TaskLists from './TaskLists';

import {getTaskPage} from '../actions/taskPageAction';

const mapDispatchToProps = dispatch => {
  return {
    onGetTaskPage: taskPage => {
      dispatch(getTaskPage(taskPage));
    },
    showAddForm: () => {
      dispatch(showAddTask());
    },
    hideAddTask: () => {
      dispatch(hideAddTask());
    }
  }
}

function mapStateToProps(state) {
  return {
    isAddForm: state.taskFormReducer.isAddForm,
    currentPage: state.taskReducer.currentPage,
    tasksPerPage: state.taskReducer.tasksPerPage,
    count: state.taskReducer.count,
    tasks: state.taskReducer.tasks,
    loading: state.taskReducer.loading,
    error: state.taskReducer.error
  };
}

export class Task extends Component {

  constructor(props) {

    super(props);

    this.onClickAddTask = this.onClickAddTask.bind(this);

    this.state = {
      currentPage: -1
    };

  }

  onClickAddTask() {
    if (this.props.isAddForm) {
      //Hide the form
      this.props.hideAddTask();
    } else {
      //Show the form
      this.props.showAddForm();
    }
  }

  renderAddTaskForm() {
    if (this.props.isAddForm) {
      return <TaskForm />;
    }

    return <div></div>;
  }

  populateTasks(){
    //To prevent inifnite loop fetching
    if(this.state.currentPage === this.props.currentPage){
      return;
    }
    else{
      this.setState({
        currentPage: this.props.currentPage
      },()=>{
        // this.fetchPageTasks();

        this.props.onGetTaskPage({
          limit: this.props.tasksPerPage,
          skip: this.props.currentPage});
      });
    }
  }

  fetchPageTasks()
  {
      let bodyData = {
          limit: this.props.tasksPerPage,
          skip: this.props.currentPage
      };

      let fetchData = {
          method: 'POST',
          body: JSON.stringify(bodyData),
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          }
      };

      fetch("http://localhost:4000/task/page/",fetchData)
      .then((res)=>{
          if(res.status === 200){
              return res.json();
          }
      })
      .then((data)=>{
          if(data){

            let pages = 0;
            
            if(data.count !== 0 && data.tasksPerPage !== 0){
              pages = Math.ceil(data.count/data.tasksPerPage);
            }

            let dispatchData = getPageSuccess();
            
            dispatchData.payload = {};

            dispatchData.payload.tasks = data.tasks;
            dispatchData.payload.totalPages = pages;
            dispatchData.payload.count =  data.count;
            dispatchData.payload.currentPage =  data.currentPage;
            dispatchData.payload.tasksPerPage = data.tasksPerPage;

            this.props.dispatch(dispatchData);

          }
    })
    .catch((err)=>{
        console.log(err);
    });
  }

  componentDidMount(){
    this.populateTasks();
  }

  componentDidUpdate(){
    this.populateTasks();
  }

  renderContent(){
    return (
      <div className="container-fluid">
      <h1 className="list-inline-item" id="taskHeader">
        Task List
        <button
          className="btn btn-info list-inline-item"
          id="addTaskBtn"
          onClick={this.onClickAddTask}
        >
          +
        </button>
      </h1>

      <div id="taskList"></div>

      {this.renderAddTaskForm()}

      <TaskLists history={this.props.history} />

      <TaskPaginate />

    </div>
    );
  }

  renderLoading(){

    return(
      <div>
        <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  render() {

    return (
      <div>
        {this.props.loading ? this.renderLoading() : this.renderContent()}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Task);
