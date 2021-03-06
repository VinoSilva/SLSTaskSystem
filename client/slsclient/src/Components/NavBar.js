import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";

import {getTask} from '../actions/taskSearchAction';

const mapDispatchToProps = dispatch => {
  return {
    onGetTask: task => {
      dispatch(getTask(task))
    }
  }
}

function mapStateToProps(state) {

  return {
    loading: state.taskSearchReducer.loading,
    error: state.taskSearchReducer.error,
    task: state.taskSearchReducer.task
  };
}

export class NavBar extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      searchName: "",
      formValid: false,
    };
  }

  onSubmit(e) {

    if (this.state.formValid) {

      this.props.onGetTask({name: this.state.searchName});
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

  validateField(fieldName, value) {
    let formValid = this.state.formValid;

    switch (fieldName) {
      case "searchName":
        formValid = value.length > 0;
        break;
      default:
        break;
    }

    this.setState({
      formValid
    });
  }

  renderLoading(){
    return (
      <div className="my-2 my-lg-0">
          <div className="spinner-grow text-light" role="status">
              <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
              <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
              <span className="sr-only">Loading...</span>
          </div>
      </div>
    )
  }

  renderSearchBar() {
    if (!this.state.isGettingTask) {
      return (
        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            className="form-control mr-sm-2"
            name="searchName"
            type="text"
            placeholder="Search"
          />
          <input
            className="btn btn-secondary my-2 my-sm-0"
            type="submit"
            value="Search"
          />
        </form>
      );
    } else {
      return (
        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
          Loading
        </form>
      );
    }
  }



  renderContent(){

    return (
      <div>

          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
            <Link to = "/" className="navbar-brand">Home</Link>

            <div className="navbar-collapse collapse show" id="navbarColor01">

              {this.props.loading ? this.renderLoading(): this.renderSearchBar()}
              
            </div>
          </nav>
        </div>
    );
  }

  render() {
    return (
      <div>


        {this.renderContent()}
      </div>
    );
  }
}

// export default NavBar;
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
