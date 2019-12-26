import React, { Component } from 'react';

import axios from 'axios';

import Navbar from './NavBar';

import { updateTask } from "../actions/taskUpdateAction";

import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
      onUpdateTask: task => {
        dispatch(updateTask(task));
      }
    };
};

function mapStateToProps(state) {
    return {
      loading: state.taskUpdateReducer.loading,
      error: state.taskUpdateReducer.error,
      task: state.taskUpdateReducer.task
    };
}

export class TaskPage extends Component {

    constructor(props){

        super(props);

        this.onToggleEdit = this.onToggleEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);

        //Meaning users manually 
        let name = undefined;
        let status = undefined;
        let description = undefined;
        let initialized = false;
        
        if(this.props.location.state){
            name =  this.props.location.state.name;
            status = (this.props.location.state.status==="Completed" ||  this.props.location.state.status==="Done");
            description = this.props.location.state.description;
            initialized = true;
        }

        this.state = {
            isEditing: false,
            previousValue: {
                name: name,
                status: status,
                description: description,
            },
            formErrors: {name: '',description: ''},
            name: name,
            status: status,
            description: description,
            id: this.props.match.params.id,
            isUpdated: false,
            statusValid: false,
            descriptionValid: false,
            nameValid: false,
            formValid: false,
            initialized: initialized,
            endpoint: 'http://localhost:4000'
        };
    }

    componentDidMount(){

        if(this.state.initialized){
            let nameValid = this.state.nameValid;
            let descriptionValid = this.state.descriptionValid;
    
            nameValid = this.state.name.length > 0 && this.checkAllLetter(this.state.name);
            descriptionValid = this.state.description.length > 0;
            
            this.setState({
                descriptionValid,
                nameValid,
            });
        }
        else{
            axios.post("http://localhost:4000/task/find",{id: this.state.id})
            .then((res)=>{
                let task = res.data.task;
                
                let nameValid = this.state.nameValid;
                let descriptionValid = this.state.descriptionValid;
                
                nameValid = task.name.length > 0 && this.checkAllLetter(task.name);
                descriptionValid = task.description.length > 0;
                

                this.setState({
                    name: task.name,
                    description: task.description,
                    status: (task.status === "Completed" ||  task.status === "Done"),
                    previousValue: {
                        name: task.name,
                        description: task.description,
                        status: (task.status === "Completed" ||  task.status === "Done"),
                    },
                    initialized: true,
                    nameValid,
                    descriptionValid
                });
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    componentDidUpdate(){

        if(this.props.task){

            let isDiff = false;
            isDiff = this.props.task.name !== this.state.previousValue.name;

            isDiff = ((this.props.task.description !== this.state.previousValue.description) || isDiff);
            let isCompleted = this.props.task.status ==="Completed";
            
            isDiff = ((isCompleted !== this.state.previousValue.status) || isDiff);

            if(isDiff)
            {
                let previousValue = {
                    name: this.props.task.name,
                    description: this.props.task.description,
                    status: (this.props.task.status==="Completed" ||  this.props.task.status==="Done")
                }

                this.setState({
                    name: this.props.task.name,
                    description: this.props.task.description,
                    previousValue: previousValue,
                    status: (this.props.task.status==="Completed" ||  this.props.task.status==="Done"),
                    isEditing: false,
                    isUpdated: false
                });

            }
        }
        
    }

    onChange(e){

        const name = e.target.name;
        
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        this.setState({[name]: value},()=>{

            this.validateField(name,value);
            
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
        
    validateField(fieldName,value){

        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let descriptionValid = this.state.descriptionValid;

        switch (fieldName){
            case 'name':
                nameValid = value.length > 0 && this.checkAllLetter(value);
                fieldValidationErrors.name = nameValid ? "" : " is invalid";
            break;
            case 'description':
                descriptionValid = value.length > 0;
                fieldValidationErrors.description = descriptionValid ? "" : " is invalid";
            break;
            default:
            break;
        }

        this.setState({
            nameValid,
            descriptionValid,
        },()=>{
            this.validateForm();
        });
    }

    validateForm(){
        
        if(this.state.formValid !== (this.state.nameValid && this.state.descriptionValid))
        {
            this.setState({
                formValid: this.state.nameValid && this.state.descriptionValid
            },()=>{this.checkSnapshot()});
        }
        else{
            this.checkSnapshot();
        }

    }

    checkSnapshot(){

        let isDiff = false;

        isDiff = ((this.state.previousValue.name !== this.state.name) || isDiff)
        isDiff = ((this.state.previousValue.status !== this.state.status) || isDiff)
        
        isDiff = ((this.state.previousValue.description !== this.state.description) || isDiff)
        
        if(isDiff){

            this.setState({
                isUpdated: true
            });        
        }
        else{

            this.setState({
                isUpdated: false
            });     
        }
    }

    onToggleEdit(){

        if(!this.state.isEditing){
            this.setState({
                isEditing: !this.state.isEditing,
                previousValue: {
                    name: this.state.name,
                    status: this.state.status,
                    description: this.state.description
                }
            });
        }
        else{
            this.setState({
                isEditing: !this.state.isEditing,
                name: this.state.previousValue.name,
                status: this.state.previousValue.status,
                description: this.state.previousValue.description,
            });
        }

    }

    onClickDelete(){
        if (window.confirm('Are you sure you wish to delete this task?')){
            console.log('Delete this');
        } 
    }

    renderTaskDetails(){

        return(
            <div>
                <br />

                <div className="container-fluid">

                    <div className="jumbotron">

                        <h1 className="display-3"> <span className="text-info">{this.state.name}</span></h1>

                        <p className="lead">
                            Description:{this.state.description}
                        </p>

                        <div className="custom-control custom-checkbox">
                                <input readOnly name="status" type="checkbox" className="custom-control-input" id="customCheck1"  checked={this.state.status ? "checked" : "" }/>
                                <label className="custom-control-label lead" htmlFor="customCheck1">Completed</label>
                        </div>

                        <br />

                        <button className="btn btn-info  btn-lg" onClick={this.onToggleEdit}>Edit</button>
                    
                        <button className="btn btn-danger btn-lg" onClick={this.onClickDelete}>Delete</button>
                    </div>

                </div>
            </div>
        )
    }

    renderUpdateForm(){
        return (
            <div>
                    <br />

                    <div className="container-fluid">

                        <form onSubmit={this.onSubmit}>

                                <fieldset>
                                    {/* <div className = "jumbotron"> */}
                                        
                                        <div className = "row"> 

                                            <div className="col-lg-4">
                                                <div className = {this.state.nameValid? "form-group has-success" : "form-group has-danger"}>
                                                    <label><h5>Name:</h5></label>
                                                    <input  className= {this.state.nameValid ? "form-control is-valid" :"form-control is-invalid"}  defaultValue={this.state.name} onChange={this.onChange} type = "text" name = "name" placeholder={this.state.name}></input>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <h5>Created By: <span className="text-success">Lee</span> </h5> */}
                                        {/* <h5>Created Date: <span  className="text-info">20/1/2019</span> </h5> */}
                                    {/* </div> */}
                                    
                                    <br />
                                    
                                    <div className= {this.state.descriptionValid? "form-group has-success" : "form-group has-danger"}>

                                        <label>Description:</label>

                                        <div className = "row"> 
                                            <div className="col-lg-4">
                                                <input  className= {this.state.descriptionValid ? "form-control is-valid" :"form-control is-invalid"} defaultValue={this.state.description} onChange={this.onChange} type = "text" name = "description" placeholder={this.state.description}></input>
                                            </div>
                                        </div>
                                    </div>

                                    <br />

                                    <div className="form-group">
                                        <label>Status</label>

                                        <div className="custom-control custom-checkbox">
                                            <input name="status" onChange={this.onChange} type="checkbox" className="custom-control-input" id="customCheck1"  checked={this.state.status ? "checked" : "" }/>
                                            <label className="custom-control-label" htmlFor="customCheck1">Completed</label>
                                        </div>
                                    </div>

                                    <br />

                                    <fieldset className = "form-group">
                                        {this.state.isUpdated && this.state.formValid && 
                                            <input type="submit" className="btn btn-success btn-lg" value="Update" />
                                        }
                                        
                                        {!this.props.loading &&
                                            <button onClick={this.onToggleEdit} className="btn btn-danger btn-lg">Cancel</button>
                                        }
                                    </fieldset>

                                </fieldset>
                        
                        </form>

                    </div>

            </div>
        );
    }

    onSubmit(e){

        let updateData = {
            name: this.state.name,
            status: this.state.status ? "Completed": "In Progress",
            description: this.state.description,
            id: this.state.id
        };

        this.props.onUpdateTask(updateData);
        // this.setState({
        //     name: this.state.previousValue.name,
        //     description: this.state.previousValue.description,
        //     status: this.state.previousValue.status,
        // },()=>{
        // });

        e.preventDefault();
    }

    renderContent(){

        if(!this.props.loading){
            if(this.state.isEditing){
                return (

                    <div>
                        {this.renderUpdateForm()}
                    </div>

                );
            }
            else{
                return (

                    <div>
                        {this.renderTaskDetails()}
                    </div>

                );
            }
        }
        else{
            return (
                <div>
                    {this.renderLoading()}
                </div>
            )
        }
    }

    renderLoading(){
        return (
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
                <div className="spinner-grow text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    render() {

        
        if(this.state.initialized){
            return (
                <div>
                    <Navbar history={this.props.history} />
    
                    {this.props.isLoading ? this.renderLoading() : this.renderContent()}
    
                </div>
            )
        }
        else{
                return (
                    <div>
                        <Navbar history={this.props.history} />

                        {this.renderLoading()}
                    </div>
                )
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskPage);