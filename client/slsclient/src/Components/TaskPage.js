import React, { Component } from 'react';

import Navbar from './NavBar';

export class TaskPage extends Component {

    constructor(props){

        super(props);

        this.onToggleEdit = this.onToggleEdit.bind(this);
        this.renderTaskDetails = this.renderTaskDetails.bind(this);
        this.renderUpdateForm = this.renderUpdateForm.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            isEditing: false,
            previousValue: {
                name: this.props.location.state.name,
                status: (this.props.location.state.status==="Completed" ||  this.props.location.state.status==="Done"),
                description: this.props.location.state.description,
            },
            formErrors: {name: '',description: ''},
            name: this.props.location.state.name,
            status: (this.props.location.state.status==="Completed" ||  this.props.location.state.status==="Done"),
            description: this.props.location.state.description,
            _id: this.props.match.params.id,
            isUpdated: false,
            statusValid: false,
            descriptionValid: false,
            nameValid: false,
            formValid: false
        };
    }

    componentDidMount(){

        let nameValid = this.state.nameValid;
        let descriptionValid = this.state.descriptionValid;

        nameValid = this.state.name.length > 0 && this.checkAllLetter(this.state.name);
        descriptionValid = this.state.description.length > 0;

        this.setState({
            descriptionValid,
            nameValid
        });
    }

    onChange(e){

        const name = e.target.name;
        
        
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        // if(e.target.type==='checkbox'){
            
        //     if(value){
        //         console.log('Task set to Complete');
        //     }
        //     else{
        //         console.log('Task set to In Progress');
        //     }
        // }
        
        this.setState({[name]: value},()=>this.validateField(name,value));
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
        let statusValid = this.state.statusValid;

        switch (fieldName){
            case 'name':
                nameValid = value.length > 0 && this.checkAllLetter(value);
                fieldValidationErrors.name = nameValid ? "" : " is invalid";
            break;
            case 'description':
                descriptionValid = value.length > 0;
                fieldValidationErrors.description = descriptionValid ? "" : " is invalid";
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

        isDiff = ((this.state.previousValue.name !== this.state.name) | isDiff)
        isDiff = ((this.state.previousValue.status !== this.state.status) | isDiff)
        isDiff = ((this.state.previousValue.description !== this.state.description) | isDiff)
        
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

            //log exiting the edit mode
            //Restore the snapshot
            this.setState({
                isEditing: !this.state.isEditing,
                name: this.state.previousValue.name,
                status: this.state.previousValue.status,
                description: this.state.previousValue.description,
            });
        }

    }

    renderTaskDetails(){

        return(
            <div>
                <br />

                <div className="container-fluid">

                    <div className="jumbotron">
                        
                        <h1 className="display-3">Task <span className="text-info">{this.state.name}</span></h1>
                        

                        {/* <p className="lead">Created By: <span className="text-info"> Lee </span></p> */}
                        {/* <p className="lead">Created Date: <span className="text-success">20/1/2019</span> </p> */}

                        <p className="lead">
                            Description:{this.state.description}
                        </p>

                        <div className="custom-control custom-checkbox">
                                <input readOnly name="status" type="checkbox" className="custom-control-input" id="customCheck1"  checked={this.state.status ? "checked" : "" }/>
                                <label className="custom-control-label lead" htmlFor="customCheck1">Status</label>
                        </div>

                        <br />

                        <button className="btn btn-info  btn-lg" role="button" onClick={this.onToggleEdit}>Edit</button>
                    
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
                                                    <input  className= {this.state.nameValid ? "form-control is-valid" :"form-control is-invalid"}  value={this.state.name} onChange={this.onChange} type = "text" name = "name" placeholder={this.props.location.state.name}></input>
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
                                                <input  className= {this.state.descriptionValid ? "form-control is-valid" :"form-control is-invalid"} value={this.state.description} onChange={this.onChange} type = "text" name = "description" placeholder={this.props.location.state.description}></input>
                                            </div>
                                        </div>
                                    </div>

                                    <br />

                                    <div className="form-group">
                                        <label>Status</label>

                                        <div className="custom-control custom-checkbox">
                                            <input name="status" onChange={this.onChange} type="checkbox" className="custom-control-input" id="customCheck1"  checked={this.state.status ? "checked" : "" }/>
                                            <label className="custom-control-label" htmlFor="customCheck1">Status</label>
                                        </div>
                                    </div>

                                    <br />

                                    <fieldset className = "form-group">
                                        {this.state.isUpdated && this.state.formValid && 
                                            <input type="submit" className="btn btn-success btn-lg" role="button" value="Update" />
                                        }
                                        
                                        {!this.props.loading &&
                                            <button onClick={this.onToggleEdit} className="btn btn-danger btn-lg" role="button">Cancel</button>
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
            description: this.state.description
        };

        console.log(JSON.stringify(updateData));

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
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>

                </div>
            )
        }

    }

    render() {

        return (

            <div>

                <Navbar history={this.props.history} />

                {this.renderContent()}

            </div>

        )
    }
}

export default TaskPage

