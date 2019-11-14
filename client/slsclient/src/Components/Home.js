import React, { Component } from 'react'
import Task from './Task';
import NavBar from './NavBar';

export class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Task />
            </div>
        )
    }
}

export default Home
