import React, { Component } from 'react'

import Navbar from './NavBar';

export class PageNotFound extends Component {
    render() {
        return (
            <div>

                <Navbar history={this.props.history} />

                <h1>404 Page Not Found </h1>

            </div>
        )
    }
}

export default PageNotFound
