import React, { Component } from "react";
import axios from "axios";

import "../componentStyles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorCode: "",
      errorMessage: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }


  handleInputChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  handleSignIn = (e) => {
    e.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    let payload = { username, password };

    axios
      .post("auth/login", payload)
      .then((res) => {
        localStorage.setItem("token", res.data);
        this.props.loginHandler();

        this.setState({
            username: "",
            password: "",
            errorCode: "",
            errorMessage: ""
        });

      })
      .catch((err) => {
        this.setState({
          username: "",
          password: "",
          errorCode: err.response.status,
          errorMessage: err.response.data,
        });
      });
  };

  handleLogOut = (e) => {
    e.preventDefault();
    this.props.loginHandler();
    localStorage.removeItem("token");
  };

  render() {


    const loggedIn = this.props.loginState;
    let view;

    if (!loggedIn) {
      view = <button onClick={this.handleSignIn}>Submit</button>;
    } else {
      view = <button onClick={this.handleLogOut}>Log Out</button>;
    }

    return (
      <div>
        <form>
          <div id="login-input-wrapper">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </div>
          {view}
        </form>
      </div>
    );
  }
}

export default Login;
