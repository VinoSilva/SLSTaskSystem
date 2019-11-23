import React, { Component } from "react";
import { FormErrors } from "./FormErrors";
import { connect } from "react-redux";

import { addTask } from "../actions/taskAddAction";

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: task => {
      dispatch(addTask(task));
    }
  };
};

function mapStateToProps(state) {
  return {
    loading: state.taskFormReducer.loading,
    error: state.taskFormReducer.error
  };
}


export class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      name: "",
      description: "",
      formErrors: { email: "", password: "" },
      nameValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  onSubmit(e) {
    if (this.state.formValid) {
        let bodyData = {
            name: this.state.name,
            description: this.state.description
        };

        this.props.onAddTask(bodyData);
    }

    e.preventDefault();
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  checkAllLetter(value) {
    var letters = /^[A-Za-z]+$/;

    if (value.match(letters)) {
      return true;
    } else {
      return false;
    }
  }

  validateField(fieldName, value) {
    let nameValid = this.state.nameValid;
    let descriptionValid = this.state.descriptionValid;
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 0 && this.checkAllLetter(value);
        fieldValidationErrors.name = nameValid ? "" : " is invalid";

        break;
      case "description":
        descriptionValid = value.length > 0;
        fieldValidationErrors.description = descriptionValid
          ? ""
          : " is invalid";

        break;
      default:
        break;
    }

    this.setState(
      {
        nameValid: nameValid,
        descriptionValid: descriptionValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.descriptionValid
    });
  }

  renderContent() {
    return (
      
      <div class="row">
        <div class = "col-lg-3">
          <div id="addTaskForm" className="form-group">
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <form onSubmit={this.onSubmit}>
                <div className={this.state.nameValid ? "form-group has-success" : "form-group has-danger"} >
                <label className="col-form-label">Task Name</label>
                <input
                  type="text"
                  className= {this.state.nameValid ? "form-control is-valid" : "form-control is-invalid"}
                  name="name"
                  onChange={this.onChange}
                />
              </div>

              <div className={this.state.descriptionValid ? "form-group has-success" : "form-group has-danger"}>
                <label className="col-form-label">Task Description</label>
                <textarea
                  className={this.state.descriptionValid ? "form-control is-valid" : "form-control is-invalid"}
                  name="description"
                  rows="3"
                  onChange={this.onChange}
                ></textarea>
              </div>

              <br />

              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
      
    );
  }

  renderLoading() {

    return (
      <div>
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
