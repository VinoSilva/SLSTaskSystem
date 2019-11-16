import React, { Component } from "react";
import { connect } from "react-redux";
import { showAddTask, hideAddTask } from "../actions/taskAddAction";

import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

function mapStateToProps(state) {
  return {
    isAddForm: state.taskFormReducer.isAddForm
  };
}

// // in this object, keys become prop names,
// // and values should be action creator functions.
// // They get bound to `dispatch`.
// const mapDispatchToProps = dispatch => ({
//     showAddTask,
//     hideAddTask,
//     dispatch
// })

export class Task extends Component {



  constructor(props) {
    super(props);

    this.onClickAddTask = this.onClickAddTask.bind(this);
  }

  onClickAddTask() {
    if (this.props.isAddForm) {
      //Hide the form
      this.props.dispatch(hideAddTask());
    } else {
      //Show the form
      this.props.dispatch(showAddTask());
    }
  }

  renderAddTaskForm() {
    if (this.props.isAddForm) {
      return <TaskForm />;
    }

    return <div></div>;
  }

  render() {

    return (
      <div>
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

        <div class = "row">
          {/* <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard /> */}
        </div>
      </div>
    );
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
// export default  connect(mapDispatchToProps,mapStateToProps)(Task);
export default connect(mapStateToProps)(Task);
