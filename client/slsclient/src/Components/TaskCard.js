import React, { Component } from "react";

export class TaskCard extends Component {
  getRandomInt(minIndex, maxIndex) {
    minIndex = Math.ceil(minIndex);
    maxIndex = Math.floor(maxIndex);
    return Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
  }

  constructor(props) {
    super(props);

    var styleArray = [
      // "card border-primary mb-3",
      // "card border-secondary mb-3",
      "card border-success mb-3",
      "card border-info mb-3",
      // "card border-dark mb-3",
    ];

    let cardStyle = styleArray[this.getRandomInt(0, styleArray.length - 1)];

    this.state = {
      cardStyle
    };

    this.onChange = this.onChange.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);

    
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

          {
           /* <div className="form-group">
                <input type="checkbox" className="" id="customSwitch1" onChange={this.onChange} />
            </div> */
          }

          <a href="#" onClick={this.onClickEdit} className="text-info"> {this.props.name} </a>
          {/* <h6>{this.props.name}</h6> */}
        </div>

        <div className="card-body">
          {/* <h4 className="card-title">Info card title</h4> */}

          <p className="card-text">{this.props.description}</p>
        </div>
          {/* <Link to = {`/task/${this.props._id}`} className="btn btn-success">Edit</Link> */}
        {/* <div>

          <button className="btn btn-success" onClick={this.onClickEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={this.onClickDelete}>Delete</button>
        </div> */}
      </div>
    );
  }
}

export default TaskCard;
