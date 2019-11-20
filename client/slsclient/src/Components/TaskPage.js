import React, { Component } from 'react';

import Navbar from './NavBar';

export class TaskPage extends Component {
    render() {

        return (

            <div>

                <Navbar history={this.props.history} />


                <div className="container-fluid">
                    <h1>Task {this.props.match.params.id}</h1>

                    <p>
                        Description:
                    </p>

                    <p>
                        {this.props.location.state.description}
                    </p>
                </div>

            </div>

        )
    }
}

export default TaskPage

