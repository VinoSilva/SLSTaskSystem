import React, { Component } from "react";

export class NavBar extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      searchName: "",
      formValid: false,
      isLoading: false
    };
  }

  onSubmit(e) {
    let fetchData = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (this.state.formValid) {
      fetch(
        `http://localhost:4000/task/?name=${this.state.searchName}`,
        fetchData
      )
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 404) {
            return res.json();
          }
        })
        .then(data => {
          if (data) {
            console.log(JSON.stringify(data));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    e.preventDefault();
  }

  fetchTask() {}

  onChange(e) {
    const name = e.target.name;

    const value = e.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let formValid = this.state.formValid;

    switch (fieldName) {
      case "searchName":
        formValid = value.length > 0;
        break;
      default:
        break;
    }

    this.setState({
      formValid
    });
  }

  renderSearchBar() {
    if (!this.state.isGettingTask) {
      return (
        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            className="form-control mr-sm-2"
            name="searchName"
            type="text"
            placeholder="Search"
          />
          <input
            className="btn btn-secondary my-2 my-sm-0"
            type="submit"
            value="Search"
          />
        </form>
      );
    } else {
      return (
        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
          Loading
        </form>
      );
    }
  }

  render() {
    return (
      <div>
          
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">


          {/* <a className="navbar-brand" href="#">Home</a> */}

            <a className="navbar-brand">Home</a>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >

            <span className="navbar-toggler-icon"></span>

          </button>
         
          <div className="collapse navbar-collapse" id="navbarColor01">
            
            <ul className="navbar-nav mr-auto"></ul>

            {this.renderSearchBar()}

          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
