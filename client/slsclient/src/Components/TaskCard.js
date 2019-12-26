import React, { Component } from "react";

import {createSocket} from "../actions/socketCreateAction";

import { connect } from "react-redux";


const mapDispatchToProps = dispatch => {
  return {
    onCreateSocket: socket => {
      dispatch(createSocket(socket));
    }  
  }
};

function mapStateToProps(state) {
  return {
    loading: state.socketCreateReducer.loading,
    error: state.socketCreateReducer.error,
    socket: state.socketCreateReducer.socket
  };
}

export class TaskCard extends Component {
  getRandomInt(minIndex, maxIndex) {
    minIndex = Math.ceil(minIndex);
    maxIndex = Math.floor(maxIndex);
    return Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
  }

  constructor(props) {
    super(props);

    var styleArray = [
      "card border-success mb-3",
      "card border-info mb-3",
    ];

    let cardStyle = styleArray[this.getRandomInt(0, styleArray.length - 1)];

    this.state = {
      cardStyle,
      description: this.props.description,
      name: this.props.name,
      status: this.props.status
    };

    this.onChange = this.onChange.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);

  }

  componentDidMount(){
  
    // console.log('Listen to id:' + this.props.id);

    this.props.socket.on(this.props.id,(data)=>{this.onTaskModified(data)});
  
  }

  componentWillUnmount(){
    
    // console.log('Stop listening to event:' + this.props.id);

    this.props.socket.off(this.props.id);

  }

  onTaskModified(data){

    this.setState({
      name: data.name,
      description: data.description,
      status: data.status
    },()=>{
      console.log('Name:' + this.state.name);
    });

  }

  onChange(e) {
    // console.log("Name:" + e.target.name + "  Value:" + e.target.checked);
  }

  onClickEdit() {

    var path = `/task/${this.props.id}`;
    // var path = `/task/${this.props.name}`;

    this.props.history.push(path, {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      status: this.props.status
    });

  }

  render() {
    return (
      <div className={this.state.cardStyle} style={{ maxWidth: 250 }}>
        <div className="card-header">

          <a href="#" onClick={this.onClickEdit} className="text-info"> {this.state.name} </a>
        </div>

        <div className="card-body">

          <p className="card-text">{this.state.description}</p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskCard);