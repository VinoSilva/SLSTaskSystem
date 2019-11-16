import React, { Component } from 'react'



export class NavBar extends Component {

    constructor(props){

        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            searchName: "",
            formValid: false
        }

    }

    onSubmit(e){

        console.log("FormValid:" + this.state.formValid);

        e.preventDefault();

    }

    onChange(e){

        const name = e.target.name;

        const value = e.target.value; 
        
        console.log('Name:' + name);

        this.setState({[name]: value},()=>{this.validateField(name,value)});

    }

    validateField(fieldName,value){

        let formValid = this.state.formValid;
        
        switch(fieldName){
            case 'searchName':
                formValid = value.length > 0
                break;
        }

        this.setState({
            formValid
        });

    }

    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">

                    {/* Will be cleaned up upon confirmation Vino */}
                    {/* <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li> */}

                    </ul>
                    
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit} >
                        <input onChange={this.onChange} className="form-control mr-sm-2" name="searchName" type="text" placeholder="Search" />
                        <input className="btn btn-secondary my-2 my-sm-0" type="submit" value="Search"/>
                    </form>
                </div>
                </nav>
            </div>
        );

    }
}

export default NavBar
