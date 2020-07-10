import React, { Component } from "react";
import styled from 'styled-components';
import axios from "axios";

// import "../componentStyles/Login.css";


const LoginForm = styled.form`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  height:  ${props => props.loggedIn ? "10vh" : "25vh"};

  background-color: white;
  padding: 1em;
  border-radius: 1em;


  @media(max-width: 680px){
    width: 90%;
   }



`


const LoginInput = styled.input`
  width: 100%;
  padding-left: 5px;
`;



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

    const {username, password} = this.state;

    const payload = { username, password };

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
          errorMessage: err.response.data.message,
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

    const { errorMessage, username, password } = this.state;
    let view;
    let button;

    if (!loggedIn) {
     
      button = <button onClick={this.handleSignIn}>Submit</button>      

      view = (
        <div>
          <label>Username:</label>
          <LoginInput
            type="text"
            name="username"
            value={username}
            onChange={this.handleInputChange}
          />
          <label>Password:</label>
          <LoginInput
            type="password"
            name="password"
            onChange={this.handleInputChange}
            value={password}
          />
        </div>
      );
    } else {
      button = <button onClick={this.handleLogOut}>Log Out</button>;
      view = <h3 style={{color: 'green'}}> You're signed in!</h3>
    }

    return (
        <LoginForm loggedIn={loggedIn} >

          <h2> What's up dad?</h2>
          {errorMessage ? <h3 style={{color: "red", textAlign: 'center'}}>{errorMessage}</h3> : ''}
          {view}
          {button}
        </LoginForm>
    );
  }
}

export default Login;
