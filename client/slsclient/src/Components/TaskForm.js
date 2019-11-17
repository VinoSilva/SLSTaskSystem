import React, { Component } from 'react'
import { FormErrors } from './FormErrors';


export class TaskForm extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            name: '',
            description: '',
            formErrors: {email: '',password: ''},
            nameValid: false,
            passwordValid: false,
            formValid: false
        };
    }


    onSubmit(e){

        if(this.state.formValid){
            
            let bodyData = {
                name: this.state.name,
                description: this.state.description
            }

            let fetchData = {
                method: 'POST',
                body: JSON.stringify(bodyData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch("http://localhost:4000/task/",fetchData)
            .then((res)=>{
                if(res.status === 200){
                    return res.json();
                }
            })
            .then((data)=>{
                if(data){
                    console.log(JSON.stringify(data));
                }
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        
        e.preventDefault();
    }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value; 


        this.setState({[name]: value},()=>{this.validateField(name,value)});
    }

    checkAllLetter(value)
    {
        var letters = /^[A-Za-z]+$/;

        if(value.match(letters))
        {
            return true;
        }
        else{
            return false;
        }
    }


    validateField(fieldName,value){
        let nameValid = this.state.nameValid;
        let descriptionValid = this.state.descriptionValid;
        let fieldValidationErrors = this.state.formErrors;

        switch(fieldName){
            case 'name':
                nameValid = (value.length > 0 && this.checkAllLetter(value));
                fieldValidationErrors.name = nameValid ? '' : ' is invalid';
                
                break;
            case 'description':
                descriptionValid = (value.length > 0);                  
                fieldValidationErrors.description = descriptionValid ? '' : ' is invalid';
                
                break;
            default:
                break;
        }

        this.setState({
            nameValid: nameValid,
            descriptionValid: descriptionValid
        },this.validateForm)
    }

    validateForm(){
        this.setState({formValid: this.state.nameValid && this.state.descriptionValid});
    }

    render() {
        return (
            <div id="addTaskForm" className="form-group">
                    
                <div className="panel panel-default">
                     <FormErrors formErrors={this.state.formErrors} />
                </div> 

                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label className ="col-form-label">Task Name</label>
                        <input type="text" className="form-control" name="name" onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label className ="col-form-label">Description</label>
                        <textarea className="form-control" name="description" rows="3" onChange={this.onChange}></textarea>
                    </div>

                    <br />

                    <button type="submit" className="btn btn-primary" > Create </button>
                </form>
            </div>
        )
    }
}

export default TaskForm
