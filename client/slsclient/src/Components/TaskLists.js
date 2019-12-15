import React, { Component } from 'react';
import { connect } from "react-redux";
import TaskCard from './TaskCard';

function mapStateToProps(state){
    return {
        tasks: state.taskReducer.tasks,
    };
}

export class TaskLists extends Component {

    renderTaskCards({tasks}){

      if(tasks && tasks.length > 0){
        
        return (
        <div className = "row">
    
          {tasks.map((task,i)=>{
            
            return (
              <div key={task._id}>
                <TaskCard history={this.props.history} status={task.status} _id = {task._id} status = {task.status} name = {task.name} description = {task.description} />
              </div>
            );
          })}
       
        </div>);
      }
      else{
        return (
          <div>
          </div>
        )
      }
    }

    render() {
        return (
            <div>
                {this.renderTaskCards(this.props)}
            </div>
        )
    }
}

export default connect(mapStateToProps)(TaskLists);