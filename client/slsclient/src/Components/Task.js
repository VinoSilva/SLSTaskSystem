import React, { Component } from "react";
import { connect } from "react-redux";
import { showAddTask, hideAddTask } from "../actions/taskAddAction";

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
      return (
        <div id="addTaskForm">
          <h1>Add Form</h1>
        </div>
      );
    }

    return <div></div>;
  }


  render() {
    return (
      <div>
        <h1 id="taskHeader">Task List</h1>
        <div id="taskList"></div>

        {this.renderAddTaskForm()}

        <button
          className="btn btn-info"
          id="addTaskBtn"
          onClick={this.onClickAddTask}
        >
          Add Form
        </button>
      </div>
    );
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
// export default  connect(mapDispatchToProps,mapStateToProps)(Task);
export default connect(mapStateToProps)(Task);
