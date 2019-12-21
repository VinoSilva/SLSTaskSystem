import React, { Component } from 'react';
import { connect } from "react-redux";
import TaskCard from './TaskCard';

function mapStateToProps(state){
    return {
        tasks: state.taskReducer.tasks,
    };
}

export class TaskLists extends Component {


    constructor(props){

      super(props);

      this.renderTaskCards = this.renderTaskCards.bind(this);
    }

    renderTaskCards({rows}){

        if(rows && rows.length > 0){
            return (
            <div className = "row">
        
              {rows.map((task,i)=>{
                return (
                  <div key={task.id}>
                    <TaskCard history={this.props.history} status={task.status} id = {task.id} status = {task.status} name = {task.name} description = {task.description} />
                  </div>
                );
              })}
          
            </div>);
        }
        else{
          return (
            <div>

            </div>
          );
        }
    }

    render() {

        return (
            <div>
                {this.renderTaskCards(this.props.tasks)}
            </div>
        )
    }
}

export default connect(mapStateToProps)(TaskLists);