import React, { Component } from 'react'
import Task from './Task';
import NavBar from './NavBar';

export class Home extends Component {
    render() {

        console.log('Home rendered');
        

        return (
            <div>
                <NavBar history={this.props.history}/>
                <Task history={this.props.history} />
            </div>
        )
    }
}

export default Home
