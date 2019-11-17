import React, { Component } from "react";
import { connect } from "react-redux";
import {changePage} from "../actions/taskPageAction";
import { hideAddTask } from "../actions/taskAddAction";


function mapStateToProps(state){
    return {
        currentPage: state.taskReducer.currentPage,
        totalPages: state.taskReducer.totalPages,
        tasksPerPage: state.taskReducer.tasksPerPage
    };
}

export class TaskPage extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage){
      let dispatchData = changePage();

      dispatchData.payload = {};
      
      dispatchData.payload.currentPage = newPage;


      this.props.dispatch(dispatchData);
  }

  range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len)
      .fill()
      .map((_, idx) => start + idx * step);
  }

  renderPageButtons() {

    let arr = this.range(0, this.props.totalPages - 1, 1);

    return (
      <div>
        <ul className="pagination pagination-lg">
          {arr.map((pageNumber, index) => {
            let className = "page-item";

            //Put current page here
            if (pageNumber === this.props.currentPage) {
              className = "page-item active";
            }

            return (
              <li key={index} className={className}>
                <button
                  onClick={() => {
                    this.changePage(pageNumber);
                  }}
                  className="page-link"
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {

    return (
      <div>
        {this.renderPageButtons()}
      </div>
    );

  }
}

export default connect(mapStateToProps)(TaskPage);
